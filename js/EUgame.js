import euQuestions from "./questions.js"


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
const resetBtn = document.getElementById("resetBtn")
const changeCat = document.getElementById("changeCat")
const trackCont = document.getElementById("trackers")
const endMsgs = document.getElementById("endMsgs")
const endTitle = document.getElementById("endMsgTitle")
const endMsg = document.getElementById("endMsg")
const endScore = document.getElementById("endScore")


/*----------------------------- Event Listeners -----------------------------*/

choices.addEventListener('click', handleClick)
resetBtn.addEventListener('click', init)
changeCat.addEventListener('click', returnHome)

/*-------------------------------- Functions --------------------------------*/

function init(){
  questionCount = 0
  score = 0
  checkingAnswer = false
  availQuestions = [... euQuestions]
  endMsgs.style.display = "none"
  trackCont.style.display = "flex"
  container.style.display = "flex"
  updateBoards()
  newQuestion()
}

function newQuestion(){
  if (availQuestions === 0 || questionCount >= MAX_QUESTIONS){
    return gameOver()
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
}

function handleClick(evt){  
  const playerChoice = evt.target.id
  if( playerChoice == currentQuestion.correct){
    score = score + 20
    newQuestion()
  }else
  newQuestion()
  updateBoards()
}

function updateBoards(){
  scoreBoard.innerText = score
  qCounter.innerText = questionCount
}

function gameOver(){
  endMsgs.style.display = "block"
  trackCont.style.display = "none"
  container.style.display = "none"
  if (score === 100){
    return smartPerson()
  } else if (score >= 40 && score <= 80){
    return notSoSmartPerson()
  } else {
    return notForYou() 
  }
}

function smartPerson() {
  endTitle.innerText = `INSANE!`
  endScore.innerText = `${score} points`
  endMsg.innerText = `You're Basically an Encyclopedia!`
}

function notSoSmartPerson(){
  endTitle.innerText = `Good Job!`
  endScore.innerText = `${score} points`
  endMsg.innerText = `Next time you'll get 'em all!`
}

function notForYou(){
  endTitle.innerText = `Yikes. :/`
  endScore.innerText = `${score} points`
  endMsg.innerText = `Maybe sports aren't for you...`
}

function returnHome(){
  window.location.assign("home.html")
}

init()