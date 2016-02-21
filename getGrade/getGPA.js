$(document).ready(function () {
var table = $("#quickLookup").html();


var grades1 = [];
var grades2 = [];
var grades3 = [];
var grades4 = [];

var quarters = 0;



//for each row
var rows = $("#quickLookup").find("tr[id^='ccid']");


//if there is q1 grades, get them
if (table.indexOf('Q1') > -1){
	quarters = 1;
	rows.each(
	    function(c) {
	    	//for column 11 (course column)
	    	$(this).find("td:eq('11')").each(
	    		function(){
	    			$(this).prepend("<input class='checkboxClass' type='checkbox' id='" + c + "' checked='checked'>");
	    		});
	    	$(this).find("td:eq('12')").each(
	    		function(){
	    			grades1.push($(this).text());
	    		});
	});
}

if (table.indexOf('Q2') > -1){
	quarters = 2;
	rows.each(
	    function() {
	    	//for column 12 (quarter 2)
	    	$(this).find("td:eq('13')").each(
	    		function(){
	    			grades2.push($(this).text());
	    		});
	});
}
if (table.indexOf('Q3') > -1){
	quarters = 3;
	rows.each(
	    function() {
	    	//for column 13 (quarter 3)
	    	$(this).find("td:eq('14')").each(
	    		function(){
	    			grades3.push($(this).text());
	    		});
	});
}
if (table.indexOf('Q4') > -1){
	quarters = 4;
	rows.each(
	    function() {
	    	//for column 14 (quarter 3)
	    	$(this).find("td:eq('15')").each(
	    		function(){
	    			grades4.push($(this).text());
	    		});
	});
}

var theString = "";
if(quarters >= 1) theString += "<th id='gpa1'>" + getGpa(grades1) + "</th>";
if(quarters >= 2) theString += "<th id='gpa2'>" + getGpa(grades2) + "</th>";
if(quarters >= 3) theString += "<th id='gpa3'>" + getGpa(grades3) + "</th>";
if(quarters >= 4) theString += "<th id='gpa4'>" + getGpa(grades4) + "</th>";

$("tr:eq('2')").after("<tr><th class='right' colspan='12'>GPA (Unweighted out of 4.0): </th>" + theString + "</tr>");


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
		if(gpa === "A+" || gpa == "A"){gpa = 4.0}
	    else if(gpa === "A"){gpa = 3.67}
	    else if(gpa === "B+"){gpa = 3.33}
	    else if(gpa === "B"){gpa = 3.00}
	    else if(gpa === "B-"){gpa = 2.67}
	    else if(gpa === "C+"){gpa = 2.33}
	    else if(gpa === "C"){gpa = 2.00}
	    else if(gpa === "C-"){gpa = 1.67}
	    else if(gpa === "D+"){gpa = 1.33}
	    else if(gpa === "D"){gpa = 1.00}
	    else if(gpa === "D-"){gpa = 0.67}
	    else if(gpa === "F"){gpa = 0.00}
	    else {gpa = 0; nulls++;}
	    total+= +gpa;
		c++;
	}
	total /= (c-nulls);
	return total.toFixed(2);
}

var gradest1 = grades1.slice(0);
var gradest2 = grades2.slice(0);
var gradest3 = grades3.slice(0);
var gradest4 = grades4.slice(0);

$(".checkboxClass").change(function() {
	var id = $(this).attr('id');
  if ($(this).is(':checked')) {
  	grades1[id] = gradest1[id];
  	grades2[id] = gradest2[id];
  	grades3[id] = gradest3[id];
  	grades4[id] = gradest4[id];
  	$("#gpa1").text(getGpa(grades1));
  	$("#gpa2").text(getGpa(grades2));
  	$("#gpa3").text(getGpa(grades3));
  	$("#gpa4").text(getGpa(grades4));

  }
  else{
  	//set the original values to 0
  	grades1[id] = "nothing";
	grades2[id] = "nothing";
	grades3[id] = "nothing";
	grades4[id] = "nothing";

  	$("#gpa1").text(getGpa(grades1));
  	$("#gpa2").text(getGpa(grades2));
  	$("#gpa3").text(getGpa(grades3));
  	$("#gpa4").text(getGpa(grades4));

  }

});

});