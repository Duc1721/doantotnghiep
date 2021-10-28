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
/////////////// toogle state
function toggleStatea(home, room, device, stageToggle) {
    if (stageToggle == '1') {
        stageToggle = '0';

    } else if (stageToggle == '0') {
        stageToggle = '1';
    } else {}
    newPushRef = database.ref("ALL").child(home).child(room).child(device)
    newPushRef.set(stageToggle);

}


/////////////////// clear Device
function deleteDevice(home, room, device) {

    var result = confirm("Are you sure you want to delete this device configuration?");
    if (result == true) {
        newRemoteRef = database.ref("ADMIN").child(home).child(room).child(device)
        newRemoteRef.remove();
        showDevice(home, room)
    }

}

function deleteRoom(home, room) {

    var result = confirm("Are you sure you want to delete this room configuration?");
    if (result == true) {
        newRemoteRef = database.ref("ADMIN").child(home).child(room)
        newRemoteRef.remove();
        showRoom(home)
    }
}
//////table update
tableReportAll = document.getElementById("tablestate");
tableHomeAll = document.getElementById("homeName");
database.ref("ADMIN").on('value', async function(snap) {
    var ketqualangnghe = await snap.val();
    tableReportAll.innerHTML = ''
    num = 0;
    for (var Home in ketqualangnghe) {
        nhathemS = ketqualangnghe[Home]
        id_nha_fb = Home
        name_nha_fb = nhathemS.namenha
        for (var Room in nhathemS) {
            // console.log(Room)
            phongthemS = nhathemS[Room]
            name_phong_fb = phongthemS.namephong
                // console.log(phongthemS)
            if (Room != "namenha") {
                for (var Device in phongthemS) {
                    if (Device != "namephong") {
                        num++;
                        State = phongthemS[Device]
                        name_thietbi_fb = State.namethietbi
                        phanloai = State.phanloai
                        trangthai = State.trangthai
                        tableReportAll.innerHTML += `
                                <tr>
                                    <td>${num}</td>
                                    <td>${id_nha_fb}</td>
                                    <td>${name_nha_fb}</td>
                                    <td>${name_phong_fb}</td>
                                    <td>${name_thietbi_fb}</td>
                                    <td>${phanloai}</td>
                                    <td>${trangthai}</td>
                                    <td><button class="btn-outline-dark" onclick = "toggleStatea( '${Home}', '${Room}','${Device}', '${State}' )"><i class="fas fa-power-off"></i></button>
                                        <button class="btn-outline-dark" onclick = "deleteDevice( '${Home}', '${Room}','${Device}')"><i class="far fa-trash-alt"></i></button>
                                    </td>
                                </tr>`
                    }

                }

            }

        }

    }

});

homeName = document.getElementById("HName");
////////////////////////hien thi nha
function showHome() {
    database.ref("ADMIN").once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        homeName.innerHTML = "";
        for (var Home in ketqualangnghe) {

            idnamenha = ketqualangnghe[Home]
            name_nha_fb = idnamenha.namenha
            id_nha_fb = Home

            homeName.innerHTML += `
                    <div class="container-fluid">
                            <div class="card">
                                <h5 class="card-header btn " style ="text-align: left">Name: ${name_nha_fb}</h5>
                                <h5></h5>
                                <h6><button id="idhome${id_nha_fb}" class="btncus" onclick="showRoom('${id_nha_fb}')"><i class="fas fa-home"></i></button>
                                <button class="btncus" onclick="addnewRoom('${id_nha_fb}','${name_nha_fb}')"><i class="far fa-plus-square"></i></button>
                            </div>  
                        </div>
                    `
        }
    });

}
///////////////// hien thi ten phong
romeName = document.getElementById("RName");

deviceName = document.getElementById("DName");

function showRoom(Rhome) {
    idhome = document.getElementById("idhome" + Rhome);
    //idhome.style.backgroundColor = "greenyellow";
    database.ref("ADMIN").child(Rhome).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        romeName.innerHTML = "";
        for (var Room in ketqualangnghe) {
            //console.log(Room)
            if (Room != "namenha") {
                for (var tennha in ketqualangnghe) {
                    if (tennha == "namenha") { name_nha_fb = ketqualangnghe.namenha }
                }
                phong_fb = ketqualangnghe[Room]
                for (var Device in phong_fb) {
                    // console.log(Device)
                    if (Device != "namephong") {
                        for (var tenphong in phong_fb) {
                            if (tenphong == "namephong") {
                                name_phong_fb = phong_fb.namephong
                            }
                        }
                        thietbi_fb = phong_fb[Device]
                        name_thietbi_fb = thietbi_fb.namethietbi
                        phanloai_thietbi_fb = thietbi_fb.phanloai
                    }
                }
                romeName.innerHTML += `
                <div class="card">
                        <h5 id= "tennhahienthitenphong${Room}"class="card-header btn" style="text-align: left">${name_nha_fb}: ${name_phong_fb}</h5>
                        <h5></h5>
                        <h6><button id = "idroom${Rhome}${Room}"class="btn info" onclick="showDevice('${Rhome}','${Room}')"><i class="far fa-lightbulb"></i></button> 
                        <button class="btn info"  data-toggle="collapse" data-target="#showinput${Rhome}${Room}" onclick = "add_device( '${Rhome}','${name_nha_fb}', '${Room}','${name_phong_fb}','${phanloai_thietbi_fb}')"><i class="far fa-plus-square"></i></button>
                        <button class="btn info" onclick = "deleteRoom( '${Rhome}', '${Room}')"><i class="fa fa-close"></i></button> 
                        <button class="btn info" ><i class="fa fa-pencil-square-o"></i></button></h6>                
                </div> 
            `
                    // console.log(Room)
                deviceName.innerHTML = "";
            }
        }
    });
}


function showDevice(Dhome, Droom, Phanloai) {
    //Dhome:idnha | Droom: id phòng | D_namehome: tên nhà
    idroom = document.getElementById("idroom" + Dhome + Droom);
    idroom.style.backgroundColor = "greenyellow";
    database.ref("ADMIN").child(Dhome).child(Droom).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        deviceName.innerHTML = "";
        // ketqualangnghe
        for (var Device in ketqualangnghe) {
            console.log(Device)
            if (Device != "namephong") {
                for (var tenphong in ketqualangnghe) {
                    if (tenphong == "namephong") {
                        name_phong_fb = ketqualangnghe.namephong
                        console.log(name_phong_fb)
                    }
                }
                thietbi_fb = ketqualangnghe[Device]
                name_thietbi_fb = thietbi_fb.namethietbi
                phanloai_thietbi_fb = thietbi_fb.phanloai
                deviceName.innerHTML += `     
                   <div class="card">
                        <h5 class="card-header btn" style="text-align: left" >${name_phong_fb}: ${name_thietbi_fb}: ${phanloai_thietbi_fb}</h5>
                        <h5></h5>
                        <h6><button class="btn info" style="width:20%"><i class="fa fa-close" onclick = "deleteDevice( '${Dhome}', '${Droom}','${Device}')"></i></button>
                          <button class="btn info" style="width:20%"><i class="fa fa-pencil-square-o"></i></button> </h6>
                    </div> 
            `
            }
        }
    });
}

function aDevice(home, room) {
    addDevice = document.getElementById("addname" + home + room).value;
    if (addDevice != "") {
        state = "0";
        newRootRef = database.ref("ALL").child(home).child(room)
        newRootRef.child(addDevice).set(state)

        showRoom(home)
        showDevice(home, room)


    } else { window.alert("Error!"); }



}



//fitter
function search() {
    const input = document.getElementById("myInput");
    const inputStr = input.value.toUpperCase();
    document.querySelectorAll('#tabstate tr:not(.header').forEach((tr) => {
        const anyMatch = [...tr.children]
            .some(td => td.textContent.toUpperCase().includes(inputStr));
        if (anyMatch) tr.style.removeProperty('display');
        else tr.style.display = 'none';
    });
}
//////////// open/close tab state
function openState() {
    document.getElementById("tabstate").style.width = "100%";
}

function closeState() {
    document.getElementById("tabstate").style.width = "0";
}
/////////// open/close tab home state
function openRoom(evt, roomName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(roomName).style.display = "block";
    evt.currentTarget.className += "active";
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
document.getElementById("btnadd").click();
//////////////////random
function randomString(len, an) {
    an = an && an.toLowerCase();
    var str = "",
        i = 0,
        min = an == "a" ? 10 : 0,
        max = an == "n" ? 10 : 62;
    for (; i++ < len;) {
        var r = Math.random() * (max - min) + min << 0;
        str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
    }
    return str;
}
 
//randomString(10);        // "4Z8iNQag9v"
//randomString(10, "A");   // "aUkZuHNcWw"
//randomString(10, "N");   // "9055739230"
//console.log(randomString(8, "N"))
/////////////////// add home
var formAddHome = document.getElementById('addHome');

function addnewHome() {
    document.getElementById('name_home').disabled = false;
    document.getElementById('addHome').style.display = 'block'
    var newid = randomString(6, "N")
    document.getElementById("idnewHome").innerHTML = newid;
    document.getElementById('themroom').innerHTML = "";
    document.getElementById("idnewphong").innerHTML = "";
    document.getElementById("name_home").value = "";
    document.getElementById("nameRoom").value = "";


}

function addnewRoom(Idnha, nameNha) {
    console.log(Idnha)
        // Idnha
    document.getElementById('addHome').style.display = 'block'
    document.getElementById("idnewHome").innerHTML = Idnha;
    document.getElementById('themroom').innerHTML = "";
    document.getElementById("idnewphong").innerHTML = "";
    document.getElementById("name_home").value = nameNha;
    document.getElementById('name_home').disabled = true;
    document.getElementById("nameRoom").value = "";
}

function add_device(Idnha, nameNha, Idphong, namePhong) {
    showDevice(Idnha, Idphong)
    document.getElementById('addHome').style.display = 'block'
    document.getElementById("idnewHome").innerHTML = Idnha;
    document.getElementById('themroom').innerHTML = "";
    document.getElementById("idnewphong").innerHTML = Idphong;
    document.getElementById("name_home").value = nameNha;
    document.getElementById('name_home').disabled = true;
    document.getElementById("nameRoom").value = namePhong;
    document.getElementById("nameRoom").disabled = true;

}


/////////////////////////
function closeAddnewHome() {
    document.getElementById('addHome').style.display = 'none'
}
////////////////////////////////
function decRoom() {
    valueRoom = document.getElementById("valueRoomNumber").value;
    minRoom = 1;
    if (valueRoom > minRoom) {
        valueRoom = parseInt(valueRoom) - 1;
        document.getElementById('valueRoomNumber').setAttribute('value', valueRoom);
    } else {
        return valueRoom
    }

}

function incRoom() {
    valueRoom = document.getElementById("valueRoomNumber").value;
    maxRoom = 20;
    if (valueRoom < maxRoom) {
        valueRoom = parseInt(valueRoom) + 1;
        document.getElementById('valueRoomNumber').setAttribute('value', valueRoom);
        console.log(valueRoom)
    } else {
        return valueRoom
    }
}
/////////////////////// 
addIDroom = document.getElementById("themroom");
nameRoom = document.getElementById("nameRoom");
var mang_chua_cac_obj = []

function roomPlus() {
    name_home = document.getElementById("name_home").value
    id_home = document.getElementById("idnewHome").textContent
    nameRoom_new = document.getElementById("nameRoom").value;
    num_device = document.getElementById("valueRoomNumber").value;
    document.getElementById('themroom').innerHTML = ""
    var newidroom = randomString(4, "N")
    document.getElementById("idnewphong").innerHTML = newidroom
        // tên phòng: nameRoom_new   ----- id phòng:newidroom
    mang_chua_cac_obj = []
    object_nha = {
        name_nha: name_home,
        id_nha: id_home
    }
    object_phong = {
        name_phong: nameRoom_new,
        id_phong: newidroom
    }
    mang_chua_cac_obj.push(object_nha)
    mang_chua_cac_obj.push(object_phong)
    for (var i = 0; i < num_device; i++) {
        var newNameThietbi = 'id="Thiết bị ' + i + '"';
        var idNew_NameThietbi = "Thiết bị " + i;
        var newithietbi = "TB" + i;
        id = 'id="TB' + i + '"';
        id_phanloai = "phanloaithietbi" + i;
        divPhanLoai = `<div class="form-select" style= "width:10%">
                          <select id="phanloaithietbi${i}" onchange="selectDevice('phanloaithietbi${i}')">
                            <option value="Chưa chọn">Phân Loại</option>  
                            <option value="Thiết bị">Thiết bị</option>
                            <option value="Cảm biến">Cảm biến</option>
                          </select>
                        </div>`
        divIDThietbi = '<input disabled type="nameHome" ' + id + 'style="width:70%">'
        divNameThietbi = '<input type="nameHome" ' + newNameThietbi + ' style="width:20%;color:black;background-color:#47aedb87">'
            //< input disabled type = "nameHome" value = ""id = "{F8uu"} "></input>
        document.getElementById('themroom').innerHTML += divNameThietbi + divIDThietbi + divPhanLoai;
        document.getElementById(idNew_NameThietbi).setAttribute('value', idNew_NameThietbi)
        document.getElementById(newithietbi).setAttribute('value', "ID: " + newithietbi)
            //document.getElementById(idnumDev).setAttribute('value', "ID Room: " + idnumDev)   

        // object_tonghop += { thietbi: newithietbi }
        object_thietbi = {
            id_name_device: idNew_NameThietbi,
            id_device: newithietbi,
            id_phanloai: id_phanloai
        }
        mang_chua_cac_obj.push(object_thietbi)
            // console.log(name_home + "--" + id_home + "--" + nameRoom_new + "--" + newidroom + id_phanloai + newithietbi + idNew_NameThietbi)

    }
    document.getElementById('themroom').innerHTML += `<button class="btnadd1" onclick="oke_firebase()"><b>LƯU THÔNG TIN PHÒNG</b></button>`
}

function selectDevice(seDeid) {
    var selDevice = document.getElementById(seDeid).value;
    console.log(selDevice)
}

function oke_firebase() {
    document.getElementById("nameRoom").value = "";
    swal("Tốt lắm!", "Bạn đã lưu thông tin phòng!", "success");
    document.getElementById('name_home').disabled = true;
    console.log(mang_chua_cac_obj)
    name_nha = mang_chua_cac_obj[0].name_nha
    id_nha = mang_chua_cac_obj[0].id_nha
    name_phong = mang_chua_cac_obj[1].name_phong
    id_phong = mang_chua_cac_obj[1].id_phong
    for (let i = 2; i < mang_chua_cac_obj.length; i++) {
        id_name_device = mang_chua_cac_obj[i].id_name_device
        id_device = mang_chua_cac_obj[i].id_device
        id_phanloai = mang_chua_cac_obj[i].id_phanloai
        name_device = document.getElementById(id_name_device).value;
        phanloai = document.getElementById(id_phanloai).value;

        console.log("nhà:" + name_nha + "idnha:" + id_nha + "phòng:" + name_phong + "idphong:" + id_phong + "thietbi:" + name_device + "id_device:" + id_device + "loại:" + phanloai)
        newPushDevice = database.ref("ADMIN").child(id_nha).child(id_phong).child(id_device)
        newPushDevice.set({
            namethietbi: name_device,
            phanloai: phanloai,
            trangthai: "Đợi cập nhật từ GATEWAY"
        });
        newPushHome = database.ref("ADMIN").child(id_nha).child("namenha")
        newPushHome.set(name_nha);
        newPushRoom = database.ref("ADMIN").child(id_nha).child(id_phong).child("namephong")
        newPushRoom.set(name_phong);

    }
    document.getElementById('themroom').innerHTML = "";
    document.getElementById("idnewphong").innerHTML = "";

}