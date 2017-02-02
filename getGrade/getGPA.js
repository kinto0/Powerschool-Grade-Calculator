$(document).ready(function () {
var table = $("#quickLookup").html();


var grades1 = [];
var grades2 = [];
var grades3 = [];
var grades4 = [];
var grades5 = [];
var grades6 = [];
var grades7 = [];

var quarters = 0;



//for each row
var rows = $("#quickLookup").find("tr[id^='ccid']");



if (table.indexOf('Q1') > -1)quarters++;
if (table.indexOf('Q2') > -1)quarters++;
if (table.indexOf('Q3') > -1)quarters++;
if (table.indexOf('Q4') > -1)quarters++;
if (table.indexOf('E1') > -1)quarters++;
if (table.indexOf('E2') > -1)quarters++;
if (table.indexOf('Y1') > -1)quarters++;



//for each row
rows.each(
    function(c) {
    	//for column 11 (course column)
    	$(this).find("td:eq('11')").each(
    		function(){
    			//add a checkbox next to class
    			$(this).prepend("<input class='checkboxClass' type='checkbox' id='" + c + "' checked='checked'>");
    		});
    	$(this).find("td:eq('12')").each(
    		function(){
    			//and send grade to grade1 array
    			grades1.push($(this).text());
    		});
});

table_location = 13;
for(var i=0; i<quarters; i++){
	rows.each(
    function() {
    	//for column 12 (quarter 2)
    	$(this).find("td:eq('"+table_location+"')").each(
    		function(){
    			switch(table_location){
    				case 13:
    					grades2.push($(this).text());
    					break;
    				case 14:
    					grades3.push($(this).text());
    					break;
    				case 15:
    					grades4.push($(this).text());
    					break;
    				case 16:
    					grades5.push($(this).text());
    					break;
    				case 17:
    					grades6.push($(this).text());
    					break;
    				case 18:
    					grades7.push($(this).text());
    					break;

    			}
    		});
	});
	table_location++;
}



function getGpa(gradeArray){
	if(gradeArray == 1){
		gradeArray = grades1;
	}
	else if(gradeArray == 2){
		gradeArray = grades2;
	}
	else if(gradeArray == 3){
		gradeArray = grades3;
	}
	else if(gradeArray == 4) {
		gradeArray = grades4;
	}
	else if(gradeArray == 5) {
		gradeArray = grades5;
	}
	else if(gradeArray == 6) {
		gradeArray = grades6;
	}	
	else if(gradeArray == 7) {
		gradeArray = grades7;
	}

	if(gradeArray[gradeArray.length-1] < 0){
		 return 0;
	}
	var total = 0;
	var c = 0;
	var nulls = 0;
	
	//for each checkbox, check if checked and if it isn't then remove value from array
	
	while (c < gradeArray.length){
		var gpa = gradeArray[c];
		if(gpa == undefined){
			break;
		}
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

var theString = "";

if(quarters >= 1){
	theString += "<th id='gpa1'>" + getGpa(1) + "</th>";
} 
if(quarters >= 2){
	theString += "<th id='gpa2'>" + getGpa(2) + "</th>";
} 
if(quarters >= 3){
	theString += "<th id='gpa3'>" + getGpa(3) + "</th>";
} 
if(quarters >= 4){
	theString += "<th id='gpa4'>" + getGpa(4) + "</th>";
} 
if(quarters >= 5){
	theString += "<th id='gpa5'>" + getGpa(4) + "</th>";
}
if(quarters >= 6){
	theString += "<th id='gpa6'>" + getGpa(4) + "</th>";
}
if(quarters >= 7){
	theString += "<th id='gpa7'>" + getGpa(4) + "</th>";
}
$("tr:eq('2')").after("<tr><th id='average' class='right' colspan='12'>Unweighted GPA (Average: " + getAverage() + ")</th>" + theString + "</tr>");


var gradest1 = grades1.slice(0);
var gradest2 = grades2.slice(0);
var gradest3 = grades3.slice(0);
var gradest4 = grades4.slice(0);
var gradest5 = grades5.slice(0);
var gradest6 = grades6.slice(0);
var gradest7 = grades7.slice(0);


$(".checkboxClass").change(function() {
	var id = $(this).attr('id');
  if ($(this).is(':checked')) {
  	grades1[id] = gradest1[id];
  	grades2[id] = gradest2[id];
  	grades3[id] = gradest3[id];
  	grades4[id] = gradest4[id];
	grades5[id] = gradest5[id];
  	grades6[id] = gradest6[id];
  	grades7[id] = gradest7[id];

  	$("#gpa1").text(getGpa(1));
  	$("#gpa2").text(getGpa(2));
  	$("#gpa3").text(getGpa(3));
  	$("#gpa4").text(getGpa(4));
  	$("#gpa5").text(getGpa(4));
  	$("#gpa6").text(getGpa(4));
  	$("#gpa7").text(getGpa(4));
  	$("#average").text("Unweighted GPA (Average: " + getAverage() + ")");


  }
  else{
  	//set the original values to 0
  	grades1[id] = "nothing";
	grades2[id] = "nothing";
	grades3[id] = "nothing";
	grades4[id] = "nothing";
	grades5[id] = "nothing";
	grades6[id] = "nothing";
	grades7[id] = "nothing";

  	$("#gpa1").text(getGpa(1));
  	$("#gpa2").text(getGpa(2));
  	$("#gpa3").text(getGpa(3));
  	$("#gpa4").text(getGpa(4));
  	$("#gpa5").text(getGpa(5));
  	$("#gpa6").text(getGpa(6));
  	$("#gpa7").text(getGpa(7));
  	$("#average").text("Unweighted GPA (Average: " + getAverage() + ")");


  }

});



function getAverage(){
	var averageNum = 0;
	var matches = 0;
	var count = 1;

	while(count < 5){
		if($("#gpa"+count).text() != "NaN"){

			averageNum += +$("#gpa"+count).text();
			matches++;
		}
		count++;
	}
	return (averageNum/matches).toFixed(2);
}

});
