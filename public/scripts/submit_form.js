var loginList=["amchyaa@eurecom.fr","ghassane.amchyaa@eurecom.fr", "antonio.verardi@eurecom.fr"]
var password="webint"

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

function submit_form() {
    var login=document.getElementById('login').value
    var pass=document.getElementById('passwrd').value
    if ((include(loginList,login)) && (pass==password)) {
	document.location.href="./setup.html"
    }
    else {
	alert("Try Again")
    }
}

document.getElementById('subm').addEventListener("click",submit_form,true)
