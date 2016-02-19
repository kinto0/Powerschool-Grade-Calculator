$(document).ready(function () {
var table = $("#grid");
var q1 = table.find('th:contains("Q1")').index();
var q2 = table.find('th:contains("Q2")').index();
var q3 = table.find('th:contains("Q3")').index();
var q4 = table.find('th:contains("Q4")').index();

var c = 0;
var total = 0;

$("#quickLookup").find('a').each(function(){
	console.log($(this).find("td:eq('q1') a:contains('scores.html')").contains());
});

/*table.find('tr').each(
    function() {

    	var gpa = $( 'a[href*="scores.html"]' ).html;
    	console.log(gpa);
    	console.log("test");
    	if(gpa === "A+" || gpa == "A"){gpa = 4.0}
    	if(gpa === "A"){gpa = 3.67}
    	if(gpa === "B+"){gpa = 3.33}
    	if(gpa === "B"){gpa = 3.00}
    	if(gpa === "B-"){gpa = 2.67}
    	if(gpa === "C+"){gpa = 2.33}
    	if(gpa === "C"){gpa = 2.00}
    	if(gpa === "C-"){gpa = 1.67}
    	if(gpa === "D+"){gpa = 1.33}
    	if(gpa === "D"){gpa = 1.00}
    	if(gpa === "D-"){gpa = 0.67}
    	if(gpa === "F"){gpa = 0.00}
    	total+= +gpa;
    	c++;
});*/

total = total/c;
console.log(total);


});