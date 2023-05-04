function addToCart(productId) {
    var accessToken = localStorage.getItem("accessToken")
    const url = "http://localhost:8080/api/v1/carts/"
    const data = {
        id:productId
    }
    fetch(url, {
        method:'POST',
        headers:{
            'Authorization': `Bearer ${accessToken}`,
            'content-type': 'application/json' 
        },
        body:JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log("add ok")
        }
    })
}