var btnLogin = document.getElementById('loginAdminUser');
function loginOpen(){
    document.getElementById('formLogin').style.display = 'block'
    change_passClose()
}
function loginClose(){
    document.getElementById("id_dangnhap").value = ""
    document.getElementById("mk_dangnhap").value = ""
    document.getElementById("wait_dangnhap").innerHTML =""
    document.getElementById('formLogin').style.display = 'none'
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
    document.getElementById('titleDangky_thanhcong').innerText = ""
    document.getElementById('formRegister').style.display = 'none'
    document.getElementById('themtk').disabled = false;
    loginOpen()
   
  
}

function change_passAdd(){ 
        var in_mk = document.getElementById("mk_dk").value;
        var rein_mk = document.getElementById("remk_dk").value;
        if (in_mk == rein_mk && in_mk != ""){
        document.getElementById('themtk').disabled = true;
        document.getElementById("titleDangky_thanhcong").innerHTML = 
            `<h6 style="display:inline-block;color:#FFC312; text-shadow: while 1px 0.5px;"> Thành công!</h6>`;

        var id_account =  document.getElementById("id_dk").value;
        newPush_account_id= database.ref("ACCOUNT").child("USER").child(id_account)
        newPush_account_id.set(in_mk);
        } else {
            document.getElementById("titleDangky_thanhcong").innerHTML = 
            `<h6 style="display:inline-block;color:#FFC312; text-shadow: while 1px 0.5px;"> Thất bại! </h6>`;
        }

        
}

function openHome(){
    document.getElementById('goHome').style.display = 'block' 
}
function closeHome(){
    document.getElementById('goHome').style.display = 'none' 
    console.log("hello")
}
