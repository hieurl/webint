// a simple checkin of the users with one user. Me :-)
var loginList=["amchyaa@eurecom.fr","ghassane.amchyaa@eurecom.fr"]
var password="webint"

//verify if an object is the array or not
function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

//if the user is Me, redirect to the home(main) page
function submit_form() {
    var login=document.getElementById('login').value
    var pass=document.getElementById('passwrd').value
    if ((include(loginList,login)) && (pass==password)) {
	document.location.href="./main.html"
    }
    else {
	alert("Try Again")
    }
}

document.getElementById('subm').addEventListener("click",submit_form,true)
