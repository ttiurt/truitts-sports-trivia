import apacQuestions from "./APACquestions.js"


/*-------------------------------- Constants --------------------------------*/

const MAX_QUESTIONS = 5

/*---------------------------- Variables (state) ----------------------------*/

let currentQuestion, availQuestions, score, questionCount, checkingAnswer, counter

/*------------------------ Cached Element References ------------------------*/


const timer = document.getElementById("timer")
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
const confetti = document.getElementById("confetti")
const homeRun = new Audio("/audio/wiiBaseball.mp3")
const bigLoser = new Audio("/audio/fortniteL.mp3")


/*----------------------------- Event Listeners -----------------------------*/

choices.addEventListener('click', handleClick)
resetBtn.addEventListener('click', init)
changeCat.addEventListener('click', returnHome)

/*-------------------------------- Functions --------------------------------*/

function init(){
  questionCount = 0
  score = 0
  checkingAnswer = false
  availQuestions = [... apacQuestions]
  confetti.style.display = "none"
  endMsgs.style.display = "none"
  trackCont.style.display = "flex"
  container.style.display = "flex"
  choices.style.display = "flex"
  updateBoards()
  newQuestion()
}

function newQuestion(){
  if (availQuestions === 0 || questionCount >= MAX_QUESTIONS){
    return gameOver()
  }
  clearInterval(counter)
  startCountdown(20)
  timer.style.color = "white"
  questionCount++
  const questionIdx = Math.floor(Math.random() * availQuestions.length)
  currentQuestion = availQuestions[questionIdx]
  qImage.innerHTML = `<img src="${currentQuestion.imgSrc}"/>`
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
  choices.style.display = "none"
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
  confetti.style.display = "block"
  homeRun.volume = .05
  homeRun.play()
}

function notSoSmartPerson(){
  endTitle.innerText = `Nice Try!`
  endScore.innerText = `${score} points`
  endMsg.innerText = `Next time you'll get 'em all!`
  confetti.style.display = "block"
  homeRun.volume = .05
  homeRun.play()
}

function notForYou(){
  endTitle.innerText = `Yikes... (ㆆ_ㆆ)`
  endScore.innerText = `${score} points`
  endMsg.innerText = `Maybe sports aren't for you...`
  bigLoser.volume = .05
  bigLoser.play()
}

function returnHome(){
  window.location.assign("home.html")
}

function startCountdown(time){
  counter = setInterval(clock, 1000)
  function clock(){
    timer.innerHTML = time
    time--
    if (time < 9){
      let addZero = timer.innerHTML
      timer.innerHTML = "0" + addZero
      timer.style.color = "red"
    }
    if (time < 0){
      clearInterval(counter)
      return gameOver()
    }
  }
}

init()