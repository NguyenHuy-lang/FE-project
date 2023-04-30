var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);
// function deleteItem(itemId) {
//     fetch(`http://127.0.0.1:8080/api/v1/admin/products/${itemId}`, {
//         method: 'DELETE',
//         headers: {
//         'Content-Type': 'application/json'
//         // add any other necessary headers, such as authentication tokens
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//         throw new Error('Network response was not ok');
//         }
//         // handle successful response, such as updating UI
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         // handle error scenario, such as displaying an error message
//     });
// }


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
//paste here your copied configuration code
const firebaseConfig = {
    apiKey: "AIzaSyCrhXy6MadW640N6mB-e3cGmL5u3s8aL6s",
    authDomain: "hdvnhom8.firebaseapp.com",
    databaseURL: "https://hdvnhom8-default-rtdb.firebaseio.com",
    projectId: "hdvnhom8",
    storageBucket: "hdvnhom8.appspot.com",
    messagingSenderId: "321095979248",
    appId: "1:321095979248:web:fa7f40b6b5eda17e9af235",
    measurementId: "G-REPQT5RB2Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);
function upImage() {
    alert("Button clicked!");
    const ref = firebase.storage().ref();
    const file = document.querySelector("#photo").files[0];
    const name = + new Date() + "-" + file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task.then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        console.log(url);
        alert('image uploaded successfully');
        document.querySelector("#image").src = url;
    })
    .catch(console.error);
}
const errorMsgElement = document.querySelector('span#errorMsg');