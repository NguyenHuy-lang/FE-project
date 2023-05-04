const chatBtn = document.getElementById('chat-btn');

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