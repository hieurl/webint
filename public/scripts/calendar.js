/*
* calendar.js
* This is the code to move the events to their place, according to the timetable.
*
*/

function drawCalendar(){
	// Responsive layout:
	if (window.innerWidth < 480)
		return;//TODO: recall drawCalendar when the window is resized, and reset the style to default if mobile.
		
	// PARAMETERS
	var firsthour=845; // when does morning start?
	var lasthour=1900; // when does the school close?
	var calHeight=400; // how tall is the calendar (in px) ?
	
	w=document.getElementById("monday_head").offsetWidth-6;
	var dow = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    var length= dow.length;
    for (var i=0; i<length; i++){
        b=document.getElementById(dow[i]+"_body");
        b.style.width=w+"px";
    } 
		
	articles = document.getElementsByTagName('article')
	for (a in articles) {
		if (articles[a].className=="vevent") {
			form=articles[a].getElementsByTagName('form')[0];
			if(typeof(form)!="undefined"){
				inputs=form.getElementsByTagName('input');
				for (i in inputs){
					if(inputs[i].name=="from"){
						timestart=inputs[i].value;
						break;
					}
				}
				pos=timestart-firsthour;
				if (pos < 0) pos=0;
				//TODO: manage pos>lasthour
				pos=pos*(calHeight/(lasthour-firsthour));
				//TODO: manage event duration
				articles[a].style.position="absolute";
				articles[a].style.top=Math.floor(pos)+"px";
				articles[a].style.width=w+"px";
				//TODO: manage concurrent events
			}
		}
	}


};

window.onload=drawCalendar;
