import naQuestions from "./questions.js"


/*-------------------------------- Constants --------------------------------*/

const MAX_QUESTIONS = 5

/*---------------------------- Variables (state) ----------------------------*/

let currentQuestion, availQuestions, score, questionCount, checkingAnswer

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
const scoreBoard = document.getElementById("score")
const qCounter = document.getElementById("qcount")


/*----------------------------- Event Listeners -----------------------------*/

choices.addEventListener('click', handleClick)

/*-------------------------------- Functions --------------------------------*/

function init(){
  questionCount = 0
  score = 0
  checkingAnswer = false
  availQuestions = [... naQuestions]
  newQuestion()
}

function newQuestion(){
  if (availQuestions === 0 || questionCount >= MAX_QUESTIONS){
    return window.location.assign('/endpage.html')
  }
  questionCount++
  const questionIdx = Math.floor(Math.random() * availQuestions.length)
  currentQuestion = availQuestions[questionIdx]
  question.innerText = currentQuestion.question
  choiceA.innerText = currentQuestion.choiceA
  choiceB.innerText = currentQuestion.choiceB
  choiceC.innerText = currentQuestion.choiceC
  choiceD.innerText = currentQuestion.choiceD
  checkingAnswer = true
  availQuestions.splice(questionIdx, 1)
  console.log(availQuestions)
}

function handleClick(evt){  
  const playerChoice = evt.target.id
  if( playerChoice == currentQuestion.correct){
    score = score + 20
    newQuestion()
    console.log("CORRECT!")
  }else
  newQuestion()
  updateBoards()
  console.log(score)
}

function updateBoards(){
  scoreBoard.innerText = score
  qCounter.innerText = questionCount
}




init()