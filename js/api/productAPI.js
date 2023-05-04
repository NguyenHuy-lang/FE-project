const saveInfo = (btn) => {
<<<<<<< HEAD
  localStorage.setItem("endpoint", btn.getAttribute("id"));
  console.log(localStorage.getItem("endpoint"));
};

const getListProduct = () => {
  params = {};
  let regex = /([^&=]+)=([^&]*)/g,
    m;
  while ((m = regex.exec(location.href))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  if (Object.keys(params).length > 0) {
    localStorage.setItem("authInfo", JSON.stringify(params));
  }

  // window.history.pushState({}, document.title, "/" + "profile.html")

  let info = JSON.parse(localStorage.getItem("authInfo"));

  console.log(info);
  console.log(info["access_token"]);
  console.log(info["expires_in"]);

  var accessToken;
  if (localStorage.getItem("accessToken") == null) {
    const accessToken = info["access_token"];
    localStorage.setItem("accessToken", accessToken);
  } else {
    accessToken = localStorage.getItem("accessToken");
  }
  console.log("ALL PRODUCT");
  const APIUrl = "http://localhost:8080/api/v1/products";
  fetch(APIUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let render = data.map((item, index) => {
        return `<div class="List_item">
                <div class="Item_infor" id="${item.id}">
                  <img
                    src="${item.imgPath}"
                    alt="Anh ${item.id}"
                    class="img"
                  />
                  <p style="margin-top: 10px">${item.name}</p>
                  <p style="margin-top: 10px">${item.price}</p>
                </div>
                <div class="Button">
                  <button class="Bt" onclick="addToCart(${item.id})">Thêm vào giỏ hàng</button>
                  <button class="Bt" onclick="saveInfo(this)" id="${item.id}">
                    <a href="product.html" class="Bt_text">Xem chi tiết</a>
                  </button>
                </div>
              </div>`;
      });
      document.querySelector("#itemList").innerHTML = render.join("");
    });
};

const getAllCate = () => {
  params = {};
  let regex = /([^&=]+)=([^&]*)/g,
    m;
  while ((m = regex.exec(location.href))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  if (Object.keys(params).length > 0) {
    localStorage.setItem("authInfo", JSON.stringify(params));
  }

  // window.history.pushState({}, document.title, "/" + "profile.html")

  let info = JSON.parse(localStorage.getItem("authInfo"));

  console.log(info);
  console.log(info["access_token"]);
  console.log(info["expires_in"]);

  var accessToken;
  if (localStorage.getItem("accessToken") == null) {
    const accessToken = info["access_token"];
    localStorage.setItem("accessToken", accessToken);
  } else {
    accessToken = localStorage.getItem("accessToken");
  }

  const APIUrl = "http://localhost:8080/api/v1/categories";
  fetch(APIUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let render = data.map((item, index) => {
        return `<div class="Category_item">
                <a href="shop.html" onclick="sorting('${item.name}', 'cate')" class="Category_item" id="${item.name}">${item.name}</a>
              </div>`;
      });
      document.querySelector("#cate").innerHTML = render.join("");
    });
};

function sorting(name, type) {
  console.log(name);
  localStorage.setItem("endpoint", name);
  localStorage.setItem("sort_type", type);
}
const getListProductByCate = () => {
  console.log("SEARCH PRODUCT BY CATE");
  console.log(localStorage.getItem("endpoint"));
  const APIUrl =
    "http://localhost:8080/api/v1/categories/" +
    localStorage.getItem("endpoint");
  console.log(APIUrl);
  fetch(APIUrl, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
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
=======
    localStorage.setItem("endpoint", btn.getAttribute("id"));
    console.log(localStorage.getItem("endpoint"))
  }
  
  const getListProduct = () => {
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
    if(localStorage.getItem("accessToken") == null) {
      const accessToken = info['access_token'];
      localStorage.setItem("accessToken", accessToken);
    } else {
      accessToken = localStorage.getItem("accessToken");
    }
    console.log("ALL PRODUCT")
    const APIUrl = "http://localhost:8080/api/v1/products";
    fetch(APIUrl, {
      method: 'GET',
      headers: {
         'Authorization': `Bearer ${accessToken}`,
         'content-type': 'application/json' 
        },
    }).then((response) => response.json())
      .then((data) => {
        let render = data.map((item, index) => {
          return `<div class="List_item">
                  <div class="Item_infor" id="${item.id}">
                    <img
                      src="${item.imgPath}"
                      alt="Anh ${item.id}"
                      class="img"
                    />
                    <p style="margin-top: 10px">${item.name}</p>
                    <p style="margin-top: 10px">${item.price}</p>
                  </div>
                  <div class="Button">
                    <button class="Bt" onclick="addToCart(${item.id})">Thêm vào giỏ hàng</button>
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

  const APIUrl = "http://localhost:8080/api/v1/categories";
  fetch(APIUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
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
                    <button class="button_order" onclick="addToCart()">
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
          let commentHTML =  `
          <div class="Commenr_list-rating">
            <div class="Comment_avtar">
              <img src="/Image/IMG_1733 (1).JPG" alt="avtar" class="avtar" />
            </div>
            <div class="Comment_rating">
              <div class="Rating-comment">
                <div class="Rating-name">${item.customer.user.username}</div>
                <div class="Comment_comment-list">
                  <div class="Comment_text">
                    ${item.name}
                  </div>
                </div>
              </div>
            </div>
          </div>`;
          if(item.customer.id == 1) commentHTML += `<div class="Button">
          <button class="new-button" onClick="deleteCommentById(${item.id})">Xóa</button>
          <button class="new-button" onClick="showPopup(${item.id}, '${item.name}')">Chỉnh sửa</button>
        </div>`
        return commentHTML;
        });
        document.querySelector("#product_comment").innerHTML = render.join('');
      });
<<<<<<< HEAD
      document.querySelector("#itemList").innerHTML = render.join("");
    });
  localStorage.setItem("sort_type", null);
};
const searchProduct = () => {
  console.log("SEARCH PRODUCT BY NAME");
  const APIUrl =
    "http://localhost:8080/api/v1/products/search/" +
    localStorage.getItem("endpoint");
  fetch(APIUrl, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
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
      document.querySelector("#itemList").innerHTML = render.join("");
    });
  localStorage.setItem("sort_type", null);
};

const getProduct = () => {
  const endpoint = localStorage.getItem("endpoint");
  const APIUrl = "http://localhost:8080/api/v1/products/" + endpoint;
  console.log(APIUrl);
  fetch(APIUrl, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
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
                  <button class="button_order" onclick="addToCart()">
                    <a href="/main/cart.html" class="Order_text">Thêm vào giỏ hàng</a>
                  </button>
                </div>
              </div>`;
      document.querySelector("#product").innerHTML = render;
    });
};

const getProductComment = () => {
  const endpoint = localStorage.getItem("endpoint");
  const APIUrl =
    "http://localhost:8080/api/v1/products/" + endpoint + "/comment";

  fetch(APIUrl, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let render = data.map((item, index) => {
        let commentHTML = `
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
        </div>`;
        if (item.customer.id == 1)
          commentHTML += `<div class="Button">
        <button class="new-button" onClick="deleteCommentById(${item.id})">Xóa</button>
        <button class="new-button" onClick="showPopup(${item.id}, '${item.name}')">Chỉnh sửa</button>
      </div>`;
        return commentHTML;
      });
      document.querySelector("#product_comment").innerHTML = render.join("");
    });
};

function showPopup(commentId, name) {
  console.log("POP UP");
  document.getElementById("myPopup").style.display = "block";
  document.getElementById("hiddenCommentID").value = commentId;
  editableText.value = name;
}
function hidePopup() {
  document.getElementById("myPopup").style.display = "none";
}
function updateComment() {
  console.log(document.getElementById("editableText").value);
  const endpoint = localStorage.getItem("endpoint");
  const commentId = document.getElementById("hiddenCommentID").value;
  const APIUrl =
    "http://localhost:8080/api/v1/products/" +
    endpoint +
    "/comments/" +
    commentId;
  const data = {
    id: commentId,
    customer: {
      id: 1,
      email: "huynguyend19ptit@gmail.com",
      password: "123456",
      username: "nguyenhuy",
      user_type: "customer",
      address: "ha noi",
      phone: "0327894689",
    },
    comment: null,
    listComments: [],
    name: document.getElementById("editableText").value,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(APIUrl, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      window.location.href = "product.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function addComment() {
  const endpoint = localStorage.getItem("endpoint");
  const APIUrl =
    "http://localhost:8080/api/v1/products/" + endpoint + "/comment";
  const data = {
    customer: {
      id: 1,
      email: "huynguyend19ptit@gmail.com",
      password: "123456",
      username: "nguyenhuy",
      user_type: "customer",
      address: "ha noi",
      phone: "0327894689",
    },
    comment: null,
    listComments: [],
    name: document.getElementById("commentinput").value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(APIUrl, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function deleteCommentById(commentId) {
  const endpoint = localStorage.getItem("endpoint");
  const APIUrl =
    "http://localhost:8080/api/v1/products/" +
    endpoint +
    "/comments/" +
    commentId;
  console.log(APIUrl);
  fetch(APIUrl, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("Xóa thành công");
        window.location.href = "product.html";
      } else {
        alert("Xóa không thành công");
        window.location.href = "product.html";
      }
    })
    .catch((error) => {
      alert("Có lỗi xảy ra");
      window.location.href = "product.html";
    });
}
=======
  }

  function showPopup(commentId, name) {
    console.log("POP UP");
    document.getElementById("myPopup").style.display = "block";
    document.getElementById("hiddenCommentID").value = commentId;
    editableText.value = name;
  }
  function hidePopup() {
    document.getElementById("myPopup").style.display = "none";
  }
  function updateComment() {
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
    if(localStorage.getItem("accessToken") == null) {
      const accessToken = info['access_token'];
      localStorage.setItem("accessToken", accessToken);
    } else {
      accessToken = localStorage.getItem("accessToken");
    }
    console.log(document.getElementById('editableText').value)
    const endpoint = localStorage.getItem("endpoint");
    const commentId = document.getElementById("hiddenCommentID").value;
    const APIUrl = "http://localhost:8080/api/v1/products/" + endpoint + "/comments/" + commentId ;
    const data = {
      id: commentId,
      customer: null,
      comment: null,
      listComments: [],
      name: document.getElementById('editableText').value
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    };

    fetch(APIUrl, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        window.location.href = "product.html";
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  function addComment() {
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
    if(localStorage.getItem("accessToken") == null) {
      const accessToken = info['access_token'];
      localStorage.setItem("accessToken", accessToken);
    } else {
      accessToken = localStorage.getItem("accessToken");
    }
    
    const endpoint = localStorage.getItem("endpoint");
    const APIUrl = "http://localhost:8080/api/v1/products/" + endpoint + "/comment";
    const data = {
      customer: null,
      comment: null,
      listComments: [],
      name: document.getElementById('commentinput').value
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    };

    fetch(APIUrl, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function deleteCommentById(commentId) {
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
    if(localStorage.getItem("accessToken") == null) {
      const accessToken = info['access_token'];
      localStorage.setItem("accessToken", accessToken);
    } else {
      accessToken = localStorage.getItem("accessToken");
    }
    const endpoint = localStorage.getItem("endpoint");
    const APIUrl = "http://localhost:8080/api/v1/products/" + endpoint + "/comments/" + commentId;
    console.log(APIUrl);
    fetch(APIUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }})
      .then(response => {
        if (response.ok) {
          alert("Xóa thành công");
          window.location.href = "product.html";
        } else {
          alert("Xóa không thành công");
          window.location.href = "product.html";
        }
      })
      .catch(error => {
        alert("Có lỗi xảy ra");
        window.location.href = "product.html";
      });
  }
>>>>>>> ducanh
