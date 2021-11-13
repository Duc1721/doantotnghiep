table_device = document.getElementById("tablestate");
document.getElementById('headerbang').style.display = 'none'
document.getElementById('tablestate').style.display = 'none' 
iduser =  localStorage.getItem("in_id")
trove = document.getElementById('btnthoat')

function thoatnha(){
    document.getElementById('headerbang').style.display = 'none' 
    document.getElementById('tablestate').style.display = 'none'
    document.getElementById('roomuser').style.display = 'none' 
    document.getElementById('trangchu').style.display = '' 
    window.scrollTo(0, 0);

}

room = document.getElementById("phong");
function vaonha(){
    window.scrollTo(0, 0);
    trove.addEventListener('click', function(e) {
        thoatnha()
      });
    document.getElementById('headerbang').style.display = 'none' 
    document.getElementById('tablestate').style.display = 'none'
    document.getElementById('trangchu').style.display = 'none' 
    document.getElementById('roomuser').style.display = 'block' 
    room.innerHTML = ''
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
                        document.getElementById("getten").innerText = tennha + ": DANH SÁCH PHÒNG"
                        room.innerHTML += `<div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                                                class="resize" onclick="vaophong('${iduser}','${tennha}','${idphong_user}')" >
                                                <h5  class="chucnang" style="font-size: 17px;" ><b>${tenphong_user}</b></h5>
                        </div>
                        ` 
                        
            } 
        }
    }
    }
    room.innerHTML += `<div onclick="addnewRoom('${iduser}','${tennha}')" style="filter: brightness(0.8)"><img  class="resize" src="them.png" style="filter: hue-rotate(286deg);"></div>`
})
}
function vaophong(idhu, tennha, idru){
    trove.addEventListener('click', function(e) {
        vaonha()
      });
    num=0
    window.scrollTo(0, 0);
    table_device.innerHTML ="";
    document.getElementById('phong').style.display = 'none'
    document.getElementById('headerbang').style.display = '' 
    document.getElementById('tablestate').style.display = ''
    database.ref("ADMIN").child(idhu).child(idru).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        for (var Device in ketqualangnghe) {
            if (Device != "namephong") {
                for (var tenphong in ketqualangnghe) {
                    if (tenphong == "namephong") {
                        name_phong_fb = decode_data(ketqualangnghe.namephong)
                        thietbi_fb = ketqualangnghe[Device]
                            }
                        }
                        name_thietbi_fb = decode_data(thietbi_fb.namethietbi)
                        phanloai_thietbi_fb = decode_data(thietbi_fb.phanloai)
                        trangthai_thietbi_fb = decode_data(thietbi_fb.trangthai)
                        num++
                        table_device.innerHTML +=  `<tr style="text-align: center">
                                                        <td>${num}</td>
                                                        <td>${idhu}</td>
                                                        <td>${tennha}</td>
                                                        <td>${name_phong_fb}</td>
                                                        <td>${name_thietbi_fb}</td>
                                                        <td>${phanloai_thietbi_fb}</td>
                                                        <td>${trangthai_thietbi_fb}</td>
                                                    </tr>`
                       
                        
                    }
        }
        document.getElementById("getten").innerText = "BẢNG DANH SÁCH THIẾT BỊ"
    });
}