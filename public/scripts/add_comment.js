var count=0
var str=""

function update_comments() {
    
    var text_comment=document.getElementById('text_comment')
    var article=document.getElementById('comments')
    commentToAdd=document.getElementById('comment').value
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (hours < 10){
	hours = "0" + hours }
    if (minutes < 10){
	minutes = "0" + minutes }
    var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()
    
    if (commentToAdd!="") {
	count++
	//add comment
	text_comment.innerHTML="<textarea class=\"comment\" id=\"comment\" placeholder=\"Post your comment...\" ></textarea>"
	var to_add="<div id=\"comment_post"+count+"\">"+commentToAdd+"<div id=\"user"+count+"\">posted by user</div><div id=\"time"+count+"\">"+month + "/" + day + "/" + year+" @ "+hours+":"+minutes+"</div></div>"
	str=to_add+str
	article.innerHTML=str
	////////////////
	var i=1;
	while (i<=count) {
	    var comment=document.getElementById('comment_post'+i)
	    var user=document.getElementById('user'+i)
	    var time=document.getElementById('time'+i)
	    //user
	    user.style.fontStyle="italic"
	    user.style.fontSize="10px"
	    user.style.color="#239CD3"
	    //time
	    time.style.fontSize="10px"
	    time.style.fontStyle="italic"
	    time.style.color="#239CD3"
	    //comment
	    comment.style.border="1px #239CD3 solid"
	    comment.style.textAlign="center"
	    comment.style.marginTop="5px"
	    comment.style.width="500px"
	    comment.style.marginRight="auto"
	    comment.style.marginLeft="auto"
	    comment.style.borderRadius="10px"
	    comment.style.padding="5px"
	    comment.style.boxShadow="2px 2px 2px #C3C3C3"
	    comment.style.fontSize="15px"
	    i++
	}
    }
}

document.getElementById('add').addEventListener("click",update_comments,true)
