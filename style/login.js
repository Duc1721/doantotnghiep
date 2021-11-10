var btnLogin = document.getElementById('loginAdminUser');
function loginOpen(){
    document.getElementById('formLogin').style.display = 'block'
    change_passClose()
}
function loginClose(){
    document.getElementById("id_dangnhap").value = ""
    document.getElementById("mk_dangnhap").value = ""
    document.getElementById("wait_dangnhap").innerHTML =""
    document.getElementById('formLogin').style.display = 'block'
}
function loginYourhome(){
    var in_id = document.getElementById("id_dangnhap").value;
    var in_mk = document.getElementById("mk_dangnhap").value;
    newPush_account_dn_id= database.ref("REQUEST_LOGIN").child("USER").child(in_id)
    newPush_account_dn_id.set(in_mk);
    database.ref("REQUEST_LOGIN").child("USER").child(in_id).on('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        console.log(ketqualangnghe)
         if(ketqualangnghe=='OK' && in_id != "" && in_mk != ""){
             loginClose()
             document.getElementById("wait_dangnhap").innerHTML =""
             swal("Đăng nhập thành công","","success") 
         } else if (ketqualangnghe== 'FAIL'){
            swal("Thất bại","Tài khoản hoặc mật khẩu không chính xác","error") 
         } else {
            document.getElementById("wait_dangnhap").innerHTML = `<h6 class="spinner-grow spinner-grow-sm text-warning"></h6>
                                                                  <h6 class="spinner-grow spinner-grow-sm text-primary"></h6>
                                                                  <h6 class="spinner-grow spinner-grow-sm text-success"></h6>
                                                                  <h6 class="spinner-grow spinner-grow-sm text-danger"></h6>`
        }
    });
}

function change_passOpen(){
    document.getElementById('formRegister').style.display = 'block' 
    loginClose()
}

function change_passClose(){
   // document.getElementById('titleDoipass_thanhcong').innerText = ""
    document.getElementById('formRegister').style.display = 'none'
    document.getElementById('themtk').disabled = false;
    loginOpen()
   
  
}

function change_passAdd(){ 
        var in_mk = document.getElementById("mk_dk").value;
        var rein_mk = document.getElementById("remk_dk").value;
        if (in_mk == rein_mk && in_mk != ""){
        document.getElementById('themtk').disabled = true;
        document.getElementById("titleDoipass_thanhcong").innerHTML = 
            `<h6 style="display:inline-block;color:#FFC312; text-shadow: while 1px 0.5px;"> Thành công!</h6>`;

        var id_account =  document.getElementById("id_dk").value;
        newPush_account_id= database.ref("ACCOUNT").child("USER").child(id_account)
        newPush_account_id.set(in_mk);
        } else {
            document.getElementById("titleDoipass_thanhcong").innerHTML = 
            `<h6 style="display:inline-block;color:#FFC312; text-shadow: while 1px 0.5px;"> Thất bại! </h6>`;
        }

        
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
    home_user.style.display = 'grid';
    home_user.innerHTML = "";
    tableReport_User.innerHTML ="";
    ds_user.innerHTML = 'DANH SÁCH NHÀ';
    header_tab_user.style.display = 'none';
    btn_back.style.display = 'none';
    // console.log(home_user)
    database.ref("ADMIN").once('value', async function(snap) {
        var ketqualangnghe = await snap.val();               
        for (var Home in ketqualangnghe) {

            idnamenha = ketqualangnghe[Home]
            name_nha_fb = decode_data(idnamenha.namenha)
            id_nha_fb = Home
            home_user.innerHTML += `
                                <div class= "card">
                                    <div class="card-header btn"><b>
                                        <i class="fas fa-building"></i> ${name_nha_fb}</div></b>
                                    <div class="containeru">
                                        <img src="avt.jpg" class="imageu">
                                        <div class="overlayu" onclick="showRoom_user('${id_nha_fb}')">
                                          <h3 style="text-align:center" class="btnadd">Thông tin chủ nhà</h3>
                                          <div class="textu">Họ và tên: Trống</div>
                                          <div class="textu">Giới tính: Nam/Nữ</div>
                                          <div class="textu">Ngày sinh: Ngày/Tháng/Năm</div>
                                          <div class="textu">Địa chỉ: Thôn, xã, huyện, tỉnh, quốc gia</div>
                                          <div class="textu">Số CMND: XXXXXXXXX</div>
                                          <div class="textu">Số điện thoại: +84XXXXXXXX</div>
                                        </div>
                                      </div>
                                </div>
                          `
         
        }
    });
}

function showRoom_user(Hoom_user) {
    btn_back.style.display = 'block';
    btn_back.addEventListener('click', function(e) {
        showHome_user()
      });
    home_user.innerHTML =""
    tableReport_User.innerHTML ="";
    ds_user.innerHTML = 'DANH SÁCH PHÒNG';
    idhome = document.getElementById("idhome" + Hoom_user);
    database.ref("ADMIN").child(Hoom_user).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        romeName.innerHTML = "";
        for (var Room in ketqualangnghe) {
            if (Room != "namenha") {
                for (var tennha in ketqualangnghe) {
                    if (tennha == "namenha") { name_nha_fb = decode_data(ketqualangnghe.namenha) }
                }
                phong_fb = ketqualangnghe[Room]
                for (var Device in phong_fb) {
                    if (Device != "namephong") {
                        for (var tenphong in phong_fb) {
                            if (tenphong == "namephong") {
                                name_phong_fb = decode_data(phong_fb.namephong)
                            }
                        }
                    }
                }
                home_user.innerHTML += `
                <div class="card">
                        <h5 class="card-header btn" style="text-align: left"><b><i class="fas fa-building"></i> ${name_nha_fb} - <i class="fas fa-home"></i> ${name_phong_fb}</b></h5>
                        <div class="card-header btn"><b>
                                    <div class="containeru" onclick="showDevice_user('${Hoom_user}','${Room}')">
                                        <img src="avt.jpg" class="imageu">
                                     </div>
                </div> 
            `     
            }
        }
    });
}
tableReport_User = document.getElementById("table_user");
function showDevice_user(Dhome, Droom) {
    btn_back.addEventListener('click', function(e) {
        showRoom_user(Dhome)
      });
    ds_user.innerHTML = 'BẢNG DANH SÁCH THIẾT BỊ';
    header_tab_user.style.display = 'table-row';
    home_user.style.display = 'none';
    tableReport_User.innerHTML ="";
    num = 0;
    idroom = document.getElementById("idroom_user" + Dhome + Droom);   
    database.ref("ADMIN").child(Dhome).child(Droom).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        for (var Device in ketqualangnghe) {
            if (Device != "namephong") {
                for (var tenphong in ketqualangnghe) {
                    if (tenphong == "namephong") {
                        name_phong_fb = decode_data(ketqualangnghe.namephong)
                    }
                }
                thietbi_fb = ketqualangnghe[Device]
                name_thietbi_fb = decode_data(thietbi_fb.namethietbi)
                phanloai_thietbi_fb = decode_data(thietbi_fb.phanloai)
                trangthai_thietbi_fb = decode_data(thietbi_fb.trangthai)
                num++
                tableReport_User.innerHTML += `   
                    <tr style="text-align: center">
                            <td>${num}</td>
                            <td>${Dhome}</td>
                            <td>${name_nha_fb}</td>
                            <td>${name_phong_fb}</td>
                            <td>${name_thietbi_fb}</td>
                            <td>${phanloai_thietbi_fb}</td>
                            <td>${trangthai_thietbi_fb}</td>
                            
                    </tr>
                    `
            
            }
        }
    });
}        

