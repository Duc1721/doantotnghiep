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
function toggleStatea(idnha, idphong, idthietbi, trangthai) {
    if (trangthai == 0) {
        trangthai = 1;    
        trangthai_mahoa = encode_data(trangthai)
        newPush_trangthai = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi).child("onoff")
        newPush_trangthai.set(trangthai_mahoa);
    } else if (trangthai == 1) {
        trangthai = 0;
        trangthai_mahoa = encode_data(trangthai)
        newPush_trangthai = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi).child("onoff")
        newPush_trangthai.set(trangthai_mahoa);
    } else {
        swal("LƯU Ý!", "VUI LÒNG CẤU HÌNH GATEWAY!", "error");
    }

} 
tableReportAll = document.getElementById("tablestate");
database.ref("ADMIN").on('value', async function(snap) {
    var ketqualangnghe = await snap.val();
    tableReportAll.innerHTML = ''
    num = 0;
    name_nha_fb = ''
    name_phong_fb = ''
    maubang = 0;
    for (var Home in ketqualangnghe) {
        nhathemS = ketqualangnghe[Home]
        id_nha_fb = Home
        name_nha_fb = decode_data(nhathemS.namenha)
        maubang = maubang + 1
        maubang = maubang%2
        for (var Room in nhathemS) {
            phongthemS = nhathemS[Room]
            name_phong_fb = decode_data(phongthemS.namephong)
            if (Room != "namenha") {
                for (var Device in phongthemS) {
                    if (Device != "namephong") {
                        num++;
                        State = phongthemS[Device]
                        name_thietbi_fb = decode_data(State.namethietbi)
                        phanloai = decode_data(State.phanloai)
                        trangthai = decode_data(State.trangthai)
                        onoff = decode_data(State.onoff)
                        if(phanloai=="Thiết bị"){
                        tableReportAll.innerHTML += `
                                <tr class = "maubang_${maubang}">
                                    <td>${num}</td>
                                    <td>${id_nha_fb}</td>
                                    <td>${name_nha_fb}</td>
                                    <td>${name_phong_fb}</td>
                                    <td>${name_thietbi_fb}</td>
                                    <td>${phanloai}</td>
                                    <td>${trangthai}</td>
                                    <td><button class="btn-outline-dark" onclick = "toggleStatea( '${Home}', '${Room}','${Device}', '${onoff}')"><i class="fas fa-power-off"></i></button>
                                        <button class="btn-outline-dark" onclick = "deleteDevice( '${Home}', '${Room}','${Device}')"><i class="far fa-trash-alt"></i></button>
                                    </td>
                                </tr>`
                        } else {
                            tableReportAll.innerHTML += `
                            <tr class = "maubang_${maubang}">
                                <td>${num}</td>
                                <td>${id_nha_fb}</td>
                                <td>${name_nha_fb}</td>
                                <td>${name_phong_fb}</td>
                                <td>${name_thietbi_fb}</td>
                                <td>${phanloai}</td>
                                <td>${trangthai}</td>
                                <td><button class="btn-outline-dark" onclick = "deleteDevice( '${Home}', '${Room}','${Device}')"><i class="far fa-trash-alt"></i></button></td>
                            </tr>`
                        }
                    }
                } 
            }  
        }
    }
});
homeName = document.getElementById("HName");
romeName = document.getElementById("RName");
deviceName = document.getElementById("DName");
function showHome() {
    romeName.innerHTML = ""
    deviceName.innerHTML = ""
    database.ref("ADMIN").once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        homeName.innerHTML = "";
        for (var Home in ketqualangnghe) {
            idnamenha = ketqualangnghe[Home]
            name_nha_fb = decode_data(idnamenha.namenha)
            id_nha_fb = Home
            homeName.innerHTML += `
                            <div class="card">
                                <h5 class="card-header btn"><b><i class="fas fa-building"></i> ${name_nha_fb}</b></h5>
                                <h5></h5>
                                <h6><button id="idhome${id_nha_fb}" class="btncus btn-add-home" onclick="showRoom('${id_nha_fb}')" data-toggle="tooltip" title="Hiển thị phòng!" ><i class="fas fa-home"></i></button>
                                <button class="btncus" onclick="addnewRoom('${id_nha_fb}','${name_nha_fb}')"  data-toggle="tooltip" title="Thêm phòng!"><i class="far fa-plus-square"></i></button>
                                <button class="btncus" onclick = "deleteHome( '${id_nha_fb}')" title="Xóa nhà!"><i class="far fa-trash-alt"></i></button>
                                <button class="btncus" data-toggle="collapse" data-toggle="tooltip" title="Sửa tên nhà!" data-target="#rename_home${id_nha_fb}"><i class="fa fa-pencil-square-o"></i></button> </h6>
                                <div id="rename_home${id_nha_fb}" class="collapse">
                                    <input id="input${id_nha_fb}"   maxlength="20" type="nameHome" style="width:80%" placeholder="Nhập tên nhà mới"><button class="btncus" id="check${id_nha_fb}" onclick="checknewname_home('${id_nha_fb}')"><i class="fad fa-check"></i></button>
                                </div>  
                            </div>   `
        }
    });
}
tennhaht = document.getElementById("nhaht")
function showRoom(Rhome) {
    tenphonght.innerHTML = "#"
    window.scrollTo(0, 0);
    deviceName.innerHTML = "";
    xoa_mau_home = document.getElementsByClassName("btn-add-home")
    for (var i = 0; i < xoa_mau_home.length; i++) {
        xoa_mau_home[i].style.backgroundColor = "transparent";
    }
    database.ref("ADMIN").child(Rhome).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        romeName.innerHTML = "";
        for (var Room in ketqualangnghe) {
            if (Room != "namenha") {
                for (var tennha in ketqualangnghe) {
                    if (tennha == "namenha") { 
                        name_nha_fb = decode_data( ketqualangnghe.namenha) 
                        tennhaht.innerHTML = "#"+name_nha_fb
                    }
                }
                phong_fb = ketqualangnghe[Room]
                for (var Device in phong_fb) {
                    if (Device != "namephong") {
                        for (var tenphong in phong_fb) {
                            if (tenphong == "namephong") {
                                name_phong_fb = decode_data(phong_fb.namephong)
                            }
                        }
                        thietbi_fb = phong_fb[Device]
                        name_thietbi_fb = decode_data(thietbi_fb.namethietbi)
                        phanloai_thietbi_fb = decode_data(thietbi_fb.phanloai)
                    }
                }
                romeName.innerHTML += `
                <div class="card">
                        <h5 id= "tennhahienthitenphong${Room}"class="card-header btn"><b><i class="fas fa-home"></i> ${name_phong_fb}</b></h5>
                        <h5></h5>
                        <h6><button id = "idroom${Rhome}${Room}"class="btncus btn-add-room" onclick="showDevice('${Rhome}','${Room}')"  data-toggle="tooltip" title="Hiển thị thiết bị!"><i class="far fa-lightbulb"></i></button> 
                        <button class="btncus" onclick = "addnewdevice( '${Rhome}','${name_nha_fb}', '${Room}','${name_phong_fb}','${phanloai_thietbi_fb}')"  data-toggle="tooltip" title="Thêm thiết bị!"><i class="far fa-plus-square"></i></button>
                        <button class="btncus" onclick = "deleteRoom( '${Rhome}', '${Room}')"  data-toggle="tooltip" title="Xóa phòng!"><i class="far fa-trash-alt"></i></button> 
                        <button class="btncus" data-toggle="collapse" data-target="#rename_room${Rhome}${Room}"><i class="fa fa-pencil-square-o"  data-toggle="tooltip" title="Đổi tên phòng!"></i></button> </h6>
                        <div id="rename_room${Rhome}${Room}" class="collapse">
                            <input id="input${Rhome}${Room}" type="nameHome" style="width:80%"  maxlength="20" placeholder="Nhập tên phòng mới"><button class="btncus" id="check${Rhome}${Room}" onclick="checknewname_room('${Rhome}','${Room}')"><i class="fad fa-check"></i></button>
                        </div>     
                </div> 
            `             
            }
        }
    });
    idhome = document.getElementById("idhome" + Rhome);
    idhome.style.backgroundColor = "red";    
}
tenphonght = document.getElementById("phonght")
function showDevice(Dhome, Droom) {
    //Dhome:idnha | Droom: id phòng | D_namehome: tên nhà
    xoa_mau = document.getElementsByClassName("btn-add-room")
    for (var i = 0; i < xoa_mau.length; i++) {
        xoa_mau[i].style.backgroundColor = "transparent";
    }
    database.ref("ADMIN").child(Dhome).child(Droom).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        deviceName.innerHTML = "";
        for (var Device in ketqualangnghe) {
            if (Device != "namephong") {
                for (var tenphong in ketqualangnghe) {
                    if (tenphong == "namephong") {
                        name_phong_fb = decode_data(ketqualangnghe.namephong)
                        tenphonght.innerHTML = "#"+name_phong_fb
                    }
                }
                thietbi_fb = ketqualangnghe[Device]
                name_thietbi_fb = decode_data(thietbi_fb.namethietbi)
                phanloai_thietbi_fb = decode_data(thietbi_fb.phanloai)
                trangthai_thietbi_fb =decode_data( thietbi_fb.trangthai)
                deviceName.innerHTML += `     
                   <div class="card">
                        <h5 class="card-header btn"><b><i class="fad fa-fan-table"></i> ${name_thietbi_fb} - <i class="fas fa-clipboard-list-check"></i> ${phanloai_thietbi_fb}</b></h5>
                        <h5></h5>
                        <h6><button class="btncus"><i class="far fa-trash-alt" onclick = "deleteDevice( '${Dhome}', '${Droom}','${Device}')"  data-toggle="tooltip" title="Xóa thiết bị!"></i></button>

                          <button class="btncus" data-toggle="collapse" data-target="#rename_device${Dhome}${Droom}${Device}"  data-toggle="tooltip" title="Đổi tên thiết bị!"><i class="fa fa-pencil-square-o"></i></button> 
                          <button class="btncus" data-toggle="collapse" data-target="#retype_device${Dhome}${Droom}${Device}"  data-toggle="tooltip" title="Phân loại thiết bị!"><i class="fas fa-sunset"></i></button> 
                          
                         </h6>


                            <div id="rename_device${Dhome}${Droom}${Device}" class="collapse">
                                <input id="input${Dhome}${Droom}${Device}" type="nameHome" style="width:80%"  maxlength="20" placeholder="Nhập tên thiết bị mới"><button class="btncus" id="check${Dhome}${Droom}${Device}" onclick="checknewname_device('${Dhome}','${Droom}','${Device}')"><i class="fad fa-check"></i></button>
                            </div> 

                            <div class="form-check collapse" id="retype_device${Dhome}${Droom}${Device}">

                              <h5 class="btncheck">  
                                <label><input type="radio"  onclick="if(this.checked){checktype_device1('${Dhome}','${Droom}','${Device}')}" checked> Thiết bị</label>
                                <label><input type="radio"  onclick="if(this.checked){checktype_device2('${Dhome}','${Droom}','${Device}')}"> Cảm biến</label></h5>
                            </div>

                    </div> 
            `
            }
        }
    });
    idroom = document.getElementById("idroom" + Dhome + Droom);   
    idroom.style.backgroundColor = "red";
}

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

function openState() {
    document.getElementById("tabstate").style.width = "100%";
    document.getElementById("defaultOpen").click();
    showHome()
}

function closeState() {
    tennhaht.innerHTML = "#"
    tenphonght.innerHTML = "#"
    document.getElementById("tabstate").style.width = "0";
}

function openRoom(evt, roomName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(roomName).style.display = "block";
    evt.currentTarget.className += "active";
}
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
    //randomString(10);        // "4Z8iNQag9v"
    //randomString(10, "A");   // "aUkZuHNcWw"
    //randomString(10, "N");   // "9055739230"
} 

var formAddHome = document.getElementById('addHome');
function addnewHome() {  
    conentaoidhaykhong = 1;
    document.getElementById('name_home').disabled = false;
    document.getElementById('nameRoom').disabled = false;
    document.getElementById('addHome').style.display = 'block'
    var tt_id_home = 1;
    if(tt_id_home == 1){
        var newid = randomString(6, "N")
        tt_id_home = 0  
        if( tt_id_home == 0){
            tt_tao_mk = 1
        }  
    }
    document.getElementById("idnewHome").innerHTML = newid;
    document.getElementById('themroom').innerHTML = "";
    document.getElementById("idnewphong").innerHTML = "";
    document.getElementById("name_home").value = "";
    document.getElementById("nameRoom").value = "";
    document.getElementById("add_device_modal").innerHTML = `
    <button onclick="roomPlus(${conentaoidhaykhong},0)" class="btnadd">XÁC NHẬN SỐ THIẾT BỊ</button>
    `;
}

function addnewRoom(Idnha, nameNha) {
    conentaoidhaykhong = 1;
    document.getElementById('addHome').style.display = 'block'
    document.getElementById("idnewHome").innerHTML = Idnha;
    document.getElementById('themroom').innerHTML = "";
    document.getElementById("idnewphong").innerHTML = "";
    document.getElementById("name_home").value = nameNha;
    document.getElementById('name_home').disabled = true;
    document.getElementById('nameRoom').disabled = false;
    document.getElementById("nameRoom").value = "";
    document.getElementById("add_device_modal").innerHTML = `
    <button onclick="roomPlus(${conentaoidhaykhong},0)" class="btnadd" required>XÁC NHẬN SỐ THIẾT BỊ</button>
    `;    
}

function addnewdevice(Idnha, nameNha, Idphong, namePhong) {
    conentaoidhaykhong=0;
    showDevice(Idnha, Idphong)
    document.getElementById('addHome').style.display = 'block'
    document.getElementById("idnewHome").innerHTML = Idnha;
    document.getElementById('themroom').innerHTML = "";
    document.getElementById("idnewphong").innerHTML = Idphong;
    document.getElementById("name_home").value = nameNha;
    document.getElementById('name_home').disabled = true;
    document.getElementById("nameRoom").value = namePhong;
    document.getElementById("nameRoom").disabled = true;
    document.getElementById("add_device_modal").innerHTML = `
    <button onclick="roomPlus(${conentaoidhaykhong},'${Idphong}')" class="btnadd">XÁC NHẬN SỐ THIẾT BỊ</button>`
}

function closeAddnewHome() {
    showHome()
    document.getElementById('addHome').style.display = 'none'
}
function decRoom() {
    sothietbi = document.getElementById("valueRoomNumber").value;
    minRoom = 1;
    if (sothietbi > minRoom) {
        sothietbi = parseInt(sothietbi) - 1;
        document.getElementById('valueRoomNumber').setAttribute('value', sothietbi);
    } else {
        return sothietbi
    }

}

function incRoom() {
    sothietbi = document.getElementById("valueRoomNumber").value;
    maxRoom = 8;
    if (sothietbi < maxRoom) {
        sothietbi = parseInt(sothietbi) + 1;
        document.getElementById('valueRoomNumber').setAttribute('value', sothietbi);
    } else {
        return sothietbi
    }
}

addIDroom = document.getElementById("themroom");
nameRoom = document.getElementById("nameRoom");
var mang_chua_cac_obj = []

function roomPlus(conentaoidhaykhong,id_room) {
  
    name_home = document.getElementById("name_home").value
    if(name_home.length > 5){
        idnha = document.getElementById("idnewHome").textContent
        nameRoom_new = document.getElementById("nameRoom").value;
        if(nameRoom_new.length > 5){
            num_device = document.getElementById("valueRoomNumber").value;
            document.getElementById('themroom').innerHTML = ""
            if(conentaoidhaykhong=='1'){
                var newidroom = randomString(4, "N")
                document.getElementById("idnewphong").innerHTML = newidroom
            } 
            else{
                newidroom = id_room;
            }
            var biendemthietbi=0
            database.ref("ADMIN").child(idnha).child(newidroom).once('value', async function(snap) {
                var ketqualangnghe = await snap.val();    
                  
                for (idthietbi in ketqualangnghe){
                    biendemthietbi ++
                    
                }

                if(biendemthietbi < 0){biendemthietbi=1}
                if(+num_device +biendemthietbi <= 9){

                mang_chua_cac_obj = []
                object_nha = {
                    name_nha: name_home,
                    id_nha: idnha 
                }
                object_phong = {
                    name_phong: nameRoom_new,
                    id_phong: newidroom
                }
                
                mang_chua_cac_obj.push(object_nha)
                mang_chua_cac_obj.push(object_phong)
                for (var i = biendemthietbi ; i < +num_device +biendemthietbi; i++) {
                    soid =  randomString(4, "N");
                    var newNameThietbi = 'id="Thiết bị ' + soid + '"';
                    var idNew_NameThietbi = "Thiết bị " + soid;
                    var newithietbi = "PL" + soid;
                    id = 'id="PL' + soid + '"';
                    id_phanloai = "phanloaithietbi" + soid;
                    divPhanLoai = `<div class="form-select" style= "width:10%">
                                    <select id="phanloaithietbi${soid}">
                                        <option value="Thiết bị">Thiết bị</option>
                                        <option value="Cảm biến">Cảm biến</option>
                                    </select>
                                    </div>`
                    divIDThietbi = '<input disabled type="nameHome" ' + id + 'style="width:70%">'
                    divNameThietbi = '<input type="nameHome" ' + newNameThietbi + ' style="width:20%;color:black;background-color:#47aedb87">'
                    document.getElementById('themroom').innerHTML += divNameThietbi + divIDThietbi + divPhanLoai;
                    document.getElementById(idNew_NameThietbi).setAttribute('value', idNew_NameThietbi)
                    document.getElementById(newithietbi).setAttribute('value', "ID: " + newithietbi)
                    object_thietbi = {
                        id_name_device: idNew_NameThietbi,
                        id_device: newithietbi,
                        id_phanloai: id_phanloai
                    }
                    mang_chua_cac_obj.push(object_thietbi)
                   
                }

            }
            else{
                swal("Cảnh báo!", "Số lượng thiết bị vượt giới hạn, bạn chỉ có thể có tối đa 8 thiết bị trong 1 phòng!")
            }
                document.getElementById('themroom').innerHTML += `<br><button class="btnadd1" onclick="oke_firebase('${idnha}', '${newidroom}')"><b>LƯU THÔNG TIN PHÒNG</b></button>`   
            });   
        } else {
            swal("Lưu ý!", "Tên phòng phải lớn hơn 5 ký tự!", "error");
        } 
    } else {
        swal("Lưu ý!", "Tên nhà phải lớn hơn 5 ký tự!", "error");
    }
    //showHome()
}
var khac = 1
var tt_tao_mk = 1
function taomatkhau(){
    database.ref("ADMIN").once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        id_home = document.getElementById("idnewHome").textContent
        for (var Home in ketqualangnghe) {
            if(id_home!=Home){
                khac++
            } else khac = 1
                if (khac*tt_tao_mk==1){
                    tt_tao_mk = 0
                    new_mk = encode_data(id_home)
                    newPush_mk = database.ref("PASS").child(id_home)
                    newPush_mk.set(new_mk);
                } else if(khac*tt_tao_mk==0){
                    tt_tao_mk = 2
                    khac = 1
                } else {}
            }
    })
}
function deleteHome(home){
	swal({
		title: "Bạn chắc chắn muốn xóa?",
		text: "Bạn sẽ không thể hổi phục lại dữ liệu!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Đồng ý, xóa!',
		cancelButtonText: "Không, hủy yêu cầu!",
		closeOnConfirm: false,
		closeOnCancel: false
	},
	function(isConfirm){
    if (isConfirm){
      swal("Đã xóa!", "Dữ liệu của bạn đã được xóa!", "success");
      newRemoteRef = database.ref("ADMIN").child(home)
      newRemoteRef.remove();
      newRemotePass = database.ref("PASS").child(home)
      newRemotePass.remove();
      romeName.innerHTML = "";
      deviceName.innerHTML = "";
      showHome()
    } else {
      swal("Hủy", "Dữ liệu của bạn được bảo toàn!", "error");
    }
	});
}

function deleteRoom(home, room){
	swal({
		title: "Bạn chắc chắn muốn xóa?",
		text: "Bạn sẽ không thể hổi phục lại dữ liệu!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Đồng ý, xóa!',
		cancelButtonText: "Không, hủy yêu cầu!",
		closeOnConfirm: false,
		closeOnCancel: false
	},
	function(isConfirm){
    if (isConfirm){
      swal("Đã xóa!", "Dữ liệu của bạn đã được xóa!", "success");
      newRemoteRef = database.ref("ADMIN").child(home).child(room)
      newRemoteRef.remove();
      deviceName.innerHTML = "";
      showRoom(home)
    } else {
      swal("Hủy", "Dữ liệu của bạn được bảo toàn!", "error");
    }
	});
}

function deleteDevice(home, room, device) {
    swal({
		title: "Bạn chắc chắn muốn xóa?",
		text: "Bạn sẽ không thể hổi phục lại dữ liệu!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Đồng ý, xóa!',
		cancelButtonText: "Không, hủy yêu cầu!",
		closeOnConfirm: false,
		closeOnCancel: false
	},
	function(isConfirm){
    if (isConfirm){
      swal("Đã xóa!", "Dữ liệu của bạn đã được xóa!", "success");
      newRemoteRef = database.ref("ADMIN").child(home).child(room).child(device)
      newRemoteRef.remove();
      showDevice(home, room)
    } else {
      swal("Hủy", "Dữ liệu của bạn được bảo toàn!", "error");
    }
	});
}

function deleteDevice1(idnha, idphong, idthietbi) {
    swal({
		title: "Bạn chắc chắn muốn xóa?",
		text: "Bạn sẽ không thể hổi phục lại dữ liệu!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Đồng ý, xóa!',
		cancelButtonText: "Không, hủy yêu cầu!",
		closeOnConfirm: false,
		closeOnCancel: false
	},
	function(isConfirm){
    if (isConfirm){
      swal("Đã xóa!", "Dữ liệu của bạn đã được xóa!", "success");
      newRemoteRef = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi)
      newRemoteRef.remove();
      showDevice_user(idnha, idphong)
    } else {
      swal("Hủy", "Dữ liệu của bạn được bảo toàn!", "error");
    }
	});
}

function checknewname_home(idnha){
    idtennhamoi = "input"+idnha;
    tennhamoi = document.getElementById(idtennhamoi).value
    if(tennhamoi.length > 5){
        newPush_tennha = database.ref("ADMIN").child(idnha).child("namenha")
        newPush_tennha.set(encode_data(tennhamoi));
        swal("Tốt lắm!", "Bạn đã đổi tên nhà thành công!", "success");
        showHome()
        showRoom(idnha)
    } else {
        swal("Lưu ý!", "Tên nhà phải lớn hơn 5 ký tự!", "error");
    }

}
function checknewname_room(idnha, idphong){
    idtenphongmoi = "input"+idnha+idphong;
    tenphongmoi = document.getElementById(idtenphongmoi).value
    if(tenphongmoi.length > 5){
        newPush_tenphongmoi = database.ref("ADMIN").child(idnha).child(idphong).child("namephong")
        newPush_tenphongmoi.set(encode_data(tenphongmoi));
        swal("Tốt lắm!", "Bạn đã đổi tên phòng thành công!", "success");
        showRoom(idnha)
        showDevice(idnha, idphong)
    } else {
        swal("Lưu ý!", "Tên phòng phải lớn hơn 5 ký tự!", "error");
    }
}
function checknewname_device(idnha, idphong, idthietbi){
    idtenthietbimoi = "input"+idnha+idphong+idthietbi;
    tenthietbimoi = document.getElementById(idtenthietbimoi).value
    if(tenthietbimoi.length > 5){
    newPush_tenthietbimoi = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi).child("namethietbi")
    newPush_tenthietbimoi.set(encode_data(tenthietbimoi));
    swal("Tốt lắm!", "Bạn đã đổi tên thiết bị thành công!", "success");
    showDevice(idnha, idphong)
    } else {
        swal("Lưu ý!", "Tên thiết bị phải lớn hơn 5 ký tự!", "error");
    }
}

function export2csv() {
    let data = "";
    const tableData = [];
    const rows = document.querySelectorAll("table tr");
    for (const row of rows) {
      const rowData = [];
      for (const [index, column] of row.querySelectorAll("th, td").entries()) {
        // To retain the commas in the "Description" column, we can enclose those fields in quotation marks.
        if ((index + 1) % 3 === 0) {
          rowData.push('"' + column.innerText + '"');
        } else {
          rowData.push(column.innerText);
        }
      }
      tableData.push(rowData.join(","));
    }
    data += tableData.join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
    a.setAttribute("download", "data.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

function openHome(){
    document.getElementById('goHome').style.display = 'block' 
    document.getElementById("goHome").click();
    showHome_user()
}
function closeHome(){
    document.getElementById('goHome').style.display = 'none' 
}
home_user = document.getElementById('userHome')
header_tab_user = document.getElementById('header_table_user')
ds_user = document.getElementById('ds_user')
btn_back = document.getElementById('btn_back')    
function showHome_user() {
    home_user.innerHTML = "";
    ds_user.innerHTML = 'DANH SÁCH NHÀ';
    header_tab_user.style.display = 'none';
    btn_back.style.display = 'none';
    database.ref("ADMIN").once('value', async function(snap) {
        var ketqualangnghe = await snap.val();  
        tableReport_User.innerHTML ="";             
        for (var Home in ketqualangnghe) {
            idnamenha = ketqualangnghe[Home]
            name_nha_fb = decode_data(idnamenha.namenha)
            id_nha_fb = Home
            home_user.innerHTML +=
                          `<div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                                                class="resize" onclick="showRoom_user('${id_nha_fb}')" >
                                                <h5  class="chucnang" ><b>${name_nha_fb}</b></h5>
                                                </div>`
        }
    });
    
}
function showRoom_user(idnha) {
    btn_back.style.display = 'block';
    home_user.style.display = '';
    btn_back.addEventListener('click', function(e) {
        showHome_user()
      });
    home_user.innerHTML =""
    idhome = document.getElementById("idhome" + idnha);
    database.ref("ADMIN").child(idnha).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        home_user.innerHTML = "";
        tableReport_User.innerHTML ="";
        for (var idphong in ketqualangnghe) {
            if (idphong != "namenha") {
                for (var tennha in ketqualangnghe) {
                    if (tennha == "namenha") { name_nha_fb = decode_data(ketqualangnghe.namenha) }
                }
                phong_fb = ketqualangnghe[idphong]
                for (var Device in phong_fb) {
                    if (Device != "namephong") {
                        for (var tenphong in phong_fb) {
                            if (tenphong == "namephong") {
                                tenphong_fb = decode_data(phong_fb.namephong)
                            }
                        }
                    }
                }
                home_user.innerHTML +=`<div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                                            class="resize" onclick="showDevice_user('${idnha}','${idphong}')" >
                                            <h5  class="chucnang"><b>${tenphong_fb}</b></h5>
                                        </div>`
            }
        }
        ds_user.innerHTML = name_nha_fb + ': DANH SÁCH PHÒNG';
        ds_user.innerHTML += `&ensp;<span style="font-size:0.8em;" class="nutchucnang" id="doitennha" title="Đổi tên nhà" data-toggle="collapse" data-target="#doitennha${idnha}"><i class="fad fa-user-edit"></i></span>
        <div id="doitennha${idnha}" class="collapse">
            <input id="input${idnha}"   maxlength="20" style="width:80%" placeholder="Nhập tên nhà mới">
            <button class="btnthem" onclick="doitennha('${idnha}')"><i class="fad fa-check"></i></button>
        </div>`
        home_user.innerHTML += `<div class="gridchucnang">
                                <div onclick="addnewRoom('${idnha}','${name_nha_fb}')" class="nutchucnang">
                                <i class="fas fa-plus" title="Thêm phòng"></i></div>
                                <div onclick="opendel('${idnha}','${name_nha_fb}')" class="nutchucnang">
                                <i class="fas fa-trash" title="Xóa phòng"></i></div>
                                <div onclick="openeditRoom('${idnha}')" class="nutchucnang">
                                <i class="fas fa-pen" title="Đổi tên phòng"></i></div>
                                <div onclick="openadddevice('${idnha}')" class="nutchucnang">
                                <i class="fas fa-plug" title="Thêm thiết bị"></i></div>
                            </div>`
    });
}
tableReport_User = document.getElementById("table_user");
function showDevice_user(idnha, idphong) {
    btn_back.addEventListener('click', function(e) {
        showRoom_user(idnha)
      });
    ds_user.innerHTML = 'BẢNG DANH SÁCH THIẾT BỊ';
    header_tab_user.style.display = 'table-row';
    home_user.style.display = 'none';
    num = 0;
    idroom = document.getElementById("idroom_user" + idnha + idphong);   
    database.ref("ADMIN").child(idnha).child(idphong).on('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        tableReport_User.innerHTML ="";
        for (var idthietbi in ketqualangnghe) {
            if (idthietbi != "namephong") {
                for (var tenphong in ketqualangnghe) {
                    if (tenphong == "namephong") {
                        name_phong_fb = decode_data(ketqualangnghe.namephong)
                    }
                }
                thietbi_fb = ketqualangnghe[idthietbi]
                name_thietbi_fb = decode_data(thietbi_fb.namethietbi)
                phanloai_thietbi_fb = decode_data(thietbi_fb.phanloai)
                trangthai_thietbi_fb = decode_data(thietbi_fb.trangthai)
                num++
                if(phanloai_thietbi_fb == "Thiết bị"){
                    tableReport_User.innerHTML += `   
                        <tr style="text-align: center">
                                <td>${num}</td>
                                <td>${idnha}</td>
                                <td>${name_nha_fb}</td>
                                <td>${name_phong_fb}</td>
                                <td>${name_thietbi_fb}</td>
                                <td>${phanloai_thietbi_fb}</td>
                                <td>${trangthai_thietbi_fb}</td> 
                                <td><button class="btn-outline-dark"><i class="fas fa-power-off" onclick="toggleStatea('${idnha}', '${idphong}', '${idthietbi}','${trangthai_thietbi_fb}')" title="Bật-tắt thiết bị"></i></button>
                                                                <button class="btn-outline-dark" data-toggle="collapse" data-target="#retype_device${idnha}${idphong}${idthietbi}" title="Phân loại"><i class="fas fa-sunset"></i></button> 
                                                                <button class="btn-outline-dark"><i class="far fa-trash-alt" onclick="deleteDevice1('${idnha}', '${idphong}','${idthietbi}')" title="Xóa thiết bị"></i></button>
                                                                <button class="btn-outline-dark" ><i class="fas fa-pen" data-toggle="collapse" data-target="#rename_device${idnha}${idphong}${idthietbi}" title="Đổi tên thiết bị"></i></button>
                                                                <div id="rename_device${idnha}${idphong}${idthietbi}" class="collapse">
                                                                    <input id="input${idnha}${idphong}${idthietbi}"  style="width:80%;height:2.6em"  maxlength="20" placeholder="Nhập tên thiết bị mới"><button class="btncus" id="check${idnha}${idphong}${idthietbi}" onclick="doitenthietbi('${idnha}','${idphong}','${idthietbi}')"><i class="fad fa-check"></i></button>
                                                                </div>
                                                                <div class="collapse" id="retype_device${idnha}${idphong}${idthietbi}">
                                                                <h5 class="h5custom">  
                                                                    <label><input type="radio"  onclick="if(this.checked){checktype_device3('${idnha}','${idphong}','${idthietbi}')}"> Thiết bị</label>
                                                                    <label><input type="radio"  onclick="if(this.checked){checktype_device4('${idnha}','${idphong}','${idthietbi}')}"> Cảm biến</label></h5>
                                                                </div>
                                                                </td>
                        </tr>
                        `
                } else {
                    tableReport_User.innerHTML += `   
                    <tr style="text-align: center">
                            <td>${num}</td>
                            <td>${idnha}</td>
                            <td>${name_nha_fb}</td>
                            <td>${name_phong_fb}</td>
                            <td>${name_thietbi_fb}</td>
                            <td>${phanloai_thietbi_fb}</td>
                            <td>${trangthai_thietbi_fb}</td> 
                            <td>
                                <button class="btn-outline-dark" data-toggle="collapse" data-target="#retype_device${idnha}${idphong}${idthietbi}" title="Phân loại"><i class="fas fa-sunset"></i></button> 
                                <button class="btn-outline-dark"><i class="far fa-trash-alt" onclick="deleteDevice1('${idnha}', '${idphong}','${idthietbi}')" title="Xóa thiết bị"></i></button>
                                <button class="btn-outline-dark" ><i class="fas fa-pen" data-toggle="collapse" data-target="#rename_device${idnha}${idphong}${idthietbi}" title="Đổi tên thiết bị"></i></button>
                                <div id="rename_device${idnha}${idphong}${idthietbi}" class="collapse">
                                    <input id="input${idnha}${idphong}${idthietbi}"  style="width:80%;height:2.6em"  maxlength="20" placeholder="Nhập tên thiết bị mới"><button class="btncus" id="check${idnha}${idphong}${idthietbi}" onclick="doitenthietbi('${idnha}','${idphong}','${idthietbi}', '${name_nha_fb}')"><i class="fad fa-check"></i></button>
                                </div>
                                <div class="collapse" id="retype_device${idnha}${idphong}${idthietbi}">
                                <h5 class="h5custom">  
                                    <label><input type="radio"  onclick="if(this.checked){checktype_device3('${idnha}','${idphong}','${idthietbi}','${name_nha_fb}')}"> Thiết bị</label>
                                    <label><input type="radio"  onclick="if(this.checked){checktype_device4('${idnha}','${idphong}','${idthietbi}','${name_nha_fb}')}"> Cảm biến</label></h5>
                                </div>
                                </td>
                    </tr>
                    `
                }
            
            }
        }
    });
}    

function checktype_device1(idnha, idphong, idthietbi) {
    newPush_phanloai = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi).child("phanloai")
    newPush_phanloai.set(encode_data("Thiết bị")); 
    swal("Thành công!", "Thay đổi phân loại là thiết bị!", "success");
    showDevice(idnha, idphong)
} 
function checktype_device2(idnha, idphong, idthietbi) {
    newPush_phanloai = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi).child("phanloai")
    newPush_phanloai.set(encode_data("Cảm biến")); 
    swal("Thành công!", "Thay đổi phân loại là cảm biến!", "success");
    showDevice(idnha, idphong)  
}
function checktype_device3(idnha, idphong, idthietbi) {
    newPush_phanloai = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi).child("phanloai")
    newPush_phanloai.set(encode_data("Thiết bị")); 
    swal("Thành công!", "Thay đổi phân loại là thiết bị!", "success");
} 
function checktype_device4(idnha, idphong, idthietbi) {
    newPush_phanloai = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi).child("phanloai")
    newPush_phanloai.set(encode_data("Cảm biến")); 
    swal("Thành công!", "Thay đổi phân loại là cảm biến!", "success");
}

function doitennha(idnha){
    idnhapten = "input"+idnha;
    tenmoi = document.getElementById(idnhapten).value
    if(tenmoi.length > 5){
        newPush_nameRoom = database.ref("ADMIN").child(idnha).child("namenha")
        newPush_nameRoom.set(encode_data(tenmoi));
        swal("Thành công!", "Tên nhà đã được đổi!", "success");
        showRoom_user(idnha)
    } else {
        swal("Lưu ý!", "Tên nhà phải lớn hơn 5 ký tự!", "error");
        showRoom_user(idnha)
    }
}


function opendel(idnha, tennha){
    home_user.innerHTML = ''
    database.ref("ADMIN").child(idnha).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        for (var idphong in ketqualangnghe) {
            tennha = decode_data(ketqualangnghe.namenha)
            if (idphong != "namenha") {
                phong_fb = ketqualangnghe[idphong]
                for (var tenphong in phong_fb) {
                    if (tenphong == "namephong") {
                        tenphong_user = decode_data(phong_fb.namephong)
                        home_user.innerHTML += `<div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                                                class="resize" onclick="xoaphong('${idnha}','${idphong}','${tennha}')" >
                                                <h5  class="chucnang"><b>${tenphong_user}</b></h5>
                                                </div>`         
                    } 
                }
            }
        }
        home_user.innerHTML += `<div class="gridchucnang">
        <div onclick="addnewRoom('${idnha}','${tennha}')" class="nutchucnang">
            <i class="fas fa-plus" title="Thêm phòng"></i></div>
        <div onclick="showRoom_user('${idnha}')" class="nutchucnang">
            <i class="fas fa-trash" title="Tắt xóa phòng" style="color: black;"></i></div>
        <div onclick="openeditRoom('${idnha}')" class="nutchucnang">
            <i class="fas fa-pen" title="Sửa tên phòng"></i></div>
        <div onclick="openadddevice('${idnha}','${idphong}')" class="nutchucnang">
            <i class="fas fa-plug" title="Thêm thiết bị"></i></div>
        </div>`
    })  
} 
function xoaphong(idnha, idphong, tennha){
	swal({
		title: "Bạn chắc chắn muốn xóa?",
		text: "Bạn sẽ không thể hổi phục lại dữ liệu!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Đồng ý, xóa!',
		cancelButtonText: "Không, hủy yêu cầu!",
		closeOnConfirm: false,
		closeOnCancel: false
	},
	function(isConfirm){
    if (isConfirm){
      swal("Đã xóa!", "Dữ liệu của bạn đã được xóa!", "success");
      newRemoteRef = database.ref("ADMIN").child(idnha).child(idphong)
      newRemoteRef.remove();
      opendel(idnha, tennha)
    } else {
      swal("Hủy", "Dữ liệu của bạn được bảo toàn!", "error");
      opendel(idnha, tennha)
    }
	});
}
function doitenthietbi(idnha, idphong, idthietbi){
    idnhaptenmoi = "input"+idnha+idphong+idthietbi;
    tenmoi = document.getElementById(idnhaptenmoi).value
    if(tenmoi.length > 5){
    newPush_nameDevice = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi).child("namethietbi")
    newPush_nameDevice.set(encode_data(tenmoi));
    showDevice_user(idnha, idphong)
    swal("Thành công!", "Tên thiết bị đã được đổi!", "success");
    } else {
        swal("Lưu ý!", "Tên thiết bị phải lớn hơn 5 ký tự!", "error");
    }
}
function openadddevice(idnha) {
    database.ref("ADMIN").child(idnha).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        home_user.innerHTML = ''
        for (var idphong_user in ketqualangnghe) {
            tennha = decode_data(ketqualangnghe.namenha)
            if (idphong_user != "namenha") {
                phong_fb = ketqualangnghe[idphong_user]
                for (var tenphong in phong_fb) {
                    if (tenphong == "namephong") {
                        tenphong_user = decode_data(phong_fb.namephong)
                        home_user.innerHTML += `<div id="rchon${idnha}${idphong_user}">
                        <div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                                                class="resize" onclick="modead3('${idnha}','${idphong_user}','${tenphong_user}')" id="e${idnha}${idphong_user}">
                                                <h5  class="chucnang"><b>${tenphong_user}</b></h5>
                                            </div>
                        </div>`         
                    } 
                }
            }
        }
        home_user.innerHTML += `<div class="gridchucnang">
        <div onclick="addnewRoom('${idnha}','${tennha}')" class="nutchucnang">
            <i class="fas fa-plus" title="Thêm phòng"></i></div>
        <div onclick="opendel('${idnha}','${tennha}')" class="nutchucnang">
            <i class="fas fa-trash" title="Xóa phòng"></i></div>
        <div onclick="openeditRoom('${idnha}')" class="nutchucnang">
            <i class="fas fa-pen" title="Đổi tên phòng"></i></div>
        <div onclick="showRoom_user('${idnha}')" class="nutchucnang">
            <i class="fas fa-plug" title="Tắt thêm thiết bị" style="color: black;"></i></div>
        </div>`
    })
}
function modead3(idnha, idphong, tenphong){
    iderchon = "rchon" + idnha + idphong
    rchon = document.getElementById(iderchon)
    rchon.innerHTML =`<div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                            class="resize" id="e${idnha}${idphong}">
                            <h5  class="chucnang"><b>${tenphong}</b></h5>
                       </div>`
    ider = "e" + idnha + idphong
    ideroom = document.getElementById(ider)
    ideroom.innerHTML = `<div>
                            <h5  class="chucnang"><b>${tenphong}</b></h5>
                            <input id="thietbithem${idnha}${idphong}"  style="padding:0.3em;font-size:0.8em;position:absolute;bottom:2.25em;outline:none;width:100%; text-align:center;"
                                type="number" placeholder="Nhập số thiết bị" max ='8' min= '1' maxlength = "1"
                                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <button style="padding:0.2em;width:100%;position:absolute;bottom:0" onclick="themthietbi('${idnha}','${idphong}')">
                            <i class="fad fa-check"></i></button>
                        </div>`

}
function themthietbi(idnha, idphong){
    sothietbidaco = -1
    idthem = "thietbithem"+idnha+idphong;
    var sothietbithem = parseInt(document.getElementById(idthem).value)
    database.ref("ADMIN").child(idnha).child(idphong).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();     
        for (var idthietbi in ketqualangnghe){
            sothietbidaco++
        }
        if((sothietbithem+sothietbidaco)>8){
            swal("Cảnh báo!", "Số lượng thiết bị vượt giới hạn, bạn chỉ có thể có tối đa 8 thiết bị trong 1 phòng!")
        } else {
            for(var i = sothietbidaco; i < sothietbithem+sothietbidaco; i++){
                idthietbi = "PL" + randomString(4, "N"); 
                name_device = "Thiết bị" + " " + randomString(4, "N");
                phanloai = "Thiết bị"
                newPushDevice = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi)
                newPushDevice.set({
                    namethietbi: encode_data(name_device),
                    phanloai:  encode_data(phanloai),
                    onoff:  encode_data("onoff"),
                    trangthai:  encode_data("Đợi cập nhật từ GATEWAY")
                });
                }
            swal("Thành công!", "Đã thêm thiết bị!", "success");
            openadddevice(idnha)
        }

    })  
}

function openeditRoom(idnha){
    database.ref("ADMIN").child(idnha).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        home_user.innerHTML = ''
        for (var idphong_user in ketqualangnghe) {
            tennha = decode_data(ketqualangnghe.namenha)
            if (idphong_user != "namenha") {
                phong_fb = ketqualangnghe[idphong_user]
                for (var tenphong in phong_fb) {
                    if (tenphong == "namephong") {
                        tenphong_user = decode_data(phong_fb.namephong)
                        home_user.innerHTML += `<div id="rchon${idnha}${idphong_user}">
                        <div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                                                class="resize" onclick="modeEdit('${idnha}','${idphong_user}','${tenphong_user}')" id="e${idnha}${idphong_user}">
                                                <h5  class="chucnang"><b>${tenphong_user}</b></h5>
                                            </div>
                        </div>`         
                    } 
                }
            }
        }
        home_user.innerHTML += `<div class="gridchucnang">
        <div onclick="addnewRoom('${idnha}','${tennha}')" class="nutchucnang">
            <i class="fas fa-plus" title="Thêm phòng"></i></div>
        <div onclick="opendel('${idnha}','${tennha}')" class="nutchucnang">
            <i class="fas fa-trash" title="Xóa phòng"></i></div>
        <div onclick="showRoom_user('${idnha}')" class="nutchucnang">
            <i class="fas fa-pen" title="Tắt sửa tên phòng"  style="color: black;"></i></div>
        <div onclick="openadddevice('${idnha}','${idphong_user}')" class="nutchucnang">
            <i class="fas fa-plug" title="Thêm thiết bị"></i></div>
        </div>`
    })
}
function modeEdit(idnha, idphong, tenphong){
    iderchon = "rchon" + idnha + idphong
    rchon = document.getElementById(iderchon)

    rchon.innerHTML =`<div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                            class="resize" id="e${idnha}${idphong}">
                            <h5  class="chucnang"><b>${tenphong}</b></h5>
                       </div>`
    ider = "e" + idnha + idphong
    ideroom = document.getElementById(ider)
    ideroom.innerHTML = `<div>
                            <h5  class="chucnang"><b>${tenphong}</b></h5>
                            <input id="input${idnha}${idphong}"  style="padding:0.4em;font-size:0.8em;position:absolute;bottom:1.8em;outline:none"
                                type="nameHome" maxlength="20" placeholder="Nhập tên phòng mới">
                            <button style="padding:0.2em;width:100%;position:absolute;bottom:0" onclick="luutenphong('${idnha}','${idphong}')">
                            <i class="fad fa-check"></i></button>
                        </div>`
  }

  function luutenphong(idnha, idphong){
    idnhapten = "input"+idnha+idphong;
    tenmoi = document.getElementById(idnhapten).value
    if(tenmoi.length > 5){
        newPush_nameRoom = database.ref("ADMIN").child(idnha).child(idphong).child("namephong")
        newPush_nameRoom.set(encode_data(tenmoi));
        swal("Thành công!", "Tên phòng đã được đổi!", "success");
        openeditRoom(idnha)
    } else {
        swal("Lưu ý!", "Tên phòng phải lớn hơn 5 ký tự!", "error");
        openeditRoom(idnha)
    }
}
function oke_firebase(idnha,idphong) {
    tenphong = document.getElementById("nameRoom").value;
    tennha = document.getElementById("name_home").value;
    if(tennha.length>5 && tenphong.length>5){
        swal("Tốt lắm!", "Bạn đã lưu thông tin phòng!", "success");
        document.getElementById('name_home').disabled = true;
        tenphong = document.getElementById("nameRoom").value;
        tennha = document.getElementById("name_home").value;
        document.getElementById("nameRoom").value = "";
        for (let i = 2; i < mang_chua_cac_obj.length; i++) {
            idtenthietbi = mang_chua_cac_obj[i].id_name_device
            idthietbi = mang_chua_cac_obj[i].id_device
            idphanloai = mang_chua_cac_obj[i].id_phanloai
            tenthietbi = document.getElementById(idtenthietbi).value;
            phanloai = document.getElementById(idphanloai).value;
            newPushDevice = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi)
            newPushDevice.set({
                namethietbi: encode_data(tenthietbi),
                phanloai:  encode_data(phanloai),
                onoff:  encode_data("onoff"),
                trangthai:  encode_data("Đợi cập nhật từ GATEWAY")
            });
            newPushHome = database.ref("ADMIN").child(idnha).child("namenha")
            newPushHome.set( encode_data(tennha));
            newPushRoom = database.ref("ADMIN").child(idnha).child(idphong).child("namephong")
            newPushRoom.set( encode_data(tenphong));
            showRoom_user(idnha)
        }
        document.getElementById('themroom').innerHTML = "";
        document.getElementById("idnewphong").innerHTML = "";
    } else {
        swal("Lưu ý", "Tên nhà và tên phòng phải lớn hơn 5 ký tự!", "error");
    } 
    taomatkhau()
}

function dangxuatadmin(){
    swal({
		title: "Xác nhận đăng xuất",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Đồng ý',
		cancelButtonText: "Không, hủy yêu cầu!",
		closeOnConfirm: true,
		closeOnCancel: true
	},
	function(isConfirm){
    if (isConfirm){
        window.location.href = './login.html';
    } else {}
	});
}