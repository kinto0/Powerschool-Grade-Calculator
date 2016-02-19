$(document).ready(function () {


// We're going to do a lot of work, so let's get table in a variable
var table = $('#assignmentScores table');
// Which column is the score in? Find it here
var score_column = table.find('th:contains("Score")').index();
var cat_column = table.find('th:contains("Category")').index();
// Set up a regular expression for testing that the column contains something like '30/30'
var regex = /(\d+\.?\d*)\/(\d+)/;
// initialize the numerator and denomenator
var num = 0,
    den = 0;
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
var c = 0;
table.find('tr').each(
    function() {
        // get the value from the column that is the "Score" column
        var score = $(this).find('td:eq(' + score_column + ')').html();
        // Run the regular expression to get the matches
        var matches = regex.exec(score);
        // If there are matches, add them to numerator and denomenator
        if ($.isArray(matches) && typeof matches[2] != 'undefined') {
            num += +matches[1];
            scoreArrayNum.push(matches[1]);
            den += +matches[2];
            scoreArrayDen.push(matches[2]);
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
    });
//finish off table
wTable += "<tr><td><button type='button' id='button'>Calculate</button></td><td>Total Score: " + wScore + "</td></tr></tbody></table>";
// Calculate the percent - but only if we actually have a numerator / denomenator
percent = (num && den) ? (num / den) * 100 : 0;
// And, append the values to the table
//table.append('<tr><td colspan="' + score_column + '" style="text-align:right;">Total:</td><td>' + percent.toFixed(2) + '%</td></tr>');
$("td:eq(3)").append("(" + percent.toFixed(2) + "%)");


//add table to weight grades
$('#weight-box').append(wTable);
//remove first, because it's undefined
$('#weight-box tr:eq(1)').remove();

$('#wTable').hide();

$("#showWeight").change(function() {
    if ($(this).is(':checked')) {
        $('#wTable').show(300);
    } else {
        $('#wTable').hide(300);
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
    //cat NUMBER NUMERATOR fuck me                                                                                                      
    var catNumNum = [0, 0, 0, 0];
    //cat number denominator kill me
    var catNumDen = [0, 0, 0, 0];

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
	var c = 0;
    $("#weight-box input[type=text]").each(function() {
    	catNumNum[c]*=this.value;
    	catNumDen[c]*=this.value;
    	c++;
    	console.log(catNumNum);
    	console.log(catNumDen);
    });
    var totalNum = 0;
    var totalDen = 0;

	$.each(catNumNum,function() {
    totalNum += this;
	});
	$.each(catNumDen,function() {
    totalDen += this;
	});

	wScore = (((totalNum/totalDen)*100).toFixed(2) + "%");
	console.log(wScore);

	$('td:contains("Total Score: ")').html("Total Score: " + wScore);
	$("td:eq(3)").append("(" + wScore.toFixed(2) + "% weighted)");
});



});
//Thank you to cale_b on stackoverflow for helping initially