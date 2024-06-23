const question = document.querySelector('#question');
const gameBoard = document.querySelector('#game-board');
const h2 = document.querySelector('h2')




function fillQuestionElements(data) {
    if(data.winner === true){
        gameBoard.style.display = 'none'; 
        h2.innerText = "Wygrana"
        return;
    }
    if(data.loser === true){
        gameBoard.style.display = 'none'
        h2.innerText = 'Przegrałeś'
        return;
    }
    
    question.innerText = data.question;
    for(const i in data.answers){
        const answerEl = document.querySelector(`#answer${Number(i)+ 1}`);
        answerEl.innerText = data.answers[i];
    }

}
// change to forEach


function showNextQuestion() {
    fetch('/question', {
        method: 'GET'
    })
        .then(r => r.json() )
        .then( data => {
            fillQuestionElements(data)
        })
}

showNextQuestion();

const goodAnswerSpan = document.querySelector('#good-answers')

function handleAnswerFeedback(data){
    goodAnswerSpan.innerText = data.goodAnswers
    showNextQuestion();

}

function sendAnswer(answerIndex){
    fetch(`answer/${answerIndex}`, {
        method: 'POST'
    })
        .then(r => r.json() )
        .then( data => {
            handleAnswerFeedback(data)
        })
}

const buttons = document.querySelectorAll('.answer-button');

for(const button of buttons) {
    button.addEventListener('click', (e)=>{
        const  answerIndex = e.target.dataset.answer
        sendAnswer(answerIndex);

    })
}

const tipDiv = document.querySelector('#tip');

function handleFriendsAnswer(data){
 tipDiv.innerText = data.text
}


function callToAFriend(){
    fetch(`/help/friend`, {
        method: 'GET'
    })
        .then(r => r.json() )
        .then( data => {
            handleFriendsAnswer(data)
        })
}

function handlehalfOnHalfAnswer(data){
    if (typeof data.text === 'string'){
        tipDiv.innerText = data.text;
    tipDiv.innerText = data.text
   } else {
        for(button of buttons){
            if(data.answersToRemove.indexOf(button.innerText) > -1 ){
                button.innerText = '';
            }
        }
   }}
   
   
   function halfOnHalf(){
       fetch(`/help/half`, {
           method: 'GET'
       })
           .then(r => r.json() )
           .then( data => {
            handlehalfOnHalfAnswer(data)
           })
   }
   function handlequestionToTheCrowdAnswer(data){
    if (typeof data.text === 'string'){
        tipDiv.innerText = data.text;
    tipDiv.innerText = data.text
   } else {
        data.chart.forEach((percent, index) => {
            buttons[index].innerText = buttons[index].innerText + ': ' + percent + '%'
        })
        
   }
   }
   
   
   function questionToTheCrowd(){
       fetch(`/help/crowd`, {
           method: 'GET'
       })
           .then(r => r.json() )
           .then( data => {
            handlequestionToTheCrowdAnswer(data)
           })
   }




document.querySelector('#callToAFriend').addEventListener('click',callToAFriend)
document.querySelector('#halfOnHalf').addEventListener('click',halfOnHalf)
document.querySelector('#questionToTheCrowd').addEventListener('click',questionToTheCrowd)