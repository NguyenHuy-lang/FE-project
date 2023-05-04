
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

let database = [];
var data = "";
var userId = localStorage.getItem("userId");
localStorage.setItem("respone", userId);

if (userId === "") {
    var selectElement = document.querySelector("#user_type");
    var user_type;
    selectElement.addEventListener("change", (event) => {
        user_type = event.target.value;
    });
    var btSave = document.getElementById("btsave");
    btSave.addEventListener("click", function () {
        var name = document.getElementById("name").value;
        var password = document.getElementById("password").value;
        var gmail = document.getElementById("gmail").value;
        var address = document.getElementById("address").value;
        var phone = document.getElementById("phone").value;

        if (user_type === "admin") {
            data = JSON.stringify({
                email: gmail,
                username: name,
                password: password,
                address: address,
                user_type: user_type,
            });
        } else {
            data = JSON.stringify({
                email: gmail,
                username: name,
                password: password,
                user_type: user_type,
                address: address,
                phone: phone,
            });
        }

        fetch(apiurl + `api/v1/admin/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: data,
        });
    });
} else {
    fetch(apiurl + `api/v1/admin/users/${userId}`)
        .then((response) => response.json())
        .then((database) => {
            var Name = document.getElementById("name");
            Name.value = database.username;
            var Password = document.getElementById("password");
            Password.value = database.password;
            var Gmail = document.getElementById("gmail");
            Gmail.value = database.email;
            var Address = document.getElementById("address");
            Address.value = database.address;
            var Phone = document.getElementById("phone");
            Phone.value = database.phone;
            var selectElement = document.querySelector("#user_type");
            var User_type;
            selectElement.addEventListener("change", (event) => {
                User_type = event.target.value;
            });
            var BtSave = document.getElementById("btsave");
            BtSave.addEventListener("click", function () {
                var name = Name.value;
                var password = Password.value;
                var gmail = Gmail.value;
                var address = Address.value;
                var phone = Phone.value;
                if (User_type === "admin") {
                    data = JSON.stringify({
                        email: gmail,
                        username: name,
                        password: password,
                        user_type: User_type,
                    });
                } else {
                    data = JSON.stringify({
                        email: gmail,
                        username: name,
                        password: password,
                        user_type: User_type,
                        address: address,
                        phone: phone,
                    });
                }
                fetch(apiurl + `api/v1/admin/users/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    body: data,
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);
                    });
            });
        });
}