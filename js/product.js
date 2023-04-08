var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);


var Button_color = document.querySelectorAll(".color");
var check_bt = false;
for(var i = 0 ; i < Button_color.length ; i++){
    
}

function deleteProductbyId(id){
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://127.0.0.1:8080/api/v1/admin/products/" + id);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log("Product deleted successfully");
        } else {
            console.log("Error deleting product");
        }
    };
    xhr.send();
}

