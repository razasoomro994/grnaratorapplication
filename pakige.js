var gref = firebase.database().ref('generatorPkg')


function Objpak(key, pakiges, charges,) {
    this.key = key
    this.Pakiges = pakiges
    this.Charges = charges
}

var dataToFillTable = []
gref.on("child_added", function (getData) {
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

        

    }

}

function funcEdit(e){
   
   gref.child(e.id).once("value", pkgDetail =>{
     
    
    document.getElementById('pakige').value=pkgDetail.val().Pakiges
      document.getElementById('charges').value=pkgDetail.val().Charges
   })
}


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
    objpakige.Pakiges = document.getElementById('pakige').value
    objpakige.Charges = document.getElementById('charges').value

    if (validate(objpakige.Pakiges, objpakige.Charges)) {

    }
    else {
        alert("fill all fields")
        return
    }

    gref.child(objpakige.key).set(objpakige)

    document.getElementById('pakige').value = ""
    document.getElementById('charges').value = ""

    console.log(objpakige)



}
