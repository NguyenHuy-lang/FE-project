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

firebase.initializeApp(firebaseConfig);

var fileText = document.querySelector(".fileText");
var uploadPercentage = document.querySelector(".uploadPercentage");
var progress = document.querySelector(".progress");
var percentVal;
var fileItem;
var fileName;
var img = document.querySelector(".img");
function getFile(e){
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName;
}

function uploadImage(event){
    event.preventDefault();
    let storageRef = firebase.storage().ref("product/" + fileName);
    let uploadTask = storageRef.put(fileItem);

    uploadTask.on("state_changed",(snapshot)=>{
        console.log(snapshot);
        percentVal = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        console.log(percentVal);
        uploadPercentage.innerHTML = percentVal+"%";
        progress.style.width = percentVal+"%";
    },(error)=>{
        console.log("Error is ",error);
    },()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log("Url",url);
            if(url != ""){
                img.setAttribute("src", url);
                img.style.display = "block";
            }
        })
    })
    let myinp = document.getElementById("#imagereceived");
    myinp.value = url
}