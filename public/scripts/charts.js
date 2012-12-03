$(function () {
	var avgGrade = 0;
	var sumGrade = 0;
	var chartGrade;
	var grades=[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];    
	var students= [2, 3, 1, 5, 13, 7, 9, 5, 3, 1, 0];
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
                data: students
            }]
        });
                 
	   	
			//var grades=chartGrade.get('grades').categories;
			//var students=chartGrade.get('students').data;	
			var i;
			for (i=0;i<grades.length;i++) {
				avgGrade+=grades[i]*students[i];
				sumGrade+=students[i];
			}
			avgGrade=avgGrade/sumGrade;
			document.getElementById('grade_average').innerHTML = avgGrade.toFixed(1);
    });
    
    $('#my_grade_button').click(function() {
    		avgGrade=avgGrade*sumGrade;
			sumGrade+=1;
			var myGrade = parseInt(document.getElementById('my_grade').value);
			avgGrade+=myGrade;	
			avgGrade=avgGrade/sumGrade;	
			document.getElementById('grade_average').innerHTML = avgGrade.toFixed(1);
			chartGrade.series[0].data[myGrade-10].update(chartGrade.series[0].data[myGrade-10].y + 3);
    });

});