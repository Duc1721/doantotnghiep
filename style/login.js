function login(){
    var in_id = document.getElementById("id_dangnhap").value;
    var in_mk = document.getElementById("mk_dangnhap").value;
    newPush_account_dn_id= database.ref("REQUEST_LOGIN").child("USER").child(in_id)
    newPush_account_dn_id.set(in_mk);
    var checkbox = document.getElementsByName("luachon");
        for (var i = 0; i < checkbox.length; i++){
            if (checkbox[i].checked === true){
                if(checkbox[i].value === "KH"){           
                    database.ref("REQUEST_LOGIN").child(in_id).on('value', async function(snap) {
                        var ketqualangnghe = await snap.val();
                        console.log(ketqualangnghe)
                        if(ketqualangnghe=='OK' && in_id != "" && in_mk != ""){
                            document.getElementById("wait_dangnhap").innerHTML =""
                            window.location.href = './users.html';
                        } else if (ketqualangnghe== 'FAIL'){
                            swal("Thất bại","Tài khoản hoặc mật khẩu không chính xác","error") 
                        } else {   
                            document.getElementById("wait_dangnhap").innerHTML = `<h6 class="spinner-grow spinner-grow-sm text-warning"></h6>
                                                                                <h6 class="spinner-grow spinner-grow-sm text-primary"></h6>
                                                                                <h6 class="spinner-grow spinner-grow-sm text-success"></h6>
                                                                                <h6 class="spinner-grow spinner-grow-sm text-danger"></h6>`
                                                                                    
                            setTimeout(function(){ 
                            document.getElementById("wait_dangnhap").innerHTML = ``
                            swal("Thất bại","Hết hạn phản hồi từ máy chủ","error") 
                        }, 3000)}
                    });
                } else if(checkbox[i].value === "QL"){
                    if(in_id === "admin" && in_mk === "admin"){
                        window.location.href = './index.html';
                       
                    } else  swal("Thất bại","Tài khoản hoặc mật khẩu không chính xác","error") 
                } else{}
            }
        }
    
}
tt_icon = 1
tt_ht = 1
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
    document.getElementById('themtk').disabled = false;
   
  
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



function logindsad()
{
    vid_dangnhap = document.getElementById('id_dangnhap').value
    vmk_dangnhap = document.getElementById('mk_dangnhap').value
    var req = new XMLHttpRequest();
    req.open("POST", "http://127.0.0.1:5500/index.html", true);
    req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    req.send(JSON.stringify({
            "id": vid_dangnhap,
            "pass": vmk_dangnhap
      }));
      req.onreadystatechange = function () {
        if (this.readyState == 4) {
            swal("thành công","","success")
            window.location.href = './index.html';
              
          } else {
            swal("thất bại","","error")
          }
      };
      return false;
}
