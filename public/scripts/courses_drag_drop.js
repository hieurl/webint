$(document).ready(function(){
	var calendar = document.getElementById('calendar_stub');
	calendar.addEventListener('dragenter', handleDragEnter, false)
	calendar.addEventListener('dragover', handleDragOver, false);
	calendar.addEventListener('dragleave', handleDragLeave, false);
	calendar.addEventListener('drop', handleDrop, false);
	
	var courses = document.querySelectorAll('#courses_side .course_side');
	[].forEach.call(courses, function(course) {
	  course.addEventListener('dragstart', handleDragStart, false);
	  course.addEventListener('dragend', handleDragEnd, false);
	});
		
});


var dragSrcEl = null;

function handleDragStart(e) {
  // Target (this) element is the source node.
  this.style.opacity = '0.4';

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }
	
  /* INSERT HERE YOUR CODE TO BE EXECUTED AFTER DROPPED */
  /*DESTINATION SIDE*/
  var course = e.dataTransfer.getData('text/html');
  addCourseDrop(course);
  
  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.

  /* INSERT HERE YOUR CODE TO BE EXECUTED AFTER DRAGGED */
  /*SOURCE SIDE*/
  document.getElementById('calendar_stub').classList.remove('over');
  this.style.opacity = '1';   
}