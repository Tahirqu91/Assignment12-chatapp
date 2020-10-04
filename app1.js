window.onload = function(){

firebase.auth().onAuthStateChanged((user)=>{
if(user){
  firebase.auth().currentUser
  let display = user.displayName;
  fbname.innerHTML=display
}


      });

    }