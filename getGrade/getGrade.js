$(document).ready(function () {


var table = $('#assignmentScores table');
var rowCount = $('#assignmentScores tr').length;
var newRowNum = 0;
// Which column is the score in? Find it here
var score_column = table.find('th:contains("Score")').index();
var cat_column = table.find('th:contains("Category")').index();
// Set up a regular expression for testing that the column contains something like '30/30'
var regex = /(\d+\.?\d*)\/(\d+)/;

//initialize starting score
var wScore = 0;
//initialize category table
var wTable = "<table id='wTable' border='0' cellpadding='0' cellspacing='0' align='center' width='99%'> <tbody> <tr> <th>Category</th> <th>Percent (Do not write % sign)</th> </tr>";

//parrallel arrays for category and score
var catArray = [];
var scoreArrayNum = [];
var scoreArrayDen = [];

//add checkbox for weighted scores
$("#assignmentScores").after("<div class='box-round' id='weight-box'><h2><input type='checkbox' id='showWeight' name='weighted' value='weighted'>Weight Grades</input></h2></div>");

//go through the table looking for scores and categories
function getGrades(){
	// initialize the numerator and denomenator
	var num = 0,
    den = 0;

	var c = 1;
	var currentRow = 0;
	table.find('tr').each(
    function() {
        // get the value from the column that is the "Score" column
        var score;
        if(currentRow >= rowCount){
        	score = $("#text" + (currentRow-rowCount)).val();
        }
        else{
        	score = $(this).find('td:eq(' + score_column + ')').html();
        }
        // Run the regular expression to get the matches
        var matches = regex.exec(score);
        // If there are matches, add them to numerator and denomenator
        if ($.isArray(matches) && typeof matches[2] != 'undefined') {
            num += +matches[1];
            scoreArrayNum.push(matches[1]);
            den += +matches[2];
            scoreArrayDen.push(matches[2]);
            console.log("Match 1: " + matches[1] + "; Match 2: " + matches[2]);
        }
        
        //category stuff
        //gets value from category column
        var category = $(this).find('td:eq(' + cat_column + ')').html();
        if (c > 0){
            catArray.push(category);
        }
        //if table already includes that category trash it and the != undefined doesn't work for some reason
        if (!(wTable.indexOf(category) > -1 && category != 'undefined')) {
        	if(c%2==0){
        		wTable += ("<tr class='oddRow'><td>" + category + "</td><td><input type='text' id='" + c + "''></td></tr>");
        	}
        	else{
        		wTable += ("<tr><td>" + category + "</td><td><input type='text' id='" + c + "''></td></tr>");
        	}
        	c++;
        }

        currentRow++;
    });
	//finish off table
	wTable += "<tr><td><button type='button' id='button'>Calculate</button></td><td>Total Score: " + wScore + "</td></tr></tbody></table>";
	// Calculate the percent - but only if we actually have a numerator / denomenator
	console.log("Numerator: " + num + " Denominator:  " + den);
	percent = (num && den) ? (num / den) * 100 : 0;
	// And, append the values to the table
	if($("#final").length > 0){
		$("#final").html("(" + parseFloat(percent).toFixed(2) + "%)")
	}
	else{
		$("td:eq(3)").append("<div id='final'>(" + parseFloat(percent).toFixed(2) + "%)</div>");
	}
}

function initWeighting(){
	//add table to weight grades
	$('#weight-box').append(wTable);
	//remove first, because it's undefined
	$('#weight-box tr:eq(1)').remove();
	
	$('#wTable').hide();
	
	$("#showWeight").change(function() {
	    if ($(this).is(':checked')) {
	        $('#wTable').show(300);
			$("td:eq(3)").html("(" + parseFloat(wScore).toFixed(2) + "% weighted)");
	
	    } else {
	        $('#wTable').hide(300);
	        $('#weightedGrade').hide(300);
			$("td:eq(3)").html("(" + parseFloat(percent).toFixed(2) + "%)");
	    }
	});

	//handle "calculate" button clicks
	$('#button').click(function() {
	    //the array that will hold the different unqiue categories                                                   merged individual category array
	    var lessCat = [];
	    //the parallel array that will hold the number of each category at the same index    # of elements in full array
	    var catNum = [];
	
	        //creates lessCat array by excluding catArray values that are used multiple times
	    for (j = 0; j < catArray.length; j++) {
	        if($.inArray(catArray[j], lessCat) == -1){
	            lessCat.push(catArray[j]);
	        }
	    }
	    //cat NUMBER NUMERATOR                                                                                                      
	    var catNumNum = [];
	    //cat number denominator
	    var catNumDen = [];
	
	
	    //go through every element in the array of categories
	    for(j = 0; j < catArray.length; j++){
	        //for each element, check if it's equal to any from the rubric, it will assign a number based on lessCat
	        for(k = 0; k < lessCat.length; k++){
	            //Assign an integer to the catNum array for each value of catArray corresponding to the element of lessCat
	            if(catArray[j] === lessCat[k]){
	                catNum[j]=k;
	            }
	        }
	    }
	
	    for(c = 0; c < lessCat.length; c++){
	    	catNumNum.push(0);
	    	catNumDen.push(0);
	    }
	
	    //go through every category
	    for(j = 0; j < catArray.length; j++){
	    	//if the category is equal to one of the categories, we will add the value of the category to the num/den variables
	    	for(k = 0; k < lessCat.length; k++){
	    		if(typeof scoreArrayNum[j] !== 'undefined' &&  catArray[j] === lessCat[catNum[k]]){
	    			catNumNum[k] += +scoreArrayNum[j];
	    			catNumDen[k] += +scoreArrayDen[j];
	    		}
	    	}
	    }
	
	    //for each input box, we will multiply numerator and denominator of each category by this
	    $("#weight-box input[type=text]").each(function(c) {
	    	catNumNum[c]*=this.value;
	    	catNumDen[c]*=this.value;
	    	c++;
	    });
	
	
	    var totalNum = 0;
	    var totalDen = 0;
	
	    //add up all numerators
		$.each(catNumNum,function() {
	    totalNum += this;
		});
		//add up all denominators
		$.each(catNumDen,function() {
	    totalDen += this;
		});
	
		wScore = (((totalNum/totalDen)*100).toFixed(2) + "%");
	
		$('td:contains("Total Score: ")').html("Total Score: " + wScore);
		$('td:eq(3)').html("(" + parseFloat(wScore).toFixed(2) + "% weighted)");
	});
}

function initAddGrade(){
	table.append("<button type='button' id='newGrade'>Add Grade</button>");
	table.append("<button type='button' id='recalculate'>Recalculate Grades</button>");
	$("#newGrade").click(function(){
		if((rowCount + newRowNum) % 2 == 0){
			table.append("<tr id='newRow" + newRowNum + "' class><td></td><td></td><td></td><td></td><td align='center'><input type='text' id='text" + newRowNum + "'></td><td width='19'></td><td align='center'><!--<button type='button' id='remove" + newRowNum + "'>X</button>--><td width='19'></td><td width='19'></td></tr>");
		}
		else{
			table.append("<tr id='newRow" + newRowNum + "' class ='oddRow'><td></td><td></td><td></td><td></td><td align='center'><input type='text' id='text" + newRowNum + "'></td><td width='19'></td><td align='center'><!--<button type='button' id='remove" + newRowNum + "'>X</button>--></td><td width='19'></td><td width='19'></td><td width='19'></td><td width='19'></td><td width='19'></td></tr>");
		}
		$("#text" + newRowNum).focus();
		//remove button doesn't work for some reason: even if it did work it would mess up colors of the oddrows so im taking it out
		/*$("#remove" + newRowNum).click(function(){
			$("#newRow" + newRowNum).hide();
		});*/
		newRowNum++;
	});
	$("#recalculate").click(function(){
		getGrades();
	});

}

getGrades();
initWeighting();
initAddGrade();

});
//Thank you to cale_b on stackoverflow for helping initially