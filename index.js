// 1. DISPLAY start page
// 2. START quiz upon clicking form's "start" button on initial page
// 3. DISPLAY question-answer form
// 4. SUBMIT form with single-selected radio button for each question-answer set
  // 4A. STORE submitted answer data in a variable after each question-answer form submission
  // 4B. INCREMENT progress on each new question-answer form page
  // 4C. INCREMENT score on each new question-answer form page
// 5. DISPLAY result view after each question-answer form submission
  // 5A. including updated progress and score-
  // 5B. include "Next Question" button 
// 6. REPEAT starting from step 3
  // 7. UNLESS it is the last question-answer set; go to step 8
// 8. DISPLAY final result page after each submitting final question-answer set
// 9. DISPLAY score on final result page with button that returns to step 1/3

// -----------------------------

// 1. DISPLAY start page
function initialRender() {
  $('.quiz-stats').hide();
  $('.question-answer').hide();
  $('.result-view').hide();
  $('.summary-view').hide();
  console.log('initialRender() ran');
}

// 2. START quiz upon clicking form's "start" button on initial page
function handleStartQuiz() {
  //hide start view; show question answer view 
  $('.start-view').on('click', '.start-button', function(event) {
      $('.quiz-stats').show();
      $('.question-answer').show();
      $('.start-view').hide();
  //display question-answer form, including question-number div and quiz-score div
  });
  console.log('handleStartQuiz() ran');
}

// 3. DISPLAY question-answer form
function questionAnswerForm() {
  $('.question-answer').html(newQuestion());
  console.log('questionAnswerForm() ran');
}

function newQuestion() {
  return `<div class="question-${questionIndex}">
  <div class="question-line">${STORE[questionIndex].question}</div>
  <form class="question-form">
  <fieldset class='questions-box'>
  <div class='answer-one'><label class="answerOne"><input type="radio" name="answer" value="${STORE[questionIndex].answers[0]}" required><span>${STORE[questionIndex].answers[0]}</span></label></div</div>
  <div class='answer-two'><label class="answerTwo"><input type="radio" name="answer" value="${STORE[questionIndex].answers[1]}" required><span>${STORE[questionIndex].answers[1]}</span></label></div>
  <div class='answer-three'><label class="answerThree"><input type="radio" name="answer" value="${STORE[questionIndex].answers[2]}" required><span>${STORE[questionIndex].answers[2]}</span></label></div>
  <div class='answer-four'><label class="answerFour"><input type="radio" name="answer" value="${STORE[questionIndex].answers[3]}" required><span>${STORE[questionIndex].answers[3]}</span></label></div>
  </fieldset>
  <div class='button-container'><button type="submit" class="submit-answer" role='button'><span>Submit</span></button></div>
  </form>
  </div>`
  console.log(`createQuestion() ran for questionIndex ${questionIndex} `);
}

var questionIndex = 0;

var quizScore = 0;

const STORE = [
    {
      question: 'Who said, "The unexamined life is not worth living" ?',
      answers: [
        'Plato',
        'Socrates',
        'Mozi',
        'Pythagoras',
        ],
      correct: 'Socrates'
    },
    {
      question: 'Who said, "I think therefore I am" ?',
      answers: [
        'René Descartes',
        'Ludwig Wittgenstein',
        'William Ockham',
        'Thomas Hobbes',
        ],
      correct: 'René Descartes'
    },
    {
      question: 'Who said, "The greatest happiness of the greatest number is the foundation of morals and legislation" ?',
      answers: [
        'Friedrich Nietzsche',
        'Martin Heidegger',
        'Jeremy Bentham',
        'G. W. F. Hegel',
        ],
      correct: 'Jeremy Bentham'
    },
    {
      question: 'Who said, "Liberty consists in doing what one desires" ?',
      answers: [
        'Seneca the Younger',
        'Albert Camus',
        'John Stuart Mill',
        'Immanuel Kant',
        ],
      correct: 'John Stuart Mill'
    },
    {
      question: 'Who said, "No man\'s knowledge here can go beyond his experience" ?',
      answers: [
        'John Locke',
        'Bertrand Russell',
        'William James',
        'Søren Kierkegaard',
        ],
      correct: 'John Locke'
    },
]

// 4. SUBMIT form with single-selected radio button for each question-answer set
  // 4A. STORE submitted answer data in a variable after each question-answer form submission
  // 4B. INCREMENT progress on each new question-answer form page
  // 4C. INCREMENT score on each new question-answer form page
// 5. DISPLAY result view after each question-answer form submission
  // 5A. including updated progress and score-
  // 5B. include "Next Question" button 

function handleSelectedAnswer () {
  $('.question-form').on('submit', function (event) {
    console.log("submit");
    event.preventDefault();
    const selectedAnswer = $('input:checked').val();
    const correctAnswer = STORE[questionIndex].correct;
    if (selectedAnswer === correctAnswer) {
      $('.question-answer').hide();
      $('.result-view').show();
      $('.result-message').html(correctResult());
      console.log('Correct Answer');
      incrementScore();
    } else {
      $('.question-answer').hide();
      $('.result-view').show();
      $('.result-message').html(wrongResult());
      console.log('Wrong Answer')
    }
  incrementQuestionIndex();
  console.log(`questionIndex incremented to '${questionIndex}'`)
  });
}

function correctResult() {
  return `Correct!`;
}

function wrongResult() {
  return `Wrong! The correct answer is "${STORE[questionIndex].correct}"`;
}

function incrementScore() {
  quizScore++;
  $('.score').text(quizScore);
  console.log(`${quizScore}`);
} 

function incrementQuestionIndex() {
  questionIndex++;
}

// 6. REPEAT starting from step 3
  // 7. UNLESS it is the last question-answer set; go to step 8

function handleNextQuestion() {
  $('.next-question').on('click', '.new-question', function (event) {
    $('.number').text(questionIndex+1)
    $('.result-view').hide();
    $('.question-answer').show();
    questionAnswerForm();
    if (questionIndex < 4) {
    handleSelectedAnswer ();
  } else {
    handleFinalResult();
  }
  })
}

// 8. DISPLAY final result page after each submitting final question-answer set
// 9. DISPLAY score on final result page with button that returns to step 1/3

function handleFinalResult() {
  $('.question-form').on('submit', function (event) {
    console.log("Final submission");
    event.preventDefault();
    const selectedAnswer = $('input:checked').val();
    const correctAnswer = STORE[questionIndex].correct;
    if (selectedAnswer === correctAnswer) {
      $('.question-answer').hide();
      $('.summary-view').show();
      $('.summary-view-message').html(correctFinalResult());
      console.log('Correct Answer');
      incrementScore();
      $('.score').text(quizScore);
      console.log(`${quizScore}`);
    } else {
      $('.question-answer').hide();
      $('.summary-view').show();
      $('.summary-view-message').html(wrongFinalResult());
      console.log('Wrong Answer');
    }
  incrementQuestionIndex();
  $('.number').text(questionIndex);
  console.log(`questionIndex incremented to '${questionIndex}'`);
  });
}

function correctFinalResult() {
  return `
  <div>Correct!</div>
  <div>Your final score: ${quizScore+1}</div>`;
}

function wrongFinalResult() {
  return `
  <div>Wrong! The correct answer is "${STORE[questionIndex].correct}"</div>
  <div>Your final score: ${quizScore}</div>`;
}

function handleRestartQuiz() {
  $('body').on('click', '.restart-quiz', function (event) {
    location.reload();
  });
}

function handleQuiz() {
  initialRender();
  handleStartQuiz();
  questionAnswerForm();
  handleSelectedAnswer();
  handleNextQuestion();
  handleRestartQuiz();
} 

$(handleQuiz)