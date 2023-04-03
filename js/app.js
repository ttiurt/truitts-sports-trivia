import naQuestions from "./naq.js"


/*-------------------------------- Constants --------------------------------*/

const MAX_QUESTIONS = 5

/*---------------------------- Variables (state) ----------------------------*/

let currentQuestion, availQuestions, score, questionCount, nextQuestion

/*------------------------ Cached Element References ------------------------*/

const quiz = document.getElementById("quiz")
const container = document.getElementById("qContainer")
const qImage = document.getElementById("image")
const question = document.getElementById("question")
const choices = document.getElementById("choices")
const choiceA = document.getElementById("A")
const choiceB = document.getElementById("B")
const choiceC = document.getElementById("C")
const choiceD = document.getElementById("D")

/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/

function init(){
  questionCount = 0
  score = 0
  newQuestion()
}

function newQuestion(){
  questionCount++
  const questionIdx = Math.floor(Math.random() * naQuestions.length)
  currentQuestion = naQuestions[questionIdx]
  question.innerText = currentQuestion.question
  choiceA.innerText = currentQuestion.choiceA
  choiceB.innerText = currentQuestion.choiceB
  choiceC.innerText = currentQuestion.choiceC
  choiceD.innerText = currentQuestion.choiceD
}

function checkAnswer(){
  
}

console.log(naQuestions)



init()