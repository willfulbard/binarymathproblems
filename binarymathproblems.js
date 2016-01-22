$(document).ready(function() {
  var operators = ['+', '-', 'x'];
  var operations = {};
  operations['+'] = function(number1, number2) {
    return number1 + number2;
  }
  operations['-'] = function(number1, number2) {
    return number1 - number2;
  }
  operations['x'] = function(number1, number2) {
    return number1 * number2;
  }
  var createProblem = function() {
    var operator = operators[Math.floor(Math.random() * operators.length)];
    var places = +$('.problem-places input').val();
    var numberMax = Math.pow(2, places) - 1;
    var number1 = Math.floor(Math.random() * numberMax) + 1;
    var number2 = Math.floor(Math.random() * numberMax) + 1;
    var longestNumber = Math.max(number1.toString(2).length, number2.toString(2).length);
    //Make it easy so that we dont get negatives or fractions
    if ((operator === '-') && number1 < number2) {
      var tmp = number1;
      number1 = number2;
      number2 = tmp;
    }

    var html = '<div class="problem" data-number1="'+number1+'" data-number2="'+number2+'" data-operator="'+operator+'">';
    html +=      '<pre class="math">';
    html +=       number1.toString(2)+'<br />';
    html +=       operator;
    html +=       String(Array(places+3).join(" ")+number2.toString(2)).slice((longestNumber+1)*-1)+'<br />';
    html +=      '</pre>';
    html +=      '<input class="answer" />';
    html +=      '<div class="correctStatement"></div>';
    html +=    '</div>';
    $('.problems').append(html);
  };

  var newProblems = function() {
    $('.problems').html('');
    for (var i = 0; i < +$('.problem-count input').val(); i++) {
      createProblem();
    }
    $('.problem input').on('blur', checkAnswer);
    $('.problem').find('.correct').hide();
  };

  var checkAnswer = function() {
    var problem = $(this).closest('.problem');
    var answer = problem.find('.answer').val();
    if (answer === '') {
      problem.find('.correctStatement').hide();
      problem.removeClass('incorrect');
      problem.removeClass('correct');
      return;
    }
    var number1 = problem.data('number1'); 
    var number2 = problem.data('number2'); 
    var operator = problem.data('operator'); 
    var result = '';
    if (operations[operator](number1, number2) === parseInt(answer, 2)) {
      problem.find('.correctStatement').html('Correct!');
      problem.find('.correctStatement').slideDown('slow');
      problem.removeClass('incorrect');
      problem.addClass('correct');
    } else {
      problem.find('.correctStatement').html('Try again :-(');
      problem.find('.correctStatement').slideDown('slow');
      problem.addClass('incorrect');
      problem.removeClass('correct');
    }
  }

  $('.show-more').on('click', function () {
    newProblems();
  });

  newProblems();

});
