var questions = [
   {
      question: "Which team is more succesful in Europe?",
      answers:[
         {text: "Liverpool", correct: false},
         {text: "Real madrid", correct: true},
         {text: "PSG", correct: false},
         {text: "Juventus", correct: false},
      ]

   },
   {
      question: "How many Champions league does Liverpool have?",
      answers:[
         {text: "6", correct: true},
         {text: "14", correct: false},
         {text: "2", correct: false},
         {text: "1", correct: false},
      ]
   },
   {
      question: "Which country have the most world cups?",
      answers:[
         {text: "Nigeria", correct: false},
         {text: "Brazil", correct: true},
         {text: "Spain", correct: false},
         {text: "Japan", correct: false},
      ]
   },
   {
      question: "Player with the most ballon d'or is ....?",
      answers:[
         {text: "Sadio Mane", correct: false},
         {text: "Harry Kane", correct: false},
         {text: "Cristiano Ronaldo", correct: false},
         {text: "Lionel Messi", correct: true},
      ]
   },
   {
   question: "Which player have hit woodwork 4 times in Epl match?",
   answers:[
      {text: "Son Heung-min", correct: false},
      {text: "Darwin Nunez", correct: true},
      {text: "Erling Haaland", correct: false},
      {text: "Eric Dier", correct: false},
   ]
  },
  {
  question: "Which Man city player score the title goal decider in 2012?",
  answers:[
     {text: "Sergio Aguero", correct: true},
     {text: "Mario Balotelli", correct: false},
     {text: "Joleon Lescott", correct: false},
     {text: "James Milner", correct: false},
  ]
 },
 {
   question: "Cristiano Ronaldo played .... senior games for Sporting?",
   answers:[
      {text: "800", correct: false},
      {text: "29", correct: false},
      {text: "1200", correct: false},
      {text: "31", correct: true},
   ]
 }
];

var questionElement = document.getElementById("question");
var answerButton = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
   currentQuestionIndex = 0;
   score = 0;
   nextButton.innerHTML = "Next";
   showQuestion();
}

function showQuestion(){
   resetState();
   let currentQuestion = questions[currentQuestionIndex];
   let questionNo = currentQuestionIndex + 1;
   questionElement.innerHTML =questionNo + "." + currentQuestion.question;

   currentQuestion.answers.forEach(answer =>{
      var button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButton.appendChild(button);
      if(answer.correct){
         button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
   });

}

function resetState() {
   nextButton.style.display = "none";
   while(answerButton.firstChild){
      answerButton.removeChild(answerButton.firstChild);
   }
}
function selectAnswer(e) {
   var selectedBtn = e.target;
   var isCorrect = selectedBtn.dataset.correct === "true";
   if(isCorrect){
      selectedBtn.classList.add("correct");
      score++
   }else{
      selectedBtn.classList.add("incorrect");
   }
   Array.from(answerButton.children).forEach(button =>{
      if(button.dataset.correct === "true"){
         button.classList.add("correct");
      }
      button.disabled = true;
   });
   nextButton.style.display = "block";
}

function showScore() {
   resetState();
   questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
   nextButton.innerHTML = "Wanna try?";
   nextButton.style.display = "block";
};

function handleNextButton() {
   currentQuestionIndex++;
   if(currentQuestionIndex < questions.length){
      showQuestion();
   }else{
      showScore();
   }
};

nextButton.addEventListener("click", ()=>{
   if(currentQuestionIndex < questions.length){
      handleNextButton();
   }else{
      startQuiz();
   }
});
startQuiz();