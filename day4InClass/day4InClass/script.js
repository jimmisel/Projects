

//12/4/2014 doing fridays task
//Quiz Application
//Stretch Goals
//randomize the order of the questions
//randomize the order of the answers to each question
//more than one question type
//ability to add more questions
//drag and drop questions (use the jQueryUI library)

// C. R. U. D. = create read update delete

var myQuiz = [{
    question: "What is the keyword to set up a variable in javaScript?",
    answers: ['var','this','do','variable'],
    correctAnswer: "var"
}, {
    question: "How many ways to call a function have we covered?",
    answers: [1,2,3,4],
    correctAnswer: 4
}, {
    question: "what is used to add elements to an array?",
    answers: ['.splice()','.reverse()','.push()','.shift()'],
    correctAnswer:".push()"
}, {
    question: "Is javaScript one of the most used languages on the net?",
    answers: ['Yes', 'No'],
    correctAnswer:"Yes"
}, {
    question: "Is javaScript considered to be the jack of all trades master of none?",
    answers: ['Yes','No'],
    correctAnswer:"Yes"
}
    
];

//begining variables
var currentQuestion = 0;
var score = 0;
var askingQuestion = true;
// set up the function to display the questions
var askQuestions = function () {

    // all the dom gets
    var displayQuestion = document.getElementById('questions');
    var displaychoices = document.getElementById('choices');
    var showScore = document.getElementById('score');
    var submitBtn = document.getElementById('btn');
    //var for the different possible answers
    var choice = myQuiz[currentQuestion].answers;
    //var for the html
    var h = '';

    //loop to go through choice and set up the radio buttons
    for (var i = 0; i < choice.length; i++) {
        //set the buttons for the possible answers
        h += "<input type='radio' name='quiz" + currentQuestion + "' id='choice" + (i + 1) + "' value='" + choice[i] + "'>" + " <label for='choice" + (i + 1) + "'>" + choice[i] + "</label><br>";

        //display the question
      displayQuestion.innerHTML   =  "<p>"+(currentQuestion + 1) + ". " + myQuiz[currentQuestion].question+"</p> ";

        //display the choices
      displaychoices.innerHTML = h;

    }
    // if the current question is the first one then the score is 0 and the button is telling you to submit
    if (currentQuestion === 0) {
        showScore.innerHTML = "score 0 out of "+myQuiz.length;
        submitBtn.textContent = "Submit Answer";
    }
    //sets the value of the progress bar at the top dont go to 100% so I set it to 100% in the end
    var pBar = document.getElementById('progress');
    pBar.style.width = Math.floor((this.currentQuestion) / 5 * 100) + '%';

}
// time to see if you were right
var checkAnswer = function () {
    //dom gets
    var submitBtn = document.getElementById('btn');
    var showScore = document.getElementById('score');
    //if the askingQuestion var is set to true set the button to next question and set the var to false
    if (askingQuestion) {
        submitBtn.textContent = "Next Question";
        askingQuestion = false;

        // determine which radio button they clicked
        var user;
        
        var radio = document.getElementsByName("quiz" + currentQuestion);
        for (var i = 0; i < radio.length; i++) {
            // if this radio button is checked
            if (radio[i].checked) {
                user = radio[i].value;
              
            }

        }

        if (user == myQuiz[currentQuestion].correctAnswer) {
            score++;
            showScore.innerHTML = "<p>Score: " + score + " out of " + myQuiz.length + "</p>";
            
        }
    } else {
        // move to next question
        
        askingQuestion = true;
        // change button text back to "Submit Answer"
        submitBtn.textContent = "Submit Answer";
        // if we're not on last question, increase question number
        if (currentQuestion < myQuiz.length - 1) {
            currentQuestion++;
            askQuestions();
        } else {
            //ya the quiz is over
            showFinalResults();
            //dom gets
            var displaychoices = document.getElementById('choices');
            var showScore = document.getElementById('score');
            //clear the info from the other two divs i used
            showScore.innerHTML = "";
            displaychoices.innerHTML = "";
        }
    }
    
}
var showFinalResults = function () {
    // more dom gets there has to be a better way to do this
    var displayQuestion = document.getElementById('questions');
    var submitBtn = document.getElementById('btn');
    //shows the score on the page after figuring it out
    displayQuestion.innerHTML = "<h2>Great your done</h2>" +
      "<h2>" + score + " out of " + myQuiz.length + " questions, " +
      Math.round(score / myQuiz.length * 100) + "%<h2>";
    // clearing the button since were done
    submitBtn.setAttribute('class', "hidden");
    ////setting the progress bar to 100%
    var pBar = document.getElementById('progress');
    pBar.style.width =  '100%';
}

askQuestions();









