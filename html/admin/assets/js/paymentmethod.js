const apisite = 'http://localhost:8080/';
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

// console.log(info)
// console.log(info['access_token'])
// console.log(info['expires_in'])



var accessToken;
if (localStorage.getItem("accessToken") == null) {
    const accessToken = info['access_token'];
    localStorage.setItem("accessToken", accessToken);
} else {
    accessToken = localStorage.getItem("accessToken");
}
//search

const searchResults = document.querySelector('.search-results');
const searchInput = document.querySelector('#search input');
function searchcategory() {
    const query = searchInput.value;
    const url = apisite + 'api/v1/admin/payment-methods/search/' + query;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    })
        .then(response => response.json())
        .then(data => {
            const results = document.querySelector('.search-results');
            results.innerHTML = '';
            if (data.length > 0) {
                results.style.display = 'block';
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.name;
                    li.addEventListener('click', () => {
                        // Do something with the selected item
                        populatePaymentWithApiData(item.id);
                    });
                    results.appendChild(li);
                });
            } else {
                results.style.display = 'none';
            }
        });
}

document.addEventListener('click', event => {
    const isClickInsideSearch = searchInput.contains(event.target) || searchResults.contains(event.target);
    if (!isClickInsideSearch) {
        searchResults.style.display = 'none';
    }
});

//add category
function openaddform() {
    var form = document.getElementById("add-form-payment");
    form.style.display = "block";
    form.addEventListener("submit", function (event) {
        var paymentName = document.querySelector('#addname').value;
        var data = {
            id: null,
            name: paymentName
        }
        fetch(apisite + "api/v1/admin/payment-methods", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
            }
        }).then(function (response) {
            console.log(response);
            form.reset();
            form.style.display = "none";
        });
    });
}



//list 
fetch(apisite + "api/v1/admin/payment-methods", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    }
}).then(
    res => {
        res.json().then(
            data => {
                console.log(data);
                if (data.length > 0) {
                    var temp = "";
                    data.forEach((itemData) => {
                        temp += `<tr>
                                    <td>${itemData.id}</td>
                                    <td>${itemData.name}</td>
                                    <td>
                                        <div class="Button">
                                            <button onclick="populatePaymentWithApiData(${itemData.id})" id="Bt" class="btn btn-info" type="button">
                                            <a class="Bt_text">Update</a>
                                            </button>
                                        </div>
                                    </td>
                                </tr>`;

                    });
                    document.getElementById('data_payment').innerHTML = temp;
                }
            }
        )
    }
)

function populatePaymentWithApiData(id) {

    var formDialog = document.getElementById('form-dialog');
    // Replace URL with your API endpoint and ID parameter name
    var payIdField = document.querySelector('#payid');
    var payNameField = document.querySelector('#payname');
    $('.hidden-form').show();
    // Fetch the product data from the server
    fetch(apisite + `api/v1/admin/payment-methods/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    })
        .then(response => response.json())
        .then(payment => {
            // Set the values of the form fields to the corresponding data of the product
            payIdField.value = payment.id;
            payNameField.value = payment.name;
            formDialog.style.display = 'block';
        })
        .catch(error => console.error(error));
    closeDialogButton.addEventListener('click', function () {
        formDialog.style.display = 'none';
    });
}

const updateForm = document.getElementById('update-form-payment');

updateForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    const payId = document.getElementById('payid').value;
    const payName = document.getElementById('payname').value;

    const data = {
        id: payId,
        name: payName
    };

    fetch(apisite + `api/v1/admin/payment-methods/${payId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // handle the API response data
            console.log(data);
        })
        .catch(error => {
            // handle the error
            console.error(error);
        });
});