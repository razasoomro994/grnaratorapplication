var gref = firebase.database().ref('generatorPkg')

var pkgDetail = []
gref.orderByChild('DeleteStatus').equalTo(0).on("child_added",function(getData){
    var abc = getData.val()
    pkgDetail.push(abc)
    //console.log(pkgDetail)
})

var customerRef = firebase.database().ref('customer')
var customerTable=[]
customerRef.orderByChild('Status').equalTo(1).on("child_added",function(getData){
    var abc = getData.val()
    customerTable.push(abc)
    console.log(customerTable)
})

function funcdues() {

    var cal=document.getElementById("dues").value  

    for(i=0 ; i< customerTable.length;i++ ){
        customerTable[i]["Month"] = cal

        customerTable[i]['Status'] = 0   

        for(j= 0 ; j< pkgDetail.length; j++){
            console.log('pkg Key:-',pkgDetail[i]['key'],'   /CustomerPkgKey:-',customerTable[i]['PkgKey'])
            if(pkgDetail[i]['key']==customerTable[i]['PkgKey']){
              customerTable[i]["Amount"] = pkgDetail[j]['Charges']
              j=pkgDetail.length 
            }
        }

            
    }
    
console.log(customerTable)

}