    var gref=firebase.database().ref('customer')
    var pkg=firebase.database().ref('generatorPkg')



    var pakigeData=[]
    gref.on('child_added',function(getPkgData){
        console.log(getPkgData.val())
        var abc=getPkgData.val()
        pakigeData.push(abc)
        fillPakige()
        fillTable2()
    })



    function fillTable2() {


        var tabl = document.getElementById('tab2')
        for (i = 0; i < pakigeData.length; i++) {
        console.log(i)
            var tr = document.createElement("tr")
            var td = document.createElement("td")
    
            td.innerHTML = pakigeData[i]['Customer']
            tr.appendChild(td)
    
            var td = document.createElement("td")
            td.innerHTML = pakigeData[i]['Cnic']
            tr.appendChild(td)
    
            
            var td = document.createElement('td')
    
            td.innerHTML = pakigeData[i]['key']
            tr.appendChild(td)
            
             var td=document.createElement('td')
             var btnEdt=document.createElement('button')
             var b2Text="Edit"
             btnEdt.innerText=b2Text
             btnEdt.setAttribute('onclick','funcEditcustom(this)')
             btnEdt.setAttribute('id',pakigeData[i]['key'])
             td.appendChild(btnEdt)
             tr.appendChild(td)
           
             tabl.appendChild(tr)
    
            
    
        }
    
    }
    
    function funcEditcustom(e){ 
       gref.child(e.id).once("value", pkgDetail2 =>{
        document.getElementById('custom').value=pkgDetail2.val().Customer
          document.getElementById('cnic').value=pkgDetail2.val().Cnic
       })
    }
    
    

    
    
    function fillPakige(){
        var ddl=document.getElementById('selectPkg')
        var opt=[]
        for(i=0;i<pakigeData.length;i++){
            opt.push("<option value=" +pakigeData[i]['key'] + ">" + pakigeData[i]['Pakiges'] + "</option>")
        }

        ddl.innerHTML=opt
    }

    var pakig 
    function funsel(){
        var sel=document.getElementById('selectPkg')
        pakig=sel.options[sel.selectedIndex].value
    }

  function Objpkg(key,customer,cnic,cellno,address,date,pakiges,){
    this.key=key
    this.Customer=customer
    this.Cnic=cnic
    this.Cellno=cellno
    this.Address=address
    this.Date=date
    this.Pakiges=pakiges
}

function funcsubmit(){
    var objn=new Objpkg()
    objn.key=gref.push().key

    objn.Customer=document.getElementById('custom').value
    objn.Cnic=document.getElementById('cnic').value
    objn.Cellno=document.getElementById('cellno').value 
    objn.Address=document.getElementById('address').value
    objn.Date=document.getElementById('date').value
    objn.Pakiges=pakig 

    gref.child(objn.key).set(objn)

    document.getElementById('custom').value=""
    document.getElementById('cnic').value=""
    document.getElementById('cellno').value="" 
    document.getElementById('address').value=""
    document.getElementById('date').value=""

    console.log(objn)
}