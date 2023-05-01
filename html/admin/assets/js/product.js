// $(document).ready(function () {
//     $('#search-box').on('keyup', function () {
//         var query = $(this).val();
//         var url = 'http://127.0.0.1:8080/api/v1/products/search/' + query;
//         $.get(url, function (data) {
//             var results = $('#search-results');
//             results.empty();
//             $.each(data, function () {
//                 results.append($('<option>').text(this.name).val(this.id));
//             });
//         });
//     });
//     $('#search-results').on('click', 'option', function () {
//         var formDialog = document.getElementById('form-dialog');
//         var closeDialogButton = document.getElementById('close-dialog');
//         var resultId = $(this).val();
//         const form = document.querySelector('#update-form');
//         const prdIdField = document.querySelector('#prdid');
//         const prdNameField = document.querySelector('#prdname');
//         const descriptionField = document.querySelector('#description');
//         const img = document.querySelector('.imgsrc');
//         const priceField = document.querySelector('#price');
//         const categorySelect = document.querySelector('#category-select');
//         $('.hidden-form').show();
//         // Fetch the product data from the server
//         fetch(`http://127.0.0.1:8080/api/v1/admin/products/${resultId}`)
//             .then(response => response.json())
//             .then(product => {
//                 // Set the values of the form fields to the corresponding data of the product
//                 prdIdField.value = product.id;
//                 prdNameField.value = product.name;
//                 descriptionField.value = product.description;
//                 img.src = product.imgPath;
//                 priceField.value = product.price;
//                 categorySelect.value = product.cate.id;
//                 formDialog.style.display = 'block';

//             })
//             .catch(error => console.error(error));
//         closeDialogButton.addEventListener('click', function () {
//             formDialog.style.display = 'none';
//         });
//     });
// });
const apisite = 'http://localhost:8080/';

const searchResults = document.querySelector('.search-results');
const searchInput = document.querySelector('#search input');

function searchproduct() {
    const query = searchInput.value;
    const url = apisite + 'api/v1/products/search/' + query;
    fetch(url)
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
    fetch(`http://localhost:8080/api/v1/admin/products/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // add any other necessary headers, such as authentication tokens
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
    fetch(`http://127.0.0.1:8080/api/v1/admin/products/${id}`)
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

    fetch(`http://127.0.0.1:8080/api/v1/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
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
        });
});


fetch("http://127.0.0.1:8080/api/v1/admin/products").then(
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
                                            <a href="/html/admin/product_list.html" >Delete</a>
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