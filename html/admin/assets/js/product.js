
const apisite = 'http://localhost:8080/';

const searchResults = document.querySelector('.search-results');
const searchInput = document.querySelector('#search input');

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



var accessToken;
if (localStorage.getItem("accessToken") == null) {
    const accessToken = info['access_token'];
    localStorage.setItem("accessToken", accessToken);
} else {
    accessToken = localStorage.getItem("accessToken");
}

function searchproduct() {
    const query = searchInput.value;
    const url = apisite + 'api/v1/products/search/' + query;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const results = document.querySelector('.search-results');
            results.innerHTML = '';
            if (data.length > 0) {
                results.style.display = 'block';
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.name;
                    li.addEventListener('click', () => {
                        // Do something with the selected item
                        populateCategoryWithApiData(item.id);
                    });
                    results.appendChild(li);
                });
            } else {
                results.style.display = 'none';
            }
        });
}



document.addEventListener('click', event => {
    const isClickInsideSearch = searchInput.contains(event.target) || searchResults.contains(event.target);
    if (!isClickInsideSearch) {
        searchResults.style.display = 'none';
    }
});

function deleteItem(itemId) {
    fetch(apisite + `api/v1/admin/products/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // add any other necessary headers, such as authentication tokens
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // handle successful response, such as removing the item from the UI
            const itemElement = document.querySelector(`li[data-item-id="${itemId}"]`);
            itemElement.remove();
        })
        .catch(error => {
            console.error('Error:', error);
            // handle error scenario, such as displaying an error message
        });
}

function populateFormWithApiData(id) {

    var formDialog = document.getElementById('form-dialog');
    var closeDialogButton = document.getElementById('close-dialog');
    // Replace URL with your API endpoint and ID parameter name
    const form = document.querySelector('#update-form');
    const prdIdField = document.querySelector('#prdid');
    const prdNameField = document.querySelector('#prdname');
    const descriptionField = document.querySelector('#description');
    const img = document.querySelector('.imgsrc');
    const priceField = document.querySelector('#price');
    const categorySelect = document.querySelector('#category-select');
    $('.hidden-form').show();
    // Fetch the product data from the server
    fetch(apisite + `api/v1/admin/products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    })
        .then(response => response.json())
        .then(product => {
            // Set the values of the form fields to the corresponding data of the product
            prdIdField.value = product.id;
            prdNameField.value = product.name;
            descriptionField.value = product.description;
            img.src = product.imgPath;
            priceField.value = product.price;
            categorySelect.value = product.cate.id;
            formDialog.style.display = 'block';

        })
        .catch(error => console.error(error));
    closeDialogButton.addEventListener('click', function () {
        formDialog.style.display = 'none';
    });
}

const updateForm = document.getElementById('update-form');

updateForm.addEventListener('submit', (event) => {
    // event.preventDefault(); // prevent the default form submission behavior

    const productId = document.getElementById('prdid').value;
    const prdName = document.getElementById('prdname').value;
    const description = document.getElementById('description').value;
    const imgPath = document.querySelector('.imgsrc').src; // assuming the img tag has a class of "img"
    const price = document.getElementById('price').value;
    const category = document.getElementById('category-select').value;

    const data = {
        id: productId,
        name: prdName,
        description: description,
        imgPath: imgPath,
        price: price,
        cate: {
            id: category
        }
    };

    fetch(apisite + `api/v1/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // handle the API response data
            console.log(data);
        })
        .catch(error => {
            // handle the error
            console.error(error);
            console.log("Loi gi vay ban oi");
        });
});


fetch(apisite + "api/v1/admin/products", {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
    },
}).then(
    res => {
        res.json().then(
            data => {
                console.log(data);
                if (data.length > 0) {
                    var temp = "";
                    data.forEach((itemData) => {
                        temp += `<tr>
                                    <td>${itemData.id}</td>
                                    <td><img width="50dp" height="50dp" src="${itemData.imgPath}" alt="Image placeholder" class="img-fluid"></td>
                                    <td>${itemData.name}</td>
                                    <td>${itemData.price}</td>
                                    <td>${itemData.cate.name}</td>
                                    <td>
                                        <div class="Button">
                                            <button onclick="deleteItem(${itemData.id})" id="Bt" class="btn btn-warning" type="button">
                                            <a href="/html/admin/pages/product_admin/product_list.html" >Delete</a>
                                            </button>
                                            <button onclick="populateFormWithApiData(${itemData.id})" id="Bt" class="btn btn-info" type="button">
                                            <a class="Bt_text">Update</a>
                                            </button>
                                        </div>
                                    </td>
                                </tr>`;

                    });
                    document.getElementById('data').innerHTML = temp;
                }
            }
        )
    }
)
fetch(apisite + 'api/v1/categories', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
    },
})
    .then(response => response.json())
    .then(data => {
        // handle the data
        const selectElement = document.querySelector('#category-select');
        data.forEach(category => {
            const optionElement = document.createElement('option');
            optionElement.value = category.id;
            optionElement.textContent = category.name;
            selectElement.appendChild(optionElement);
        });
    });

