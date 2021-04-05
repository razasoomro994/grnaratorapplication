var gref = firebase.database().ref('generatorPkg')


function Objpak(key, pakiges, charges,deleteStatus) {
    this.key = key
    this.Pakiges = pakiges
    this.Charges = charges
    this.DeleteStatus=deleteStatus
}

var dataToFillTable = []
gref.orderByChild('DeleteStatus').equalTo(0).on("child_added", function (getData) {
    var abc = getData.val()
    dataToFillTable = []
    dataToFillTable.push(abc)
    fillTable()

})

function fillTable() {


    var tab = document.getElementById('tabil')
    for (i = 0; i < dataToFillTable.length; i++) {

        var tr = document.createElement("tr")
        var td = document.createElement("td")

        td.innerHTML = dataToFillTable[i]['Charges']
        tr.appendChild(td)

        var td = document.createElement("td")
        td.innerHTML = dataToFillTable[i]['Pakiges']
        tr.appendChild(td)

        
        var td = document.createElement('td')

        td.innerHTML = dataToFillTable[i]['key']
        tr.appendChild(td)
        
         var td=document.createElement('td')
         var btnEdit=document.createElement('button')
         var bText="Edit"
         btnEdit.innerText=bText
         btnEdit.setAttribute('onclick','funcEdit(this)')
         btnEdit.setAttribute('id',dataToFillTable[i]['key'])
         td.appendChild(btnEdit)
         tr.appendChild(td)
        tab.appendChild(tr)

        var td =document.createElement("td")
        var btndelete= document.createElement('button')
        var dText="Delete"
        btndelete.innerText=dText
        btndelete.setAttribute('onclick','funcDelete(this)')
        btndelete.setAttribute('id',dataToFillTable[i]["key"])
        btndelete.setAttribute('type','submit')
           td.appendChild(btndelete)
           tr.appendChild(td)
         
           tab.appendChild(tr)

    }

}

var deleteS=false

 function funcDelete(d){
   // gref.child(d.id).remove()
   //gref.child(d.id).update
   funcEdit(d)
   deleteS=true
   funcsub()

}
     

// data from table to in input box and update // 

function funcEdit(e){
   
   gref.child(e.id).once("value", pkgDetail =>{
    document.getElementById('pakige').value =pkgDetail.val().Pakiges
      document.getElementById('charges').value =pkgDetail.val().Charges
      document.getElementById("lblkey2").innerText =pkgDetail.val().key
   })

   document.getElementById('buttn').innerText='update'
   document.getElementById('canclbtn').setAttribute('style','visibility: visible;')

   document.getElementById('lblKeyLabel2').setAttribute('style','visibility: visible;')
   document.getElementById('lblkey2').setAttribute('style','visibility: visible;')
}
//lblkey2


// cancel button fire now //

function funcpkgCancel(){

    document.getElementById('pakige').value=''
    document.getElementById('charges').value=''
    document.getElementById('lblkey2').innerText=''

    document.getElementById('buttn').innerText='submit'
    document.getElementById('canclbtn').setAttribute('style','visibility: hidden;')

    document.getElementById('lblKeyLabel2').setAttribute('style','visibility: hidden;')
    document.getElementById('lblKey2').setAttribute('style','visibility: hidden;')
 
}


// dono box fill honge to data firebase mai jaega wrna nhi  validate ye kam kr rha hai   //

function validate(Pakiges, Charges) {
    var validate = true
    if (Pakiges == "") {
        validate = false
    }

    if (Charges == "") {
        validate = false
    }

    return validate
}

function funcsub() {
    var objpakige = new Objpak()
    
    objpakige.key = gref.push().key
    objpakige.DeleteStatus=0

    var lblkey2=document.getElementById("lblkey2").innerText
    if(lblkey2 !=""){
        objpakige.key=document.getElementById("lblkey2").innerText
        if(deleteS == true){
            objpakige.DeleteStatus=1
        }
    }

    deleteS=false

    objpakige.Pakiges = document.getElementById('pakige').value
    objpakige.Charges = document.getElementById('charges').value

     // dono box fill hone k lye ye validation use kr rhe hen //

    if (validate(objpakige.Pakiges, objpakige.Charges)) {

    }
    else {
        alert("fill all fields")
        return
    }

    gref.child(objpakige.key).set(objpakige)

    document.getElementById('pakige').value = ""
    document.getElementById('charges').value = ""

    document.getElementById('buttn').innerText="Submit"
    document.getElementById('canclbtn').setAttribute('style','visibility: hidden;')

    document.getElementById('lblKeyLabel2').setAttribute('style','visibility: hidden;')
    document.getElementById('lblkey2').setAttribute('style','visibility: hidden;')
    document.getElementById('lblkey2').innerHTML=""
    
    

     
    console.log(objpakige)



}
