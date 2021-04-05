var gref = firebase.database().ref('customer')
var pkg = firebase.database().ref('generatorPkg')

var customerData = []
//filling customer table
gref.orderByChild('Status').equalTo(1).on('child_added', function (getPkgData) {
    var abc = getPkgData.val()
    customerData=[]
    customerData.push(abc)
    fillTable2()
})

function fillTable2() {
    
    var tabl = document.getElementById('tab2')
    
    for (i = 0; i < customerData.length; i++) {
        var tr = document.createElement("tr")
        var td = document.createElement("td")

        td.innerHTML = customerData[i]['Customer']
        tr.appendChild(td)

        var td = document.createElement("td")
        td.innerHTML = customerData[i]['Cnic']
        tr.appendChild(td)


        var td = document.createElement('td')

        td.innerHTML = customerData[i]['Key']
        tr.appendChild(td)

        var td = document.createElement('td')

        var btnEdt = document.createElement('button')
        var b2Text = "Edit"
        btnEdt.innerText = b2Text
        btnEdt.setAttribute('onclick', 'funcEditcustom(this)')
        btnEdt.setAttribute('id', customerData[i]['Key'])
        
        td.appendChild(btnEdt)
        tr.appendChild(td)

        tabl.appendChild(tr)
    }
}

function funcEditcustom(e) {
    gref.child(e.id).once("value", pkgDetail2  =>{
       document.getElementById('custom').value=pkgDetail2.val().customer
       console.log(pkgDetail2)
       document.getElementById('cnic').value=pkgDetail2.val().Cnic
       document.getElementById('lblKey').innerText =pkgDetail2.val().key
       document.getElementById('cellno').value =pkgDetail2.val().Cellno
       document.getElementById('address').value= pkgDetail2.val().Address
       document.getElementById('date').value=pkgDetail2.val().Date
    })

    document.getElementById('btnSubmit').innerText="Update"
    document.getElementById('btncancel').setAttribute('style','visibility: visible;')

    document.getElementById('lblKeyLabel').setAttribute('style','visibility: visible;')
    document.getElementById('lblKey').setAttribute('style','visibility: visible;')
}

function funcCancel(){
    document.getElementById('custom').value=''
       document.getElementById('cnic').value=''
       document.getElementById('lblKey').innerText =''
       document.getElementById('cellno').value =''
       document.getElementById('address').value= ''
       document.getElementById('date').value=''

       document.getElementById('btnSubmit').innerText="Submit"
    document.getElementById('btncancel').setAttribute('style','visibility: hidden;')

    document.getElementById('lblKeyLabel').setAttribute('style','visibility: hidden;')
    document.getElementById('lblKey').setAttribute('style','visibility: hidden;')
}


var pakgData = []
pkg.on("child_added", function (getData) {
    var abc = getData.val()
    pakgData.push(abc)    
    fillPakige();
})

// function fillPakige() {
//     var ddl = document.getElementById('selectPkg')
//     var opt = []

//     for (i = 0; i < pakigeData.length; i++) {
//         opt.push("<option value=" + pakigeData[i]['key'] + ">" + pakigeData[i]['Pakiges'] + "</option>")
//     }

//     ddl.innerHTML = opt


// }


function fillPakige(){
    var pk=document.getElementById('selectPkg') 
    var option=[]
  //console.log(pakgData)
    for(i=0; i<pakgData.length; i++){
        option.push("<option value=" + pakgData[i]['key'] + ">" + pakgData[i]["Pakiges"] + "</option> " ) 
    }
    pk.innerHTML=option
}



function Objpkg(key, customer, cnic, cellno, address, date, pakiges,pkgkey) {
    this.Key = key
    this.Customer = customer
    this.Cnic = cnic
    this.Cellno = cellno
    this.Address = address
    this.Date = date
    this.Pakiges = pakiges
    this.PkgKey=pkgkey
    this.Status=1
   // this.DeleteStatus=deleteStatus
}

//var deleteS=false


function funcsubmit() {
    var objn = new Objpkg()
   
    objn.Key = gref.push().key

    var lblKey=document.getElementById('lblKey').innerText
    if(lblKey !=""){
        objn.Key=document.getElementById('lblKey').innerText
        // if(deleteS == true){
        //     objn.DeleteStatus=1
        // }
    }


    objn.Customer = document.getElementById('custom').value
    objn.Cnic = document.getElementById('cnic').value
    objn.Cellno = document.getElementById('cellno').value
    objn.Address = document.getElementById('address').value
    objn.Date = document.getElementById('date').value

    var sel=document.getElementById('selectPkg')

    objn.Pakiges= sel.options[sel.selectedIndex].text
    //console.log('pp')
    objn.PkgKey=sel.options[sel.selectedIndex].value

    //var ddl=document.getElementById('selectPkg')
    //console.log(ddl)
    //objn.Pakiges = ddl.options[ddl.selectedIndex].text //sel.options[sel.selectedIndex].value

    //console.log(objn, objn.key)

    gref.child(objn.Key).set(objn)

    document.getElementById('custom').value=""
    document.getElementById('cnic').value=""
    document.getElementById('cellno').value="" 
    document.getElementById('address').value=""
    document.getElementById('date').value=""

    document.getElementById('btnSubmit').innerText="Submit"
    document.getElementById('btncancel').setAttribute('style','visibility: hidden;')

    document.getElementById('lblKeyLabel').setAttribute('style','visibility: hidden;')
    document.getElementById('lblKey').setAttribute('style','visibility: hidden;')
    document.getElementById('lblKey').innerHTML=""
    //console.log(objn)
}