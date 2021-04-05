var gref = firebase.database().ref('customer')
var pkg= firebase.database().ref('generatorPkg')

// ye blue print hai  //


function Objfun(key,customer, cnic, cellno, address, date, pakiges,pkgKey){
    this.Key=key
    this.Customer=customer
    this.Cnic=cnic
    this.Cellno=cellno
    this.Address=address
    this.Date=date
    this.Pakiges=pakiges
    this.Status=0
    this.PkgKey=pkgKey
}

// dropdown fill krne k lye firebase sa data mangwaya hai   //

var pakgData=[]

//pkg.orderByChild('DeleteStatus').equalTo(0).on("child_added",function(getData){
pkg.orderByChild('DeleteStatus').equalTo(0).on("child_added",function(getData){
    var ab =getData.val()
    //console.log(ab)
    pakgData.push(ab)
    console.log(pakgData)
    fillPakige2();
})

// dropdown fill is tarah hoga //

function fillPakige2(){

    var pk=document.getElementById('selectPkg2') 
    var option=[]
  //console.log(pakgData)
    for(i=0; i<pakgData.length; i++){
        option.push("<option value=" + pakgData[i]['key'] + ">" + pakgData[i]["Pakiges"] + "</option> " ) 
    }
    pk.innerHTML=option

  


}

// submit click krte hi object ban kr firebase mai chala jaega // 

function funcSubmit2(){
    var objf = new Objfun()

    objf.Key= gref.push().key

    objf.Customer=document.getElementById('custom2').value 
    objf.Cnic=document.getElementById('cnic2').value 
    objf.Cellno=document.getElementById('cellno2').value
    objf.Address=document.getElementById('address2').value 
    objf.Date=document.getElementById('date2').value 
       

    var sel=document.getElementById('selectPkg2')
    objf.Pakiges= sel.options[sel.selectedIndex].text
    console.log(sel.options[sel.selectedIndex].text)
    objf.PkgKey=sel.options[sel.selectedIndex].value 

    console.log(objf)

    gref.child(objf.Key).set(objf)

    document.getElementById('custom2')
    document.getElementById('cnic2')
    document.getElementById('cellno2')
    document.getElementById('address2')
    document.getElementById('date2')

    console.log(objf)
    
}