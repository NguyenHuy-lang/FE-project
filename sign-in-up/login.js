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

// async function submitForm() {

//     params = {}
//     let regex = /([^&=]+)=([^&]*)/g, m
//     while (m = regex.exec(location.href)) {
//         params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
//     }

//     if (Object.keys(params).length > 0) {
//         localStorage.setItem('authInfo', JSON.stringify(params))
//     }

//     // window.history.pushState({}, document.title, "/" + "profile.html")

//     let info = JSON.parse(localStorage.getItem('authInfo'))

//     console.log(info)
//     console.log(info['access_token'])
//     console.log(info['expires_in'])

//     const accessToken = info['access_token'];
//     localStorage.setItem('accessToken', accessToken);

//     const postOptions = {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'Content-Type': 'application/json'
//         },
//     };

//     fetch('http://localhost:8080/api/v1/products', {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error('Request failed!');
//             }
//         })
//         .then(data => {
//             console.log(data);
//         })
//         .catch(error => {
//             console.error(error);
//         });

// }


// window.onload = function () {
//     if (location.href.length > 50) {
//         submitForm()
//     }
// }

