$(document).ready(function () {
var table = $("#quickLookup").html();


var grades1 = [];
var grades2 = [];
var grades3 = [];
var grades4 = [];

var quarters = 0;



//for each row

if (!(table.indexOf('q1') > -1)){
	quarters = 1;
	var rows = $("#quickLookup").find("tr[id^='ccid']").each(
	    function() {
	    	//for column 11 (course column)
	    	$(this).find("td:eq('11')").each(
	    		function(c){
	    			$(this).prepend("<input type='checkbox' id='" + c + "'>");
	    		});
	    	$(this).find("td:eq('13')").each(
	    		function(){
	    			grades1.push($(this).text());
	    		});
	});
}

if (!(table.indexOf('q2') > -1)){
	quarters = 2;
	rows.each(
	    function() {
	    	//for column 14 (quarter 2)
	    	$(this).find("td:eq('15')").each(
	    		function(){
	    			grades2.push($(this).text());
	    		});
	});
}
if (!(table.indexOf('q3') > -1)){
	quarters = 3;
	rows.each(
	    function() {
	    	//for column 16 (quarter 3)
	    	$(this).find("td:eq('15')").each(
	    		function(){
	    			grades3.push($(this).text());
	    		});
	});
}
if (!(table.indexOf('q4') > -1)){
	quarters = 4;
	rows.each(
	    function() {
	    	//for column 16 (quarter 3)
	    	$(this).find("td:eq('16')").each(
	    		function(){
	    			grades4.push($(this).text());
	    		});
	});
}
console.log(getGpa(grades1) + getGpa(grades2) + getGpa(grades3) + getGpa(grades4));

var theString = "";
if(quarters == 1) theString += "<th>" + getGpa(grades1) + "</th>";
if(quarters == 2) theString += "<th>" + getGpa(grades2) + "</th>";
if(quarters == 3) theString += "<th>" + getGpa(grades3) + "</th>";
if(quarters == 4) theString += "<th>" + getGpa(grades4) + "</th>";

$("tr:eq('2')").after("<tr><th class='right' colspan='12'>GPA (Unweighted out of 4.0): </th><th>" + theString + "</tr>");


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



});