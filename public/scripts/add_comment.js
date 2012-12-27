
function update_comments() {
    var comment=document.getElementById('comment_post')
    commentToAdd=document.getElementById('comment').value
    comment.innerHTML=commentToAdd
}

document.getElementById('add').addEventListener("click",update_comments,true)
