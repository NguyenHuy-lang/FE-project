function getCart() {
  const accessToken = localStorage.getItem("accessToken");
  const APIurl = "http://localhost:8080/api/v1/carts/";
  fetch(APIurl, {
    method: "GET",

    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then((data) => {
      if (data.length !== 0) {
        let render1 = data.listProductOrder.map((item, index) => {
          return `<tr>
                  <td>${index + 1}</td>
                  <td id="${index + 1}-id-product">${item.product.name} </td>
                  <td id="${index + 1}-id-product">${item.price} </td>
                  <td id="${index + 1}-id-product" class="product-quantity">
                    <button onclick="decreaseQuantity(${index + 1})">-</button>
                    <span id="${index + 1}-quantity">${item.quantity}</span>
                    <button onclick="increaseQuantity(${index + 1})">+</button>
                  </td>
                  <td id="${index + 1}-id-product">${item.quantity * item.price} </td>
                  <td><button class="delete" id="${item.id}" onClick="deleteProduct(${item.id})"
                   class="product-remove">Delete</button></td>
                </tr>`;
        });
        document.querySelector("#main").innerHTML = render1.join(" ");

        document.querySelector("#cart-id").textContent = data.id;
        document.querySelector("#create-date").textContent = data.createDate;
        document.querySelector("#receive-date").textContent = data.receiveDate;
        document.querySelector("#cost-temp").textContent = data.costTemp;
        document.querySelector("#cost-discount").textContent =
          data.costDiscount;
        document.querySelector("#cost-must-paid").textContent = data.costMustPaid;
      } else {
        document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu";
      }
    });
};

function decreaseQuantity(productId) {
  const accessToken = localStorage.getItem("accessToken");
  const url = 'http://localhost:8080/api/v1/carts/down';
  const data = {
    id:productId
  }

  fetch(url, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error deleting product.');
      }
      return response.json();
    })
    .then(data => {
      console.log(`Product ${productId} deleted successfully.`);
      window.location.href = "http://127.0.0.1:5500/html/main/cart.html";
    })
    .catch(error => {
      console.error(error);
    });
}

function increaseQuantity(productId) {
  const accessToken = localStorage.getItem("accessToken");
  const url = 'http://localhost:8080/api/v1/carts/up';
  const data = {
    id:productId
  }

  fetch(url, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error deleting product.');
      }
      return response.json();
    })
    .then(data => {
      console.log(`Product ${productId} deleted successfully.`);
      window.location.href = "http://127.0.0.1:5500/html/main/cart.html";
    })
    .catch(error => {
      console.error(error);
    });
}

function deleteProduct(productId) {
  const accessToken = localStorage.getItem("accessToken");
  const url = `http://localhost:8080/api/v1/carts/${productId}`;
  fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error deleting product.');
      }
      return response.json();
    })
    .then(data => {
      console.log(`Product ${productId} deleted successfully.`);
      window.location.href = "http://127.0.0.1:5500/html/main/cart.html";
    })
    .catch(error => {
      console.error(error);
    });
}



const payPal = () => {
  console.log("call paypal()");
  var accessToken = localStorage.getItem('accessToken');


  const url = "http://localhost:8080/api/v1/pay/";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.text())
    .then((data) => {
      const redirectUrl = data.match(/redirect:(.*)/)[1].trim();
      console.log(redirectUrl);
      window.location.href = redirectUrl;
    })
    .catch((error) => console.error(error));
};
