const saveInfo = (btn) => {
  localStorage.setItem("endpoint", btn.getAttribute("id"));
  console.log(localStorage.getItem("endpoint"))
}

const getListProduct = () => {
  console.log("ALL PRODUCT")
  const APIUrl = "http://localhost:8080/api/v1/products";
  fetch(APIUrl, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then((response) => response.json())
    .then((data) => {
      let render = data.map((item, index) => {
        return `<div class="List_item">
                <div class="Item_infor">
                  <img
                    src="${item.imgPath}"
                    alt="Anh ${item.id}"
                    class="img"
                  />
                  <p style="margin-top: 10px">${item.name}</p>
                  <p style="margin-top: 10px">${item.price}</p>
                </div>
                <div class="Button">
                  <button class="Bt">Thêm vào giỏ hàng</button>
                  <button class="Bt" onclick="saveInfo(this)" id="${item.id}">
                    <a href="product.html" class="Bt_text">Xem chi tiết</a>
                  </button>
                </div>
              </div>`;
      });
      document.querySelector("#itemList").innerHTML = render.join('');
    });
}

const getAllCate = () => {
  const APIUrl = "http://localhost:8080/api/v1/categories";
  fetch(APIUrl, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then((response) => response.json())
    .then((data) => {
      let render = data.map((item, index) => {
        return `<div class="Category_item">
                <a href="shop.html" onclick="sorting('${item.name}', 'cate')" class="List_Item" id="${item.name}">${item.name}</a>
              </div>`;
      });
      document.querySelector("#cate").innerHTML = render.join('');
    });
}

function sorting(name, type) {
  console.log(name);
  localStorage.setItem("endpoint", name);
  localStorage.setItem("sort_type", type);
}
const getListProductByCate = () => {
  console.log("SEARCH PRODUCT BY CATE");
  console.log(localStorage.getItem('endpoint'));
  const APIUrl = "http://localhost:8080/api/v1/categories/" + localStorage.getItem("endpoint");
  console.log(APIUrl);
  fetch(APIUrl, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then((response) => response.json())
    .then((data) => {
      let render = data.map((item, index) => {
        return `<div class="List_item">
            <div class="Item_infor">
              <img
                src="${item.imgPath}"
                alt="Anh ${item.id}"
                class="img"
              />
              <p style="margin-top: 10px">${item.name}</p>
              <p style="margin-top: 10px">${item.price}</p>
            </div>
            <div class="Button">
              <button class="Bt">Thêm vào giỏ hàng</button>
              <button class="Bt" onclick="saveInfo(this)" id="${item.id}">
                <a href="product.html" class="Bt_text">Xem chi tiết</a>
              </button>
            </div>
          </div>`;
      });
      document.querySelector("#itemList").innerHTML = render.join('');
    });
  localStorage.setItem("sort_type", null);
}
const searchProduct = () => {
  console.log("SEARCH PRODUCT BY NAME")
  const APIUrl = "http://localhost:8080/api/v1/products/search/" + localStorage.getItem("endpoint");
  fetch(APIUrl, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then((response) => response.json())
    .then((data) => {
      let render = data.map((item, index) => {
        return `<div class="List_item">
            <div class="Item_infor">
              <img
                src="${item.imgPath}"
                alt="Anh ${item.id}"
                class="img"
              />
              <p style="margin-top: 10px">${item.name}</p>
              <p style="margin-top: 10px">${item.price}</p>
            </div>
            <div class="Button">
              <button class="Bt">Thêm vào giỏ hàng</button>
              <button class="Bt" onclick="saveInfo(this)" id="${item.id}">
                <a href="product.html" class="Bt_text">Xem chi tiết</a>
              </button>
            </div>
          </div>`;
      });
      document.querySelector("#itemList").innerHTML = render.join('');
    });
  localStorage.setItem("sort_type", null);
}

const getProduct = () => {
  const endpoint = localStorage.getItem("endpoint");
  const APIUrl = "http://localhost:8080/api/v1/products/" + endpoint;
  console.log(APIUrl);
  fetch(APIUrl, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then((response) => response.json())
    .then((data) => {
      let render = `<div class="Product">
                <div class="Image">
                  <img
                    src="${data.imgPath}"
                    class="img"
                  />
                </div>
              </div>
              <div class="Description">
                <div class="Name">
                  <span> ${data.name}</span>
                </div>
                <div class="Description_price">
                  <div class="Price_title">GIÁ HIỆN TẠI:</div>
                  <div class="Price">${data.price}₫</div>
                </div>
                <div class="Description_quantity">
                  <div class="Quan_title">Số lượng đặt mua</div>
                  <input type="text" id="text" class="Quantity_input" />
                </div>
                <div class="Order">
                  <button class="button_order">
                    <a href="/main/cart.html" class="Order_text">Thêm vào giỏ hàng</a>
                  </button>
                </div>
              </div>`;
      document.querySelector("#product").innerHTML = render;
    });
}

const getProductComment = () => {
  const endpoint = localStorage.getItem("endpoint");
  const APIUrl = "http://localhost:8080/api/v1/products/" + endpoint + "/comment";

  fetch(APIUrl, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then((response) => response.json())
    .then((data) => {
      console.log(data);
      let render = data.map((item, index) => {
        return `
        <div class="Commenr_list-rating">
          <div class="Comment_avtar">
            <img src="/Image/IMG_1733 (1).JPG" alt="avtar" class="avtar" />
          </div>
          <div class="Comment_rating">
            <div class="Rating-comment">
              <div class="Rating-name">${item.customer.username}</div>
              <div class="Comment_comment-list">
                <div class="Comment_text">
                  ${item.name}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Button">
          <button class="bt">Xóa</button>
          <button class="bt">Chỉnh sửa</button>
          <button class="bt">Phản hồi</button>
          <div class="Button-text">
            <input type="text" placeholder="Phản hồi" class="text" />
          </div>
        </div>`;
      });
      document.querySelector("#product_comment").innerHTML = render.join('');
    });
}