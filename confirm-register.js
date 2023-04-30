async function submitForm() {

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

    const accessToken = info['access_token'];
    localStorage.setItem('accessToken', accessToken);

    fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + accessToken, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Request failed!');
            }
        })
        .then(data => {
            console.log("data ", data.email);
            var block = document.querySelector('#email');
            const newElement = document.createElement('h1');
            const textNode = document.createTextNode(data.email);
            newElement.appendChild(textNode);
            block.appendChild(newElement)
        })
        .catch(error => {
            console.error(error);
        });

}


window.onload = function () {
    if (location.href.length > 50) {
        submitForm()
    }
}

function confirmGoogleSignUp() {
    const url = 'http://localhost:8080/api/v1/auth/register';
    const parentElement = document.querySelector('#email');
    const email = parentElement.querySelector('h1').textContent; 

    const data = {username: email, password: document.querySelector('.pas').value};

    fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            response.json()
            window.location.href = '/login.html'
        }
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));

}