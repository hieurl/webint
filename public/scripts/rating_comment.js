$(document).ready(function(){
   addHandlersRateComment();
 });

function addHandlersRateComment() {
  /* HANDLERS */
   $('.comment_up').click(rateUp);
    
   $('.comment_down').click(rateDown);
   
	$('.comment_up').hover(
		function() {
			$('img', this).attr('src', images["hover_up"]);
		},
		function() {
			if ($(this).parents('div').find('.voted').html() == VOTED_NOT) {
				$('img', this).attr('src', images["before_up"]);
			} else {
				$('img', this).attr('src', images["after_up"]);
			}
		}
	);
	
	$('.comment_down').hover(
		function() {
			$('img', this).attr('src', images["hover_down"]);
		},
		function() {
			if ($(this).parents('div').find('.voted').html() == VOTED_NOT) {
				$('img', this).attr('src', images["before_down"]);
			} else {
				$('img', this).attr('src', images["after_down"]);
			}
		}
	);
}

// costants for rating state
	// state defined in hidden <span class="voted"> 
	var VOTED_NOT = "not";
	var VOTED_UP = "up";
	var VOTED_DOWN = "down";

	// images paths array
	var images = new Array();
	images["before_up"]="./images/arrow_up_gray.png";
	images["hover_up"]="./images/arrow_up_yellow.png";
	images["after_up"]="./images/arrow_up_green.png";
	images["before_down"]="./images/arrow_down_gray.png";
	images["hover_down"]="./images/arrow_down_yellow.png";
	images["after_down"]="./images/arrow_down_red.png";
	
	/* STATE FUNCTIONS */
	function alreadyRatedUp(comment) {
		var up = comment.find(".comment_up");
		up.find('img').attr("src",images["after_up"]);
		up.attr("title","Click again to undo");
		
		comment.find(".comment_down").css("visibility","hidden");
	}
	
	function alreadyRatedDown(comment) {
		comment.find(".comment_up").css("visibility","hidden");
		
		var down = comment.find(".comment_down");
		down.find('img').attr("src",images["after_down"]);
		down.attr("title","Click again to undo");
	}
	
	function beforeRated(comment) {
		var up = comment.find(".comment_up");
		up.find('img').attr("src",images["before_up"]);
		up.attr("title","Rate up!");
		up.css("visibility","visible");
				
		var down = comment.find(".comment_down");
		down.find('img').attr("src",images["before_down"]);
		down.attr("title","Rate down!");
		down.css("visibility","visible");
	}
	
	/* HANDLERS FUNCTIONS */
	function rateUp(event) {
 		event.preventDefault();
 		var comment = $(this).parents('div');
 		var voted = comment.find('.voted');
 		var num = comment.find('.comment_rate_num');
 		if (voted.html() == VOTED_NOT) {
 			alreadyRatedUp(comment);
 			num.html(parseInt(num.html())+1);
 			voted.html(VOTED_UP);
 		} else if (voted.html() == VOTED_UP) {
 			beforeRated(comment);
 			num.html(parseInt(num.html())-1);
 			voted.html(VOTED_NOT);
 		}
    }	

	function rateDown(event) {
   	event.preventDefault();
 		var comment = $(this).parents('div');
 		var voted = comment.find('.voted');
 		var num = comment.find('.comment_rate_num');
 		if (voted.html() == VOTED_NOT) {
 			alreadyRatedDown(comment);
 			num.html(parseInt(num.html())-1);
 			voted.html(VOTED_DOWN);
 		} else if (voted.html() == VOTED_DOWN) {
			beforeRated(comment); 			
 			num.html(parseInt(num.html())+1);
 			voted.html(VOTED_NOT);
 		}
   }