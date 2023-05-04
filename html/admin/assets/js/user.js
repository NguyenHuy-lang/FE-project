const apiurl = "http://127.0.0.1:8080/";
params = {}
let regex = /([^&=]+)=([^&]*)/g,
    m
while (m = regex.exec(location.href)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
}

if (Object.keys(params).length > 0) {
    localStorage.setItem('authInfo', JSON.stringify(params))
}

// window.history.pushState({}, document.title, "/" + "profile.html")

let info = JSON.parse(localStorage.getItem('authInfo'))



var accessToken;
if (localStorage.getItem("accessToken") == null) {
    const accessToken = info['access_token'];
    localStorage.setItem("accessToken", accessToken);
} else {
    accessToken = localStorage.getItem("accessToken");
}
let apiData = [];
const table = document.querySelector("#list_member");
var Respone = localStorage.getItem("respone");
console.log(Respone);

fetch(apiurl + "api/v1/admin/users", {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json',
    },
})
    .then((response) => response.json())
    .then((data) => {
        apiData = data;
        data.forEach((row) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <tr align="center" valign="center" id="item" >
                <td height="30px" id="Id" class = "item id">${row.id}</td>
                <td class = "item" id="gmail">${row.email}</td>
                <td class = "item" id="password">${row.password}</td>
                <td class = "item" id="user_type">${row.user_type}</td>
                <td class = "item" id="username">${row.username}</td>
                <td class = "item" id="address">${row.address}</td>
                <td class = "item" id="phone">${row.phone}</td>
                <td>
                  <button class="btn btn-warning" id="btxoa" onclick="deleteItem(${row.id})" type="button">
                    <a href="../../pages/user_admin/user_admin.html" class="Update">Xóa</a>
                    </button>
                  <button id="btEdit" class="btn btn-link" type="button">
                    <a href="/html/user/user_infor.html" >Chỉnh sửa</a>
                  </button>
                </td>
              </tr>
          `;
            table.querySelector("tbody").appendChild(tr);
        });

        var myButton = document.querySelectorAll("#btEdit");
        var myID = "";
        localStorage.setItem("userId", myID);

        if (myButton.length !== 0) {
            myButton.forEach(function (button, Index) {
                button.addEventListener("click", function () {
                    myID = apiData[Index].id;
                    localStorage.setItem("userId", myID);
                    // deleteItem(myID);
                });
            });
        }
    });
if (Respone != "") {
    fetch(apiurl + `api/v1/admin/users/${Respone}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'content-type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            var index;
            const arr = data;

            localStorage.setItem("respone", "");

            const tbody = table.getElementsByTagName("tbody")[0];
            const rows = tbody.getElementsByTagName("tr");

            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].getElementsByTagName("td");
                if (cells[0].innerHTML == Respone) {
                    index = i;
                    console.log(index);
                    break;
                }
            }
            console.log(arr.email);
            rows[index].cells[1].innerText = arr.email;
            rows[index].cells[2].innerText = arr.password;
            rows[index].cells[3].innerText = arr.user_type;
            rows[index].cells[4].innerText = arr.username;
            rows[index].cells[5].innerText = arr.address;
            rows[index].cells[6].innerText = arr.phone;
        });
}

function deleteItem(itemId) {
    fetch(apiurl + `api/v1/admin/users/${itemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer ${accessToken}",
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const itemElement = document.querySelector(
            `li[data-item-id="${itemId}"]`
        );
        itemElement.remove();
    });
}