//Show new event
$(document).ready(function() {
	$('a.event_window').click(function() {
		
        //Getting the variable's value from a link 
		var loginBox = $(this).attr('href');

		//Fade in the Popup
		$(loginBox).fadeIn(300);
		
		//Set the center alignment padding + border see css style
		var popMargTop = ($(loginBox).height() + 24) / 2; 
		var popMargLeft = ($(loginBox).width() + 24) / 2; 
		
		$(loginBox).css({ 
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		
		// Add the mask to body
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

