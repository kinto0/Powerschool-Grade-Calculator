
$(document).ready(function() {
	var arr = [];
	var numerator = 0;
	var denominator = 0;
	i = 0;

	//add value of all elements in assignmentScores that are centered to arr (grades are the only centered thing)
	$('#assignmentScores').each(function()
		arr[i++] = $(this).attr('td [align="center"]');
	);

	//for every item in the array, add up numerators and denominators
	for each(var item in numerator){
		numerator += arr[item].substring(0, arr[item].indexOf("/")-1);
		denominator += arr[item].substring(arr[item].indexOf("/")+1, arr[item].length);
	}

	$('#assignmentScores h1').append(numerator/denominator);

});

