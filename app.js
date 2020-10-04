let fbname = document.getElementById("fbname")


let login = () =>{
  
  
  var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("user===>",user)
           
        window.location = "chat.html"
      let display = user.displayName;
      fbname.innerHTML=display

      }).catch(function(error) {
        console.log(error.message)
      });
      // 
}
 


var listitem = document.getElementById("listitem");



firebase.database().ref('messages').on('child_added',function(datanew){

  
  let li = document.createElement('li')
 
  li.setAttribute("class","list")
  let mesg = document.createTextNode(datanew.val().value)
  li.appendChild(mesg)
  
  li.innerHTML =datanew.val().name + " : " + datanew.val().value;
  if(datanew.val().name === fbname.innerHTML){

  }
  else{
    
    li.setAttribute("class", "colors");

  }
  
  listitem.appendChild(li)
  usermesg.value=""
 

})



let Send = () =>{
  



  let usermesg = document.getElementById("usermesg");
 

  if(document.getElementById("usermesg").value === ""){
    alert("write a message");

  } 
  else{

var key = firebase.database().ref('messages').push().key;
var todos = {
  name : fbname.innerText,
  value : usermesg.value,
   key:key

}
firebase.database().ref('messages').child(key).set(todos) 
usermesg.value=""




  }
}


let deleteAll =()=>{
  firebase.database().ref("messages").remove();
listitem.innerHTML =""
}











let logout = () =>{
  firebase.auth().signOut().then(function() {
  
    
    window.location = "index.html"
  
  }).catch(function(error) {
    // An error happened.
  });
}


