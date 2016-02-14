

// We're going to do a lot of work, so let's get table in a variable
var table = $('#assignmentScores table');
// Which column is the score in? Find it here
var score_column = table.find('th:contains("Score")').index();
// Set up a regular expression for testing that the column contains something like '30/30'
var regex = /(\d+\.?\d*)\/(\d+)/;
// initialize the numerator and denomenator
var num = 0, den = 0;
// loop over all the table rows
table.find('tr').each(
function() {
  // get the value from the column that is the "Score" column
  var score = $(this).find('td:eq(' + score_column + ')').html();
  // Run the regular expression to get the matches
  var matches = regex.exec(score);
  // If there are matches, add them to numerator and denomenator
  if ($.isArray(matches) && typeof matches[2] != 'undefined') {
    num+= +matches[1];
    den+= +matches[2];
  }
});

// Calculate the percent - but only if we actually have a numerator / denomenator
percent = (num && den) ? (num / den) * 100 : 0;
// And, for fun, append the values to the table
table.append('<tr><td colspan="' + score_column + '" style="text-align:right;">Total:</td><td>' + percent.toFixed(1) + '%</td></tr>');

//Thank you to cale_b on stackoverflow for helping (doing the whole thing)