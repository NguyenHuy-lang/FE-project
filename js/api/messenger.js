const chatBtn = document.getElementById('chat-btn');
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

chatBtn.addEventListener('click', () => {
    fetch('http://localhost:8080/api/v1/messenger-chat', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
        .then(response => {
            if (response.ok) {
                window.location.href = response.url;
            }
        })
        .catch(error => {
            console.error(error);
        });
});