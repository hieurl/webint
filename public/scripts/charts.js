$(function () {
	var avgGrade = 0;
	var sumGrade = 0;
	var chartGrade;
	var grades=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];    
	var studentsGrade= [0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 2, 3, 1, 5, 13, 7, 9, 5, 3, 1, 0];
	
	var avgScore = 0;
	var sumScore = 0;
	var chartScore;
	var scores=[1, 2, 3, 4, 5 ];    
	var studentsScore= [3, 5, 3, 7, 12];   
    $(document).ready(function() {
        
        chartGrade = new Highcharts.Chart({
            chart: {
                renderTo: 'grade_chart_container',
                type: 'line',
                marginRight: 130,
                marginBottom: 25
            },
            title: {
                text: 'Final Grade',
                x: -20 //center
            },
            xAxis: {
            	 id: 'grades', 
                categories: grades
            },
            yAxis: {
                title: {
                    text: 'Students',
                },
                min : 0,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>Grade: ' + this.x + '</b><br/>Students: '+ this.y ;
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 100,
                borderWidth: 0
            },
            series: [{
            	 id: 'students',
                name: 'Grades',
                data: studentsGrade
            }]
        });
        
        chartScore = new Highcharts.Chart({
            chart: {
                renderTo: 'score_chart_container',
                type: 'column',
                marginRight: 130,
                marginBottom: 25,
            },
            colors: [
							'#DB843D',		
							'#B5CA92',	
							'#A47D7C', 	
							'#92A8CD', 	
							'#3D96AE',	
							'#80699B', 	
							'#89A54E',	
							'#AA4643',	
							'#4572A7'    	
						],
            title: {
                text: 'Exam Score',
                x: -20 //center
            },
            xAxis: {
            	 id: 'scores', 
                categories: scores
            },
            yAxis: {
                title: {
                    text: 'Students',
                },
                min : 0,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>Score: ' + this.x + '</b><br/>Students: '+ this.y ;
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 100,
                borderWidth: 0,
                enabled : false
            },
            series: [{
            	 id: 'students',
                name: 'Scores',
                data: studentsScore
            }]
        });
               
			//var grades=chartGrade.get('grades').categories;
			//var students=chartGrade.get('students').data;	
			var i;
			for (i=0;i<grades.length;i++) {
				avgGrade+=grades[i]*studentsGrade[i];
				sumGrade+=studentsGrade[i];
			}
			avgGrade=avgGrade/sumGrade;
			document.getElementById('grade_average').innerHTML = avgGrade.toFixed(1);
			
			for (i=0;i<scores.length;i++) {
				avgScore+=scores[i]*studentsScore[i];
				sumScore+=studentsScore[i];
			}
			avgScore=avgScore/sumScore;
			document.getElementById('score_average').innerHTML = avgScore.toFixed(1);
    });
    
    $('#my_grade_button').click(function() {
    		if (!isNaN(document.getElementById('my_grade').value)) {
				var myGrade = parseInt(document.getElementById('my_grade').value);
				if (is_int(document.getElementById('my_grade').value) && myGrade>=0 && myGrade<=20) {	    		
		    		avgGrade=avgGrade*sumGrade;
					sumGrade+=1;
					avgGrade+=myGrade;	
					avgGrade=avgGrade/sumGrade;	
					document.getElementById('grade_average').innerHTML = avgGrade.toFixed(1);
					chartGrade.series[0].data[myGrade].update(chartGrade.series[0].data[myGrade].y + 1);
					document.getElementById('my_grade').disabled=true;
					document.getElementById('my_grade_button').disabled=true;
					document.getElementById('my_grade_undo').hidden=false;
				} else {
					alert('Please, put an integer number between 0 and 20');
				}	
			} else {
				alert('Only numbers allowed');
			}
    });
    $('#my_grade_undo').click(function() {
    		var myGrade = parseInt(document.getElementById('my_grade').value);
		   avgGrade=avgGrade*sumGrade;
			sumGrade-=1;
			avgGrade-=myGrade;	
			avgGrade=avgGrade/sumGrade;	
			document.getElementById('grade_average').innerHTML = avgGrade.toFixed(1);
			chartGrade.series[0].data[myGrade].update(chartGrade.series[0].data[myGrade].y - 1);
			document.getElementById('my_grade').disabled=false;
			document.getElementById('my_grade_button').disabled=false;
			document.getElementById('my_grade_undo').hidden=true;
    });
    
    
    $('#my_score_button').click(function() {
    		if (!isNaN(document.getElementById('my_score').value)) {
				var myScore = parseInt(document.getElementById('my_score').value);
				if (is_int(document.getElementById('my_score').value) && myScore>=1 && myScore<=5) {	    		
		    		avgScore=avgScore*sumScore;
					sumScore+=1;
					avgScore+=myScore;	
					avgScore=avgScore/sumScore;	
					document.getElementById('score_average').innerHTML = avgScore.toFixed(1);
					chartScore.series[0].data[myScore-1].update(chartScore.series[0].data[myScore-1].y + 1);
					document.getElementById('my_score').disabled=true;
					document.getElementById('my_score_button').disabled=true;
					document.getElementById('my_score_undo').hidden=false;
				} else {
					alert('Please, put an integer number between 0 and 5');
				}	
			} else {
				alert('Only numbers allowed');
			}
    });
    $('#my_score_undo').click(function() {
    		var myScore = parseInt(document.getElementById('my_score').value);
		   avgScore=avgScore*sumScore;
			sumScore-=1;
			avgScore-=myScore;	
			avgScore=avgScore/sumScore;	
			document.getElementById('score_average').innerHTML = avgScore.toFixed(1);
			chartScore.series[0].data[myScore-1].update(chartScore.series[0].data[myScore-1].y - 1);
			document.getElementById('my_score').disabled=false;
			document.getElementById('my_score_button').disabled=false;
			document.getElementById('my_score_undo').hidden=true;
    });

});

function is_int(value){
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
      return true;
  } else {
      return false;
  }
}