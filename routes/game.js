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

}

module.exports = gameRotues;