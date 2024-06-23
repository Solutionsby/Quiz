function gameRotues(app){
let goodAnswers = 0;
let isGameOver = false
let callToAFriendUsed = false;
let questionToTheCrowdUsed = false;
let halfOnHalfUsed = false;

const questions = [
    {
        question: 'Jaki jest najlepszy jezyk programowania na świecie wg mnie? ',
        answers: ['C++', "Java", "JavaScript", "Python"],
        correctAnswer: 2 
    },
    {
        question: 'Druga planeta od slonca  ',
        answers: ['Ziemia', "Wenus ", "Mars", "Ziemia"],
        correctAnswer: 1
    }, 
    {
        question: '2 + 2  ',
        answers: ['1', "0", "5", "4"],
        correctAnswer: 3
    }
];

app.get('/question', (reg, res)=>{
    if(goodAnswers === questions.length){
        res.json({
            winner: true
        });

    }
    else if(isGameOver){
        res.json({
            loser:true
        })
    }
    else{
        const nextQuestion = questions[goodAnswers];
        const { question, answers} = nextQuestion;
        res.json({
            question, answers
        });
    }
});
    app.post('/answer/:index', (req,res)=>{
        if(isGameOver){
            res.json({
                loser:true
            })
        }
        const {index} = req.params
        const question = questions[goodAnswers]
        const isGoodAnswer = question.correctAnswer === Number(index)
        if(isGoodAnswer){
            goodAnswers++;
        }else{
            isGameOver = true;
        }

       res.json({
        correct: isGoodAnswer,
        goodAnswers, 
       })
    })

    app.get('/help/friend', (req,res) => {
        if(callToAFriendUsed){
            return res.json({
                text: 'To koło ratunkowe było ju wykorzystane'
            });
        }
        const question = questions[goodAnswers]
        callToAFriendUsed = true;
        const doesFriendKnowAnswer = Math.random() < 0.5;
        res.json({
            text: doesFriendKnowAnswer ? `Hmm, wydaje mi się, ze odpowiedź to ${question.answers[question.correctAnswer]}` : 'Nie wiem '
        })
    })


    app.get('/help/half', (req,res) => {
        if(halfOnHalfUsed){
            return res.json({
                text: 'To koło ratunkowe było ju wykorzystane'
            });
        }
        const question = questions[goodAnswers]
        halfOnHalfUsed = true;
        const answersCopy = question.answers.filter((s, index)=>(
            index !== question.correctAnswer
        ));
        answersCopy.splice(~~(Math.random() * answersCopy.length),1);
        res.json({
            answersToRemove: answersCopy
        })
    })



    app.get('/help/crowd', (req,res)=>{

        if(questionToTheCrowdUsed){
            return res.json({
                text: 'To koło ratunkowe było ju wykorzystane'
            });
        }
        questionToTheCrowdUsed = true;


        const chart = [10, 20, 30, 40];
            for (let i = chart.length - 1; i > 0; i--){
            const change = Math.floor(Math.random() * 20 - 10);

            chart[i] += change;
            chart[i - 1] -= change;
            }
        const question = questions[goodAnswers];
        const {correctAnswer} = question;

        [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]]

        res.json({
            chart,
        })
    });



}

module.exports = gameRotues;