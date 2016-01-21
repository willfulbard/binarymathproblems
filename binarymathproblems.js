$(document).ready(function() {
  var operators = ['+', '-', 'x'];
  var createProblem = function() {
    var operator = operators[Math.floor(Math.random() * operators.length)];
    var places = 5;
    var numberMax = Math.pow(2, places + 1);
    var number1 = Math.floor(Math.random() * numberMax);
    var number2 = Math.floor(Math.random() * numberMax);
    //Make it easy so that we dont get negatives or fractions
    if ((operator === '-') && number1 < number2) {
      var tmp = number1;
      number1 = number2;
      number2 = tmp;
    }

    var html = '<div class="problem" data-number1="'+number1+'" data-number2="'+number2+'" data-operator="'+operator+'">';
    html +=      '<div class="math">';
    html +=       number1.toString(2)+'<br />';
    html +=       operator+' '+number2.toString(2)+'<br />';
    html +=       Array(places+2).join('-');
    html +=      '</div>';
    html +=      '<input class="answer" />';
    html +=    '</div>';
    $('.problems').append(html);
  };

  var newProblems = function() {
    $('.problems').html('');
    for (var i = 0; i < 10; i++) {
      createProblem();
    }
  };
  newProblems();

});
