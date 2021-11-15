table_device = document.getElementById("tablestate1");
document.getElementById('headerbang').style.display = 'none'
document.getElementById('tablestate1').style.display = 'none' 
iduser =  localStorage.getItem("in_id")
trove = document.getElementById('btnthoat')
roomuser = document.getElementById('roomuser')
function thoatnha(){
    document.getElementById('headerbang').style.display = 'none' 
    document.getElementById('tablestate1').style.display = 'none'
    document.getElementById('roomuser').style.display = 'none' 
    document.getElementById('trangchu').style.display = '' 
    window.scrollTo(0, 0);

}

room = document.getElementById("phong");
function vaonha(){
    room.innerHTML = ''
    window.scrollTo(0, 0);
    trove.addEventListener('click', function(e) {
        thoatnha()
      });
    document.getElementById('headerbang').style.display = 'none' 
    document.getElementById('tablestate1').style.display = 'none'
    document.getElementById('trangchu').style.display = 'none' 
    document.getElementById('roomuser').style.display = 'block' 
    document.getElementById('phong').style.display = ''
    database.ref("ADMIN").child(iduser).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        for (var idphong_user in ketqualangnghe) {
            tennha = decode_data(ketqualangnghe.namenha)
            if (idphong_user != "namenha") {
                phong_fb = ketqualangnghe[idphong_user]
                for (var tenphong in phong_fb) {
                    if (tenphong == "namephong") {
                        tenphong_user = decode_data(phong_fb.namephong)
                        room.innerHTML += `<div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                                                class="resize" onclick="vaophong('${iduser}','${tennha}','${idphong_user}')" >
                                                <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong_user}</b></h5>
                                            </div>`         
            } 
        }
    }
    }
    document.getElementById("getten").innerText = tennha + ": DANH SÁCH PHÒNG "
    document.getElementById("getten").innerHTML += `&ensp;<span style="font-size:1.7rem;" class="nutchucnang" id="doitennha" title="Đổi tên nhà" data-toggle="collapse" data-target="#doitennha${iduser}"><i class="fas fa-pen"></i></span>
                                                    <div id="doitennha${iduser}" class="collapse">
                                                        <input id="input${iduser}"   maxlength="20" style="width:80%;" placeholder="Nhập tên nhà mới">
                                                        <button onclick="luutennha('${iduser}')"><i class="fad fa-check"></i></button>
                                                    </div>`
    
    room.innerHTML += `<div class="gridchucnang">
                            <div onclick="addnewRoom('${iduser}','${tennha}')" class="nutchucnang">
                                <i class="fas fa-plus" title="Thêm phòng"></i></div>
                            <div onclick="opendelRoom('${iduser}','${tennha}')" class="nutchucnang">
                                 <i class="fas fa-trash" title="Xóa phòng"></i></div>
                            <div onclick="openeditRoom('${iduser}','${tennha}')" class="nutchucnang">
                                 <i class="fas fa-pen" title="Đổi tên phòng"></i></div>
                            <div onclick="openadddevice('${iduser}','${idphong_user}')" class="nutchucnang">
                                 <i class="fas fa-plug" title="Thêm thiết bị"></i></div>
                       </div>`
           
})
}
function vaophong(idnha, tennha, idphong){
    trove.addEventListener('click', function(e) {
        vaonha()
      });
    stt=0
    window.scrollTo(0, 0);
    table_device.innerHTML ="";
    document.getElementById('phong').style.display = 'none'
    document.getElementById('headerbang').style.display = '' 
    document.getElementById('tablestate1').style.display = ''
    database.ref("ADMIN").child(idnha).child(idphong).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        for (var idthietbi in ketqualangnghe) {
            if (idthietbi != "namephong") {
                for (var tenphong in ketqualangnghe) {
                    if (tenphong == "namephong") {
                        name_phong_fb = decode_data(ketqualangnghe.namephong)
                        thietbi_fb = ketqualangnghe[idthietbi]
                            }
                        }
                        name_thietbi_fb = decode_data(thietbi_fb.namethietbi)
                        phanloai_thietbi_fb = decode_data(thietbi_fb.phanloai)
                        trangthai_thietbi_fb = decode_data(thietbi_fb.trangthai)
                        stt++
                        table_device.innerHTML +=  `<tr style="text-align: center">
                                                        <td>${stt}</td>
                                                        <td>${idnha}</td>
                                                        <td>${tennha}</td>
                                                        <td>${name_phong_fb}</td>
                                                        <td>${name_thietbi_fb}</td>
                                                        <td>${phanloai_thietbi_fb}</td>
                                                        <td>${trangthai_thietbi_fb}</td>
                                                        <td><button class="btn-outline-dark"><i class="fas fa-power-off"></i></button>
                                                        <button class="btn-outline-dark"><i class="far fa-trash-alt" onclick="xoathietbi('${idnha}', '${tennha}', '${idphong}','${idthietbi}')"></i></button></td>
                                                    </tr>`
                       
                        
                    }
        }
        document.getElementById("getten").innerText = "BẢNG DANH SÁCH THIẾT BỊ"
    });
}

function closeAddnewHomeuser() {
    document.getElementById('addHome').style.display = 'none'
}
function opendelRoom(){
    room.innerHTML = ''
    database.ref("ADMIN").child(iduser).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        for (var idphong_user in ketqualangnghe) {
            tennha = decode_data(ketqualangnghe.namenha)
            if (idphong_user != "namenha") {
                phong_fb = ketqualangnghe[idphong_user]
                for (var tenphong in phong_fb) {
                    if (tenphong == "namephong") {
                        tenphong_user = decode_data(phong_fb.namephong)
                        room.innerHTML += `<div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                                                class="resize" onclick="deleteRoomU('${iduser}','${idphong_user}')" >
                                                <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong_user}</b></h5>
                                                </div>`         
                    } 
                }
            }
        }
        room.innerHTML += `<div class="gridchucnang">
        <div onclick="addnewRoom('${iduser}','${tennha}')" class="nutchucnang">
            <i class="fas fa-plus" title="Thêm phòng"></i></div>
        <div onclick="vaonha()" class="nutchucnang">
            <i class="fas fa-trash" title="Tắt xóa phòng" style="color: black;"></i></div>
        <div onclick="openeditRoom('${iduser}','${tennha}')" class="nutchucnang">
            <i class="fas fa-pen" title="Sửa tên phòng"></i></div>
        <div onclick="openadddevice('${iduser}','${idphong_user}')" class="nutchucnang">
            <i class="fas fa-plug" title="Thêm thiết bị"></i></div>
        </div>`
    })  
} 
function deleteRoomU(home, room){
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
      opendelRoom()
    } else {
      swal("Hủy", "Dữ liệu của bạn được bảo toàn!", "error");
      opendelRoom()
    }
	});
}
function openeditRoom(){
    room.innerHTML = ''
    database.ref("ADMIN").child(iduser).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        for (var idphong_user in ketqualangnghe) {
            tennha = decode_data(ketqualangnghe.namenha)
            if (idphong_user != "namenha") {
                phong_fb = ketqualangnghe[idphong_user]
                for (var tenphong in phong_fb) {
                    if (tenphong == "namephong") {
                        tenphong_user = decode_data(phong_fb.namephong)
                        room.innerHTML += `<div id="rchon${iduser}${idphong_user}">
                        <div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                                                class="resize" onclick="modeEdit('${iduser}','${idphong_user}','${tenphong_user}')" id="e${iduser}${idphong_user}">
                                                <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong_user}</b></h5>
                                            </div>
                        </div>`         
                    } 
                }
            }
        }
        room.innerHTML += `<div class="gridchucnang">
        <div onclick="addnewRoom('${iduser}','${tennha}')" class="nutchucnang">
            <i class="fas fa-plus" title="Thêm phòng"></i></div>
        <div onclick="opendelRoom()" class="nutchucnang">
            <i class="fas fa-trash" title="Xóa phòng"></i></div>
        <div onclick="vaonha()" class="nutchucnang">
            <i class="fas fa-pen" title="Tắt sửa tên phòng"  style="color: black;"></i></div>
        <div onclick="openadddevice('${iduser}','${idphong_user}')" class="nutchucnang">
            <i class="fas fa-plug" title="Thêm thiết bị"></i></div>
        </div>`
    })
}
function modeEdit(idnha, idphong, tenphong){
    iderchon = "rchon" + idnha + idphong
    rchon = document.getElementById(iderchon)

    rchon.innerHTML =`<div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                            class="resize" id="e${idnha}${idphong}">
                            <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong}</b></h5>
                       </div>`
    ider = "e" + idnha + idphong
    ideroom = document.getElementById(ider)
    ideroom.innerHTML = `<div>
                            <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong}</b></h5>
                            <input id="input${idnha}${idphong}"  style="padding:0.5rem;font-size:1.25rem;position:absolute;bottom:2.4rem;outline:none"
                                type="nameHome" maxlength="20" placeholder="Nhập tên phòng mới">
                            <button style="padding:0.3rem;width:100%;position:absolute;bottom:0" onclick="luutenphong('${idnha}','${idphong}')">
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
        openeditRoom()
    } else {
        swal("Lưu ý!", "Tên phòng phải lớn hơn 5 ký tự!", "error");
        openeditRoom()
    }
}
function luutennha(idnha){
    idnhapten = "input"+idnha;
    tenmoi = document.getElementById(idnhapten).value
    if(tenmoi.length > 5){
        newPush_nameRoom = database.ref("ADMIN").child(idnha).child("namenha")
        newPush_nameRoom.set(encode_data(tenmoi));
        swal("Thành công!", "Tên nhà đã được đổi!", "success");
        vaonha()
    } else {
        swal("Lưu ý!", "Tên nhà phải lớn hơn 5 ký tự!", "error");
        vaonha()
    }
}

function openadddevice() {
    room.innerHTML = ''
    database.ref("ADMIN").child(iduser).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        for (var idphong_user in ketqualangnghe) {
            tennha = decode_data(ketqualangnghe.namenha)
            if (idphong_user != "namenha") {
                phong_fb = ketqualangnghe[idphong_user]
                for (var tenphong in phong_fb) {
                    if (tenphong == "namephong") {
                        tenphong_user = decode_data(phong_fb.namephong)
                        room.innerHTML += `<div id="rchon${iduser}${idphong_user}">
                        <div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                                                class="resize" onclick="modead3('${iduser}','${idphong_user}','${tenphong_user}')" id="e${iduser}${idphong_user}">
                                                <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong_user}</b></h5>
                                            </div>
                        </div>`         
                    } 
                }
            }
        }
        room.innerHTML += `<div class="gridchucnang">
        <div onclick="addnewRoom('${iduser}','${tennha}')" class="nutchucnang">
            <i class="fas fa-plus" title="Thêm phòng"></i></div>
        <div onclick="opendelRoom()" class="nutchucnang">
            <i class="fas fa-trash" title="Xóa phòng"></i></div>
        <div onclick="openeditRoom()" class="nutchucnang">
            <i class="fas fa-pen" title="Đổi tên phòng"></i></div>
        <div onclick="vaonha()" class="nutchucnang">
            <i class="fas fa-plug" title="Tắt hêm thiết bị" style="color: black;"></i></div>
        </div>`
    })
}

function modead3(idnha, idphong, tenphong){
    iderchon = "rchon" + idnha + idphong
    rchon = document.getElementById(iderchon)

    rchon.innerHTML =`<div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                            class="resize" id="e${idnha}${idphong}">
                            <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong}</b></h5>
                       </div>`
    ider = "e" + idnha + idphong
    ideroom = document.getElementById(ider)
    ideroom.innerHTML = `<div>
                            <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong}</b></h5>
                            <input id="thietbithem${idnha}${idphong}"  style="padding:0.4rem;font-size:1.5rem;position:absolute;bottom:2.9rem;outline:none;width:100%; text-align:center;"
                                type="number" placeholder="Nhập số thiết bị" max ='8' min= '1' maxlength = "1"
                                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <button style="padding:0.3rem;width:100%;position:absolute;bottom:0" onclick="themthietbi('${idnha}','${idphong}')">
                            <i class="fad fa-check"></i></button>
                        </div>`

}
function themthietbi(idnha, idphong){
    sothietbidaco = -1
    idthem = "thietbithem"+idnha+idphong
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
            openadddevice()
        }

    })  
}
function xoathietbi(idnha, tennha, idphong, idthietbi) {
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
      swal("Thành công!", "Dữ liệu đã được xóa!", "success");
      newRemoteRef = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi)
      newRemoteRef.remove();
      vaophong(idnha, tennha, idphong)
    } else {
      swal("Hủy", "Dữ liệu được bảo toàn!", "error");
    }
	});
}