var average = 0;
var sum = 0;
var chart;

$(function () {
    $(document).ready(function() {
        chart = new Highcharts.Chart({
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
                categories: ['10', '11', '12', '13', '14', '15',
                    '16', '17', '18', '19', '20']
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
                name: 'Grades',
                data: [2, 3, 1, 5, 13, 7, 9, 5, 3, 1, 0]
            }]
        });
    });
   
   var grades=[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];    
	var students= [2, 3, 1, 5, 13, 7, 9, 5, 3, 1, 0];
	var i;
	for (i=0;i<grades.length;i++) {
		average+=grades[i]*students[i];
		sum+=students[i];
	}
	average=average/sum;
	document.getElementById('grade_average').innerHTML = average.toFixed(1);

});

function updateAverageGrade() {
	average=average*sum;
	sum+=1;
	var myGrade = parseInt(document.getElementById('my_grade').value);
	average+=myGrade;	
	average=average/sum;	
	document.getElementById('grade_average').innerHTML = average.toFixed(1);
	chart.series[0].data[0].update(chart.series[0].data[0].y + 3);
};