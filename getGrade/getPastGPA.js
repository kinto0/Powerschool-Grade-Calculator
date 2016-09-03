$(document).ready(function () {

var grades = [];
var gradesChanged = [];

var table = $("#customContent");
var rows = table.find("tr");


var yearColumn = 17;
if(table.find("th:contains('Y1')").index() != 5) yearColumn = 21;

rows.each(
	function(c){
// for first row we want to add a checkbox
		$(this).find("td:eq('0')").each(
	    		function(){
	    			//add a checkbox next to class after skipping the 2 
	    			$(this).prepend("<input class='checkboxClass' type='checkbox' id='" + (c-2) + "' checked='checked'>");
	    		});
	    $(this).find("td:eq('" + yearColumn + "')").each(
	    	function(){
	    		grades.push($(this).text());
	    	});
	    gradesChanged = grades.slice();
	});


$('#customContent').append("Year GPA: <span id='gpa'>" + getGpa(grades) + "</span>");


function getGpa(gradeArray){


	if(gradeArray[gradeArray.length-1] < 0){
		 return 0;
	}
	var total = 0;
	var c = 0;
	var nulls = 0;
	
	//for each checkbox, check if checked and if it isn't then remove value from array
	
	while (c < gradeArray.length){
		var gpa = gradeArray[c];
		if(gpa.includes("A+") || gpa >= 97) {gpa = 4.3;}
		else if(gpa.includes("A-") || gpa >= 90){gpa = 3.7;}
		else if(gpa.includes("A") || gpa >= 93){gpa = 4.0;}
	    else if(gpa.includes("B+") || gpa >= 87){gpa = 3.3;}
	    else if(gpa.includes("B-") || gpa >=80){gpa = 2.7;}
	    else if(gpa.includes("B" )|| gpa >= 83){gpa = 3.0;}
	    else if(gpa.includes("C+") || gpa >= 77){gpa = 2.3;}
	    else if(gpa.includes("C-") || gpa >= 70){gpa = 1.7;}
	    else if(gpa.includes("C" )|| gpa >= 74){gpa = 2.0;}
	    else if(gpa.includes("D+") || gpa >= 67){gpa = 1.3;}
	    else if(gpa.includes("D-") || gpa >= 60){gpa = 0.7;}
	    else if(gpa.includes("D" )|| gpa >= 64){gpa = 1.0;}
	    else if(gpa.includes("F" )|| (gpa <= 60 && gpa >= 1)){gpa = 0.00;}
	    else {gpa = 0; nulls++;}
	    total+= +gpa;
		c++;
	}
	total /= (c-nulls);
	return total.toFixed(2);
}

$(".checkboxClass").change(function() {
	var id = $(this).attr('id');

  if ($(this).is(':checked')) {
  	gradesChanged[id] = grades[id]
  }
  else{
  	gradesChanged[id] = "0";
  }

  $("#gpa").text(getGpa(gradesChanged));

});
});