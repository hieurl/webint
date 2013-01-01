//Show new event
$(document).ready(function() {
	$('a.track_window').click(function() {
		var trackBox = $(this).attr('href');
		$(trackBox).fadeIn(300);

		var popMargTop = ($(trackBox).height() + 24) / 2;
		var popMargLeft = ($(trackBox).height() + 24) / 2;
		
		$(trackBox).css({
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});

		$('body').append('<div id="mask"></div>');
		$('#mask').fadeIn(300);
		
		return false;
	});
	
	// When clicking on the button close or the mask layer the popup closed
	$('.close, #mask').live('click', function() { 
		$('#mask , #new_event').fadeOut(300 , function() {
			$('#mask').remove();  
		}); 
		
		$('#mask , #choose_track').fadeOut(300 , function() {
			$('#mask').remove();
        });

		
		return false;
	});

   $( "#course_input" ).autocomplete({
               	source: courses
	});

});

