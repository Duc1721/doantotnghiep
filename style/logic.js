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
    } else {
    }
    newPushRef = database.ref("ALL").child(home).child(room).child(device)
    newPushRef.set(stageToggle);

}


/////////////////// clear Device
function deleteDevice(home, room, device) {
    var result = confirm("Are you sure you want to delete this device configuration?");
    if (result == true) {
        newRemoteRef = database.ref("ALL").child(home).child(room).child(device)
        newRemoteRef.remove();
    }
}
function deleteRoom(home, room) {
    var result = confirm("Are you sure you want to delete this room configuration?");
    if (result == true) {
        newRemoteRef = database.ref("ALL").child(home).child(room)
        newRemoteRef.remove();
    }
}
//////table update
tableReportAll = document.getElementById("tablestate");
tableHomeAll = document.getElementById("homeName");
database.ref("ALL").on('value', async function (snap) {
    var ketqualangnghe = await snap.val();
    tableReportAll.innerHTML = ''
    num = 0;
    for (var Home in ketqualangnghe) {
        nhathemS = ketqualangnghe[Home]
      
        for (var Room in nhathemS) {
            phongthemS = nhathemS[Room]
            for (var Device in phongthemS) {
                num++;
                State = phongthemS[Device]
                tableReportAll.innerHTML += `
                <tr>
                    <td>${num}</td>
                    <td>${Home}</td>
                    <td>${Room}</td>
                    <td>${Device}</td>
                    <td>${State}</td>
                    <td><button class="btn-outline-dark" onclick = "toggleStatea( '${Home}', '${Room}','${Device}', '${State}' )"><i class="fas fa-power-off"></i></button>
                        <button class="btn-outline-dark" onclick = "deleteDevice( '${Home}', '${Room}','${Device}')"><i class="far fa-trash-alt"></i></button>
                    </td>
                </tr>`

            }
        }

    }

});

homeName = document.getElementById("HName");
function showHome() {
    database.ref("ALL").once('value', async function (snap) {
        var ketqualangnghe = await snap.val();
        homeName.innerHTML = "";
        for (var Home in ketqualangnghe) {    
            homeName.innerHTML += `
                    <div class="card">
                        <h5 class="card-header btn " style ="text-align: left">Name: ${Home}</h5>
                        <h5></h5>
                        <h6><button class="btn info" onclick="showRoom('${Home}')" style="width:20%"><i class="fas fa-home"></i></button>
                        <button class="btn info" style="width:20%"><i class="far fa-plus-square"></i></button>
                    </div>  
            `
        }
    });

}
///////////////// hien thi nha
romeName = document.getElementById("RName");
function showRoom(Rhome) {
    database.ref("ALL").child(Rhome).once('value', async function (snap) {
        var ketqualangnghe = await snap.val();
        romeName.innerHTML = "";      
        for (var Room in ketqualangnghe) {
                romeName.innerHTML += `
                <div class="card">
                        <h5 class="card-header btn" style="text-align: left">${Rhome}: ${Room}</h5>
                        <h5></h5>
                        <h6><button class="btn info" onclick="showDevice('${Rhome}','${Room}')" style="width:20%"><i class="far fa-lightbulb"></i></button>
                        <button class="btn info" style="width:20%" onclick="aDevice('${Rhome}','${Room}')" ><i class="far fa-plus-square"></i></button>
                        <button class="btn info" style="width:20%" onclick = "deleteRoom( '${Rhome}', '${Room}')"><i class="fa fa-close"></i></button> 
                        <button class="btn info" style="width:20%"><i class="fa fa-pencil-square-o"></i></button></h6>
	
                    </div> 
            `


        }
    });
    deviceName.innerHTML = "";
  
}

deviceName = document.getElementById("DName");
function showDevice(Dhome, Droom) {
    database.ref("ALL").child(Dhome).child(Droom).once('value', async function (snap) {
        var ketqualangnghe = await snap.val();
        deviceName.innerHTML = "";
        for (var device in ketqualangnghe) { 
            deviceName.innerHTML += `     
                   <div class="card">
                        <h5 class="card-header btn" style="text-align: left" >${Droom}: ${device}</h5>
                        <h5></h5>
                        <h6><button class="btn info" style="width:20%"><i class="fa fa-close" onclick = "deleteDevice( '${Dhome}', '${Droom}','${device}')"></i></button>
                          <button class="btn info" style="width:20%"><i class="fa fa-pencil-square-o"></i></button> </h6>
                    </div> 
            `

            
        }
    });
}

function aDevice(home, room) {
    addDevice = "thietbi" + home  + room;
    trangthai = "on";   
    newRootRef = database.ref("ALL").child(home).child(room)
    newRootRef.child(addDevice).set(trangthai)

    showRoom(home)
    showDevice(home, room)

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

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}