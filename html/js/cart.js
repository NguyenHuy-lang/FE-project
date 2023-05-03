const getCart = () => {
  const accessToken = localStorage.getItem('accessToken');
  const APIurl = 'http://localhost:8080/api/v1/carts/'
  fetch(APIurl, {
    method: 'GET',
    
    headers: {
       'content-type': 'application/json',
       'Authorization': `Bearer ${accessToken}`,
      },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then((data) => {
      if (data.length !== 0) {
        let render1 = data.listProductOrder.map((item, index) => {
          return `<tr>
                  <td>${index + 1}</td>
                  <td id="${index + 1}-id-product">${item.product.name} </td>
                  <td id="${index + 1}-id-product">${item.price} </td>
                  <td id="${index + 1}-id-product">${item.quantity} </td>
                  <td id="${index + 1}-id-product">${item.quantity * item.price} </td>

                  <td><button class="delete" id="${item.id}" onclick="deleteProduct(${item.id})">Delete</button></td>
                </tr>`;
        });
        document.querySelector("#main").innerHTML = render1.join(' ');

        document.querySelector("#cart-id").textContent = data.id;
        document.querySelector("#create-date").textContent = data.createDate;
        document.querySelector("#receive-date").textContent = data.receiveDate;
        document.querySelector("#cost-temp").textContent = data.costTemp;
        document.querySelector("#cost-discount").textContent = data.costDiscount;
        document.querySelector("#cost-must-paid").textContent = 10;
      } else {
        document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu";
      }
    });
}

document.addEventListener("DOMContentLoaded", () => {
  getCart();
});

const deleteProduct = (productId) => {
  const APIurl = 'http://localhost:8080/api/v1/carts/';
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: productId })
  };
  fetch(APIurl, options)
    .then(data => {
      window.location.reload();
    })

}


const payPal = () => {
  console.log("call paypal()");
  const accessToken = localStorage.getItem('accessToken');

  const url = "http://localhost:8080/api/v1/pay/";
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,

    }
  
  }).then(response => response.text())
  .then(data => {
    const redirectUrl = data.match(/redirect:(.*)/)[1].trim();
    console.log(redirectUrl);
    window.location.href = redirectUrl;

  })
  .catch(error => console.error(error));
}


