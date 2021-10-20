// ---------------------------------------config firebase-------------------------//
const firebaseConfig = {
    apiKey: "AIzaSyAEqi81NFMPBJGxWRy7QtQv961efPzL9LA",
    authDomain: "hellodatn.firebaseapp.com",
    databaseURL: "https://hellodatn-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hellodatn",
    storageBucket: "hellodatn.appspot.com",
    messagingSenderId: "559705579450",
    appId: "1:559705579450:web:3421e5377912259256c783",
    measurementId: "G-YK901S5FXQ"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
var nhahoang = database.ref("nhacuahoang");
// ---------------------------------------config firebase-------------------------//
// var dataRef = db.ref('Ban1');
var okey = document.getElementById("okey");
var temp = document.getElementById("temp");
var okey2 = document.getElementById("okey2");
var temp2 = document.getElementById("temp2");
var ttden = 0;
var ttden2 = 0;
// PHONG KHÁCH

okey.onclick = function() {
    if (ttden == 0) {
        ttden = 1;

    } else {
        ttden = 0;
    }

    console.log("hello");
    firebase.database().ref('nhacuahoang/' + 'phongkhach').update({
        den: ttden
    });
}


nhahoang.child('phongkhach/nhietdo').on('value', async function(snap) {
    var nhietdo = await snap.val();
    temp.innerHTML = 'Nhiệt độ là: ' + nhietdo;
    console.log(nhietdo)
});

nhahoang.child('phongkhach/den').on('value', async function(snap) {
    var ttled = await snap.val();
    ttden = ttled;
});


// PHONG BẾP
okey2.onclick = function() {
    if (ttden2 == 0) {
        ttden2 = 1;

    } else {
        ttden2 = 0;
    }

    console.log("hello");
    firebase.database().ref('nhacuahoang/' + 'phongbep').update({
        den: ttden2
    });
}


nhahoang.child('phongbep/nhietdo').on('value', async function(snap) {
    var nhietdo = await snap.val();
    temp2.innerHTML = 'Nhiệt độ là: ' + nhietdo;
    console.log(nhietdo)
});

nhahoang.child('phongbep/den').on('value', async function(snap) {
    var ttled = await snap.val();
    ttden2 = ttled;
});

// okey.addEventListener("click", writeUserData("phongkhach", 20));
// document.getElementById("okey").onclick = writeUserData("phongkhach", 12);
// console.log(okey)
console.log("hello");
console.log("hello");