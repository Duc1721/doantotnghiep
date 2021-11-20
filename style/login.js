
function login(){
    var in_id = document.getElementById("id_dangnhap").value;
    var in_mk = document.getElementById("mk_dangnhap").value;
    var chon_checkbox = document.getElementsByName("luachon");
        for (var i = 0; i < chon_checkbox.length; i++){
            if (chon_checkbox[i].checked === true){
                if(chon_checkbox[i].value === "KH"){           
                    database.ref("PASS").child(in_id).once('value', async function(snap) {
                        var ketqualangnghe = await snap.val();
                        if(ketqualangnghe == in_mk){
                            localStorage.setItem("in_id", in_id);
                            window.location.href = './users.html';
                        } else {
                            swal("Thất bại","Tài khoản hoặc mật khẩu không chính xác","error") 
                        }    
                    });
                
                } else if(chon_checkbox[i].value === "QL"){
                    if(in_id === "admin" && in_mk === "admin"){
                        window.location.href = './index.html';
                       
                    } else  swal("Thất bại","Tài khoản hoặc mật khẩu không chính xác","error") 
                } 
            }
        }
    
}
tt_icon = 1
tt_ht = 1
document.getElementById('iconshow').click()
function showpass(){
      mk_dangnhap = document.getElementById('mk_dangnhap')
      iconshow = document.getElementById('iconshow')
      if(tt_icon*tt_ht==1){
        iconshow.onclick = (()=>{
            mk_dangnhap.type = "text";
            iconshow.classList.add("hide-btn");
            tt_ht = 0
        })
     } else if(tt_icon*tt_ht==0){
        iconshow.onclick = (()=>{
            mk_dangnhap.type = "password";
            iconshow.classList.remove("hide-btn");
            tt_ht = 1
        })
    }
       
}

function change_passOpen(){
    document.getElementById('formRegister').style.display = 'block'
    document.getElementById('formLogin').style.display = 'none' 
}

function change_passClose(){
   // document.getElementById('titleDoipass_thanhcong').innerText = ""
    document.getElementById('formRegister').style.display = 'none'
    document.getElementById('formLogin').style.display = 'block' 
    //document.getElementById('themtk').disabled = false;
   
  
}

function doimatkhau(){
    taikhoan = document.getElementById("iddoi").value; 
    matkhau = document.getElementById("matkhau").value;  
    matkhaudoi = document.getElementById("matkhaudoi").value;
    nhaplaimatkhau = document.getElementById("nhaplaimatkhaudoi").value;
    if (matkhaudoi!=nhaplaimatkhau ||  matkhaudoi.length<5 ){
        swal("Thất bại","Mật khẩu mới nhập lại không trùng khớp hoặc bé hơn 5 ký tự","error") 
        matkhaudoi.innerHTML =''
        nhaplaimatkhau.innerHTML =''
    } else{
        database.ref("PASS").child(taikhoan).get().then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                mk = snapshot.val();
                if (mk == matkhau){
                    swal("Thành công","Tài khoản đã được đổi mật khẩu","success")
                    matkhaumoi = database.ref("PASS").child(taikhoan)
                    matkhaumoi.set(nhaplaimatkhau);
                    matkhaudoi.innerHTML =''
                    nhaplaimatkhau.innerHTML =''
                } else swal("Thất bại","Mật khẩu không chính xác","error") 
            } else swal("Thất bại","Tài khoản không tồn tại","error") 
        }).catch((error) => {
            console.error(error);
        });
    }

}
    

