$(document).ready(function(){
	var file = document.getElementById("dragout");
	var fileDetails;
	
	//I can't understand if it's working or not 
	if(typeof file.dataset === "undefined") {
	    // Grab it the old way
	    fileDetails = file.getAttribute("data-downloadurl");
	} else {
	    fileDetails = file.dataset.downloadurl;
	} 
	
	file.addEventListener("dragstart",function(evt){
		evt.dataTransfer.setData("DownloadURL",fileDetails);
	},false);
});

