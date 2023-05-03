function googleSignUp() {
    let oauth2EndPoint = "https://accounts.google.com/o/oauth2/v2/auth"

    let form = document.createElement('form')
    form.setAttribute('method', 'GET')
    form.setAttribute('action', oauth2EndPoint)

    let params = {
        "client_id": "94808415300-4453e41v16brkcd4l4gj3nbs3spq7ode.apps.googleusercontent.com",
        "redirect_uri": "http://127.0.0.1:5500/sign-in-up/confirm-register.html",
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



