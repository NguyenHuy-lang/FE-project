function googleSignIn() {
    let oauth2EndPoint = "https://accounts.google.com/o/oauth2/v2/auth"

    let form = document.createElement('form')
    form.setAttribute('method', 'GET')
    form.setAttribute('action', oauth2EndPoint)

    let params = {
        "client_id": "94808415300-4453e41v16brkcd4l4gj3nbs3spq7ode.apps.googleusercontent.com",
        "redirect_uri": "http://127.0.0.1:5500/html/main/shop.html",
        "response_type": "token",
        "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        "include_granted_scopes": "true",
        "state": "pass-through-value"

    }

    for (var p in params) {
        let input = document.createElement('input')
        input.setAttribute('type', 'hiden')
        input.setAttribute('name', p)
        input.setAttribute('value', params[p])
        form.appendChild(input)
    }
    document.body.appendChild(form)
    form.submit()
}


function forgotPassword() {

}

function login() {
    console.log("onclick")
    var memail = document.querySelector("#email").value;

    if (memail == null) {
        memail = document.querySelector("#email").textContent;
    }
    var mpassword = document.querySelector("#password").value;

    var murl = "http://localhost:8080/api/v1/auth/authenticate";
    const loginData = {
        email: memail,
        password: mpassword
    }

    var mrole;
    console.log(loginData)
    var load = document.querySelector("#email");
    load.textContent = "loading login";

    if(document.querySelector("#customer").checked) {
        mrole = 'customer';
    } else {
        mrole = 'admin';
    }

    console.log("role is ", mrole);

    fetch(murl, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(loginData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to log in');
            }
            return response.json();

        })
        .then(data => {
            console.log(data)
            console.log(data.token)
            console.log("log in ok")
            localStorage.setItem("accessToken", data.token)
            load.textContent = "Congratulations login success";
            console.log(mrole)
            if (mrole == 'customer'){
                window.location.href = "http://127.0.0.1:5500/html/main/shop.html"; // replace with your main page URL
            } else {
                window.location.href = "http://127.0.0.1:5500/html/admin/index.html"; // replace with your main page URL
            }

        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function goRegister() {
    window.location.href = 'http://127.0.0.1:5500/sign-in-up/register.html';
}