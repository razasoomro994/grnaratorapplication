console.log(firebase)
var userRef=firebase.database().ref("UserData")

function Objuser(key,fname,lname,cellno,password){
    this.Key=key
    this.Fname=fname
    this.Lname=lname
    this.Cellno=cellno
    this.Password=password
}

function funcuser(){
    var objlog= new Objuser()

    objlog.Key=userRef.push().key

    objlog.Fname=document.getElementById('fname').value 
    objlog.Lname=document.getElementById('lname').value 
    objlog.Cellno=document.getElementById('cell').value 
    objlog.Password=document.getElementById('password').value 

    document.getElementById('fname').value=""
   document.getElementById('lname').value =""
    document.getElementById('cell').value =""
   document.getElementById('password').value =""


   userRef.child(objlog.Key).set(objlog)

    console.log(objlog)

}