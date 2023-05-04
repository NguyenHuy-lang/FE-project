
const apisite = 'http://localhost:8080/';

const searchResults = document.querySelector('.search-results');
const searchInput = document.querySelector('#search input');

params = {}
let regex = /([^&=]+)=([^&]*)/g, m
while (m = regex.exec(location.href)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
}

if (Object.keys(params).length > 0) {
    localStorage.setItem('authInfo', JSON.stringify(params))
}

// window.history.pushState({}, document.title, "/" + "profile.html")

let info = JSON.parse(localStorage.getItem('authInfo'))

console.log(info)
console.log(info['access_token'])
console.log(info['expires_in'])


var accessToken;
if (localStorage.getItem("accessToken") == null) {
    const accessToken = info['access_token'];
    localStorage.setItem("accessToken", accessToken);
} else {
    accessToken = localStorage.getItem("accessToken");
}
var form = document.getElementById("add-form-product");
form.addEventListener("submit", function (event) {
    // event.preventDefault();
    const imgTag = document.querySelector('.imgsrc'); //get the img tag element
    const srcValue = imgTag.getAttribute('src');
    var prdName = document.getElementById("prdname").value;
    var description = document.getElementById("description").value;
    var price = document.getElementById("price").value;
    var category = document.getElementById("category-select").value;
    var data = {
        id: null,
        name: prdName,
        description: description,
        imgPath: srcValue,
        price: price,
        cate: {
            id: category
        }, 
        listComment: [],
        rating: null
    }
    // alert(JSON.stringify(data));
    fetch(apisite + "api/v1/admin/products", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`,
        }
    }).then(function (response) {
        console.log(response);
        // form.reset();
        // form.style.display = "none";
    });
});
// $(document).ready(function () {
//     $("#btnadd").click(function (event) {
//         const imgTag = document.querySelector('.imgsrc'); //get the img tag element
//         const srcValue = imgTag.getAttribute('src');
//         var wsUrl = "http://127.0.0.1:8080/api/v1/admin/products";
//         var restrequest = '{"id": null' + ',' +
//             '"name":' + '"' + $("#prdname").val() + '"' + ',' +
//             '"description":' + '"' + $("#description").val() + '"' + ',' +
//             '"imgPath":' + '"' + srcValue + '"' + ',' +
//             '"price":' + $("#price").val() + ',' +
//             '"cate": {"id":' + $("#category-select").val() + '}' + ',' +
//             '"listComment": []' + ',' +
//             '"rating": null}';
//         alert(restrequest);
//         $.ajax({
//             type: "POST",
//             url: wsUrl,
//             contentType: "application/json",
//             Authorization: `Bearer ${accessToken}`,
//             dataType: "json",
//             data: restrequest,
//             success: processSuccess,
//             error: processError
//         });

//     });
// });

// function processSuccess(data, status, req) {
//     alert('success');
//     // const xmlResponse = req.responseXML;
//     // console.log(xmlResponse);
//     // const statusElement = xmlResponse.getElementsByTagName('ns2:getOrderResponse')[0];
//     // const statusValue = statusElement.textContent;
//     // console.log(statusValue);
//     // alert(statusValue);
// }

// function processError(data, status, req) {
//     alert('error ' + data.state);
//     //alert(req.responseText + " " + status);
// }

fetch(apisite + 'api/v1/categories', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
})
    .then(response => response.json())
    .then(data => {
        // handle the data
        const selectElement = document.querySelector('#category-select');
        data.forEach(category => {
            const optionElement = document.createElement('option');
            optionElement.value = category.id;
            optionElement.textContent = category.name;
            selectElement.appendChild(optionElement);
        });
    });