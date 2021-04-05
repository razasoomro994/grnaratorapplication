//console.log(firebase)
var gref =firebase.database().ref('customer')


customerData =[]
//gref.orderByChild('Status').equalTo(0).on('child_added', function (getPkgData) {
gref.orderByChild('Status').equalTo(0).on('child_added',function (getPkgData){
    var abc =getPkgData.val()
    customerData=[]
    customerData.push(abc)
    fillTable2()
})

function fillTable2(){

    var tabl = document.getElementById('tab2')
    for(i=0; i < customerData.length ; i++ ){
      console.log(customerData[i])
         var tr=document.createElement("tr")
         var td=document.createElement("td")

         td.innerHTML= customerData[i]['Customer']
         tr.appendChild(td)


        var td=document.createElement("td")
        td.innerHTML= customerData[i]['Cnic']
        tr.appendChild(td)


        var td=document.createElement("td")
        td.innerHTML=customerData[i]['Key']
        tr.appendChild(td)

        var td=document.createElement('td')

       var btnEdit=document.createElement('button') 
       var b2Text="Join"
       
       btnEdit.innerText=b2Text
       btnEdit.setAttribute('onclick','funjoin(this)')
       btnEdit.setAttribute('id',customerData[i]['Key'])
       
       td.appendChild(btnEdit)
       tr.appendChild(td)

        tabl.appendChild(tr)


    }

}

function funjoin(j){
    fillobject(j)
}

var objjoin 

function fillobject (j) {
    console.log(j)
    gref.child(j.id).once( "value" ,pkgDetail2  =>{
        objjoin =pkgDetail2.val()
        console.log(objjoin)
        objjoin.Status=1
        console.log(objjoin)

        var key=objjoin.Key

        gref.child(key).set(objjoin)
    
})

}

function Objpkg(key, customer, cnic, cellno, address, date, pakiges) {
    this.key = key
    this.Customer = customer
    this.Cnic = cnic
    this.Cellno = cellno
    this.Address = address
    this.Date = date
    this.Pakiges = pakiges
   // this.DeleteStatus=deleteStatus
}

//var deleteS=false


