var COLORS = ["course_color_green","course_color_orange","course_color_blue","course_color_red","course_color_pink","course_color_yellow","course_color_violet"];

/* YOU CAN MODIFY THE VALUE IN THE ARRAY WITH THE ID
 * OR WHATEVER IS ASSOCIATED TO THAT DAY
 * Ex: DAY["MON"]=id_div_monday_in_my_calendar
 */
var DAY = new Object();
DAY["MON"]="MON";
DAY["TUE"]="TUE";
DAY["WED"]="WED";
DAY["THU"]="THU";
DAY["FRI"]="FRI";

/* YOU CAN MODIFY THE VALUE IN THE ARRAY WITH THE ID
 * OR WHATEVER IS ASSOCIATED TO THAT HOUR SLOT
 * Ex: HR_SLOT["MOR"]=class_cells_08.45-12.00_in_my_calendar
 */
var HR_SLOT = new Object();
HR_SLOT["MOR"]="day_morning";
HR_SLOT["AFT"]="day_afternoon";
//HR_SLOT["MOR"]="08.45-12.00";
//HR_SLOT["AFT"]="13.30-16.45";
  
// THE SAME AS BEFORE
var TYPE = new Object();
TYPE['M']='M'; //mandatory
TYPE['O']='O'; //optional
TYPE['F']='F'; //free
TYPE['N']='N'; //non technical
  
var courses =
  [
    "DistAlg",
    "Entrep",
    "InternetApp",
    "MobServ",
    "Netw_I",
    "OS",
    "SecCom",
    "SoftDev",
    "SysSec",
    "TeamLead",
    "WebInt",
  ];
  
var courseEcts = new Object();
courseEcts["DistAlg"]=5;
courseEcts["InternetApp"]=3;
courseEcts["MobServ"]=5;
courseEcts["Netw_I"]=5;
courseEcts["OS"]=5;
courseEcts["SecCom"]=5;
courseEcts["SoftDev"]=5;
courseEcts["SysSec"]=5;
courseEcts["WebInt"]=3;
courseEcts["Entrep"]=3;
courseEcts["TeamLead"]=5;

var courseType = new Object();
courseType["DistAlg"]='F';
courseType["InternetApp"]='O';
courseType["MobServ"]='M';
courseType["Netw_I"]='M';
courseType["OS"]='F';
courseType["SecCom"]='O';
courseType["SoftDev"]='M';
courseType["SysSec"]='O';
courseType["WebInt"]='O';
courseType["Entrep"]='N';
courseType["TeamLead"]='N';

var courseHour = new Object();
courseHour["DistAlg"]= [ "WED", "MOR" ];
courseHour["InternetApp"]= ["WED", "AFT" ];
courseHour["MobServ"]= [ "WED", "MOR" ];
courseHour["Netw_I"]= [ "THU", "MOR" ];
courseHour["OS"]= [ "FRI", "MOR" ];
courseHour["SecCom"]= [ "FRI", "MOR" ];
courseHour["SoftDev"]= [ "MON", "MOR" ];
courseHour["SysSec"]= [ "MON", "AFT" ];
courseHour["WebInt"]= [ "WED", "AFT" ];
courseHour["Entrep"]= [ "TUE", "MOR" ];
courseHour["TeamLead"]= [ "TUE", "MOR" ];

// COURSE INCOMPATIBILITIES: SEE function checkCourseCompatibility
var courseIncom = new Object();
courseIncom["DistAlg"]= [ "MobServ" ];
courseIncom["InternetApp"]= [ ];
courseIncom["MobServ"]= [ "DistAlg" ];
courseIncom["Netw_I"]= [ ];
courseIncom["OS"]= [ "SecCom" ];
courseIncom["SecCom"]= [ "OS" ];
courseIncom["SoftDev"]= [ ];
courseIncom["SysSec"]= [ ];
courseIncom["WebInt"]= [ ];
courseIncom["Entrep"]= [ "TeamLead" ];
courseIncom["TeamLead"]= [ "Entrep" ];

// DYNAMIC ARRAY OF COURSES SELECTED DURING THE FIRST LOGIN PHASE
var selectedCourses = new Array();

/* THESE ARE THE ONLY YOU TWO FUNCTIONS YOU HAVE TO WRITE
 * WRITE THE JAVASCRIPT FOR THE INTERACTION WITH THE CALENDAR
 */
function addToCalendar(course) {
  //pure javascript (from handlers in pure javascript)
  dragSrcEl.style.display="none";
  var srcClasses = dragSrcEl.className.split(/\s+/);
  
  //JQuery
  var dst = $('#' + DAY[courseHour[course][0]] + ' .' + HR_SLOT[courseHour[course][1]]);
  var list = dst.find(".inner_course_list");
  
  //hide the course li
  list.find("li").each(function() {
      if ( $(this).find("a").html() == course ) {
        $(this).hide();
      }
    });
  
  //if only incompatible courses in list NOT hide
  //or user will be forced to delete the element to see the other courses in the list
  var up = dst.find(".selected_course_up");
  if(up.length == 0) {
    dst.prepend("<div class='selected_course_up'>"
    +"<a href='#"+course+"'>"+course+"</a>"
    +"</div>");
    var up = dst.find(".selected_course_up");
    up.addClass(srcClasses[1]);
    up.find("a").click(removeCourseClick);
    up.css("height","50%");
    up.find("a").css("padding-top","18%");
    if (list.find("li").length <= 1) {
      list.hide();
    } else {
      list.css("height","50%");
      list.find("ul").css("padding-top","18%");
    }
  } else {
    up.after("<div class='selected_course_down'>"
    +"<a href='#"+course+"'>"+course+"</a>"
    +"</div>");
    var down = dst.find(".selected_course_down");
    down.addClass(srcClasses[1]);
    down.find("a").click(removeCourseClick);
    down.css("height","50%");
    down.find("a").css("padding-top","18%");
    list.hide();
  }
}

function removeFromCalendar(course) {
  //pure javascript (from handlers in pure javascript)
  dragSrcEl.style.display= "";
  
  //JQuery
  var dst = $('#' + DAY[courseHour[course][0]] + ' .' + HR_SLOT[courseHour[course][1]]);
  var list = dst.find(".inner_course_list");
  
  //show the course li
  list.find("li").each(function() {
      if ( $(this).find("a").html() == course ) {
        $(this).show();
      }
    });
  
  var down = dst.find(".selected_course_down");
  var up = dst.find(".selected_course_up");
  if ( down.length == 0) {
    up.remove();
    if (list.find("li").length <= 1) {
      list.show();
    } else {
      list.css("height","100%");
      list.find("ul").css("padding-top","35%");
    } 
  } else {
    if (down.find("a").html()==course) {
      down.remove();
      list.show();
    } else {
      up.remove();
      down.removeClass("selected_course_down");
      down.addClass("selected_course_up");
      list.show();
    }
  }
}


function addCourseDrop(course) {
  if (checkCourseCompatibility(course)) {
    selectedCourses.push(course);
    updateCourseEcts(course,ADD_COURSE);
    addToCalendar(course);
  }
}

function addCourseClick() {
  var course = $(this).html();
  var side = document.querySelectorAll("#courses_side .course_side");
  for (var i in side) {
    var name = side[i].childNodes;
    if (course == name[0].innerHTML) {
      dragSrcEl=side[i];
      break;
    }
  }
  if (checkCourseCompatibility(course)) {
    selectedCourses.push(course);
    updateCourseEcts(course,ADD_COURSE);
    addToCalendar(course);
  }
}

function removeCourseClick() {
  var course = $(this).html();
  var side = document.querySelectorAll("#courses_side .course_side");
  for (var i in side) {
     var name = side[i].childNodes;
    if (course == name[0].innerHTML) {
      dragSrcEl=side[i];
      break;
    }
  }
  var idx = selectedCourses.indexOf(course);
  if(idx != -1) {
    selectedCourses.splice(idx, 1); //remove element from array
    updateCourseEcts(course,REMOVE_COURSE);
    removeFromCalendar(course);
  }
}

function addCourseButton() {
  var course = $('#course_input').val();
  if ( courses.indexOf(course)!=-1 && selectedCourses.indexOf(course)==-1 ) {
    var side = document.querySelectorAll("#courses_side .course_side");
    for (var i in side) {
      var name = side[i].childNodes;
      if (course == name[0].innerHTML) {
        dragSrcEl=side[i];
        break;
      }
    }
    if (checkCourseCompatibility(course)) {
      selectedCourses.push(course);
      updateCourseEcts(course,ADD_COURSE);
      addToCalendar(course);
    }
  }
}

function checkCourseCompatibility(course) {
  for (var inc in courseIncom[course]) {
    if (selectedCourses.indexOf(courseIncom[course][inc]) != -1) {
      alert("Error: the course selected is incompatible with " + selectedCourses[selectedCourses.indexOf(courseIncom[course][inc])] + ".");
      return false;
    }
  }
  return true;
}


var mandatoryEcts=0;
var optionalEcts=0;
var freeEcts=0;
var nonTechEcts=0;
var totalEcts=0;

var ADD_COURSE = 1;
var REMOVE_COURSE = -1;

function updateCourseEcts(course, sign) {
  switch (courseType[course])
  {
    case 'M':
      mandatoryEcts+=courseEcts[course]*sign;
      document.getElementById("mandatory_ects").innerHTML = mandatoryEcts;
      break;
    case 'O':
      optionalEcts+=courseEcts[course]*sign;
      document.getElementById("optional_ects").innerHTML = optionalEcts;
      break;
    case 'F':
      freeEcts+=courseEcts[course]*sign;
      document.getElementById("free_ects").innerHTML = freeEcts;
      break;
    case 'N':
      nonTechEcts+=courseEcts[course]*sign;
      document.getElementById("nontech_ects").innerHTML = nonTechEcts;
      break;
  }
  totalEcts+=courseEcts[course]*sign;
  document.getElementById("total_ects").innerHTML = totalEcts;
}

var schedule = new Object();

function initializeCalendar() {
  for (var d in DAY) {
    for (var h in HR_SLOT) {
      var list = $('#' + DAY[d] + ' .' + HR_SLOT[h]);
      var textToInstert = "<div class='inner_course_list'><ul></ul>"
      if (h == "MOR") {
        textToInstert += '<form><input type="hidden" value="845" name="from"><input type="hidden" value="1200" name="to"></form>';
      } else {
        textToInstert += '<form><input type="hidden" value="1330" name="from"><input type="hidden" value="1645" name="to"></form>';
      }
      textToInstert += "</div>";
      list.html(textToInstert);
      list = list.find(".inner_course_list").find("ul");
      for (var c in courseHour) {
        if (courseHour[c][0]==d && courseHour[c][1]==h) {
          list.append("<li><a "+"href='#"+c+"'>"+c+"</a></li>");
        }
      }
      list.find('li > a').click(addCourseClick);
    }
  }
}

function colorSideCourses() {
  var c = 0;
  $(".course_side").each(function(){
    $(this).addClass(COLORS[c]);
    $(this).css("-moz-user-select","none");
    $(this).css("-khtml-user-select:","none");
    $(this).css("-webkit-user-select:","none");
    $(this).css("user-select:","none");
    c = (c+1)%COLORS.length;
  });
}

$(document).ready(function(){
   initializeCalendar();
   colorSideCourses();
   $('#add_course_button').click(addCourseButton);  
 });