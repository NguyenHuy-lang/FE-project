
apisite = "http://localhost:8080/";
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


fetch(apisite + 'api/v1/admin/orders', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    }
})
    .then(response => response.json())
    .then(orders => {
        // Create a container for the orders
        const ordersContainer = document.querySelector('#orders');

        // Loop through the orders
        orders.forEach(order => {
            // Create a card for the order
            const card = document.createElement('div');
            card.className = 'card mb-3';

            // Create a card body for the order
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            // Create a title for the order
            const title = document.createElement('h5');
            title.className = 'card-title';
            title.innerText = `Order #${order.id}`;

            // Create a subtitle for the order
            const subtitle = document.createElement('h6');
            subtitle.className = 'card-subtitle mb-2 text-muted';
            subtitle.innerText = `Status: ${order.statusOrder} - Customer: ${order.customer.user.username}   Total: ${order.costMustPaid}`;

            // Add the title and subtitle to the card body
            cardBody.appendChild(title);
            cardBody.appendChild(subtitle);

            // Create a dropdown container for the cart items
            const dropdownContainer = document.createElement('div');
            dropdownContainer.className = 'dropdown';

            // Create a dropdown button for the cart items
            const dropdownButton = document.createElement('button');
            dropdownButton.className = 'btn btn- dropdown-toggle';
            dropdownButton.type = 'button';
            dropdownButton.innerText = 'View Cart';
            dropdownButton.dataset.bsToggle = 'dropdown';

            // Create a dropdown menu for the cart items
            const dropdownMenu = document.createElement('ul');
            dropdownMenu.className = 'dropdown-menu';

            // Loop through the cart items
            order.listProductOrder.forEach(cartItem => {
                // Create a dropdown item for the cart item
                const dropdownItem = document.createElement('li');
                dropdownItem.innerText = `${cartItem.product.name} : ${cartItem.quantity}`;

                // Add the dropdown item to the dropdown menu
                dropdownMenu.appendChild(dropdownItem);
            });

            // Add the dropdown button and menu to the dropdown container
            dropdownContainer.appendChild(dropdownButton);
            dropdownContainer.appendChild(dropdownMenu);

            // Add the card body and dropdown container to the card
            card.appendChild(cardBody);
            card.appendChild(dropdownContainer);

            // Add the card to the orders container
            ordersContainer.appendChild(card);
        });
    })
    .catch(error => console.error(error));