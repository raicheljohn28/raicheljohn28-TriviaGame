window.onload = function () {

var triviaQuestions = [{
    question: "What is Moana's pet chicken name?",
    answerList: ["Hei Hei", "Nai Nai", "Bobo"],
    answer: 0
}, {
    question: "What is Moana's Grandmother's spirit animal?",
    answerList: ["Hawk", "Manta Ray", "Eagle"],
    answer: 1

}, {
    question: "What is the island that Moana lives on called?",
    answerList: ["Tamontui", "Motunui", "Montiuu", "Montao"],
    answer: 1
}, {
    question: "What does Moana's name mean?",
    answerList: ["God's of the sky", "Legend", "Waves", "Ocean"],
    answer: 3

}, {
    question: "What did Maui shape shift in to get away from the goddess?",
    answerList: ["Bat", "Dragonfly", "Eagle", "Hawk"],
    answer: 3
}, {
    question: "When Moana and her village left the island, what did she place on top of the tower of cheifs? ( The pile of stones)",
    answerList: ["A piece of Coral", "A shark tooth", "A Cobblestone slab", "A Shell"],
    answer: 3
}, {
    question: "When Moana was a toddler, which baby animal she helped cross the beach?",
    answerList: ["Bird", "Crab", "Sea Turtle", "Seal"],
    answer: 2
}];

var gifArray = ['tumblr', 'gra', 'moana', 'moana1', 'maui', 'Moana_Dancing', 'Moana_Gif_2'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelected;
var messages = {
    correct: "Great work, go ahead!!",
    incorrect: "OOPS! You are wrong",
    endTime: "Time Up!!!",
    finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function () {
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswer').empty();
    $('#incorrectAnswer').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
    $('#message').empty();
    $('#correctAnswer').empty();
    $('#rightAnswer').empty();
    $('#gif').empty();
    answered = true;

    //sets up new questions & answerList
    $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({ 'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    //clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click', function () {
        userSelected = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); //Clears question page
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#gif').html('<img src = "assets/images/' + gifArray[currentQuestion] + '.gif" width = "300px" height = "200px">');
    //checks to see correct, incorrect, or unanswered
    if ((userSelected == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if ((userSelected != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#rightAnswer').html('The correct answer was: ' + rightAnswerText);
    }
    else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#rightAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;

    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 3000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 3000);
    }
}


function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#rightAnswer').empty();
    $('#gif').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswer').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswer').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over');
}
}