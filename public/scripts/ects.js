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
HR_SLOT["MOR"]="08.45-12.00";
HR_SLOT["AFT"]="13.30-16.45";
  
// THE SAME AS BEFORE
var TYPE = new Object();
TYPE['M']='M'; //mandatory
TYPE['O']='O'; //optional
TYPE['F']='F'; //free
TYPE['N']='N'; //non technical
  
var courses =
  [
    "DistAlg",
    "InternetApp",
    "MobServ",
    "Netw_I",
    "OS",
    "SecCom",
    "SoftDev",
    "SysSec",
    "WebInt",
    "Entrep",
    "TeamLead"
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
courseHour["Netw_I"]= [ "THU", "MOR", "THU", "AFT" ];
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
  var li = document.createElement('li');
  li.innerHTML = course;
  document.getElementById('ulCal').appendChild(li);
  dragSrcEl.style.visibility= 'hidden';
}

function removeFromCalendar(course) {
  
}


function addCourse(course, srcHandle) {
  if (checkCourseCompatibility(course)) {
    selectedCourses.push(course);
    updateCourseEcts(course,ADD_COURSE);
    addToCalendar(course);
  }
}

function removeCourse(course) {
  var idx = selectedCourses.indexOf(course);
  if(idx != -1) {
    selectedCourses.splice(idx, 1); //remove element from array
    updateCourseEcts(course,REMOVE_COURSE);
    removeFromCalendar(course);
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


