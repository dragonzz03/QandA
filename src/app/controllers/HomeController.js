const ListQuestion = require("../model/ListQuestions");
const PlayerManagament = require('../model/PlayerManagements');
const { mutipleMongooseToObject } = require("../../util/mongoose")
const { MongooseToObject } = require('../../util/mongoose');
const savePoint = require('../middleWare/saveResult');


var wrongAnswer = 'You answered this question incorrectly ';
var backButton = 'Back to home'; 
var lastQuestion = 'Congratulations, you have answered all the questions in this game';
var nextButton = [
    'Next question',
    'Play again'
  ]
var nextPatchBth = [
    'nextQuestionProcessingFlow',
    'playAgainProcessingFlow'
  ]
var signIn = [
    '/account/logIn',
    'Sign in for save score'
  ]


class HomeController {
  index(req, res, next) {
    res.render('home')
    req.session.numberofQuestion = 0;
    req.session.checkPoint = 0;
  }

  game(req, res, next) {
    var detainQues;
    var pointsAchieved = req.session.checkPoint;
    ListQuestion.find({})
    .then((allQuestion) => {
      req.session.trueAns = allQuestion.trueAnswer
      detainQues = allQuestion[req.session.numberofQuestion];
      if (detainQues == undefined) {
        res.render('menu/explain', {
        explain: lastQuestion ,
        nextButton: nextButton[1],
        nextPatchBth: nextPatchBth[1],
        backButton,
        pointsAchieved: 'The points you get are:' + pointsAchieved,
        signInPath: signIn[0],
        signInBtn: signIn[1],
        }) 
        savePoint(PlayerManagament, req.session)
      } else {
        res.render('menu/game',{
          question : MongooseToObject(detainQues)
        })
      }
    }
      )
    .catch(next)
  }

  processingFlow(req, res, next) {
    var pointsAchieved = req.session.checkPoint;
    ListQuestion.findById(req.params.idQues)
    .then((ques) => {
      var explain = ques.explain;
      req.query.ans == ques.trueAnswer ? 
      //Process when answering correctly
      res.render('menu/explain', {
        explain,
        nextButton: nextButton[0],
        nextPatchBth: nextPatchBth[0],
        backButton,
        display: 'none'
      }) 
      :[
      //Process when answering incorrectly
       res.render('menu/explain', {
        explain: wrongAnswer,
        nextButton: nextButton[1],
        nextPatchBth: nextPatchBth[1],
        backButton,
        pointsAchieved: 'The points you get are:' + pointsAchieved,
        signInPath: signIn[0],
        signInBtn: signIn[1],
      }),
      savePoint(PlayerManagament, req.session)
    ]

    })
    
  }



  nextQuestionProcessingFlow(req, res, next) {
    req.session.numberofQuestion++
    req.session.checkPoint++
    res.redirect('/game/')
  }

  playAgainProcessingFlow(req, res, next) {
    req.session.numberofQuestion = 0 
    req.session.checkPoint = 0
    res.redirect('/game/')
  }


  addQuestion(req, res, next) {
    res.render('menu/addQuestion')
  }
  addQuestionprocess(req, res, next) {
    const formData = req.body;
    formData.author = req.session.accountName;
    const question = new ListQuestion(formData);
    question
      .save()
      .then(() => res.redirect('/'))
      .catch(next);
  }

  board(req, res, next) {
    PlayerManagament.find({}).sort({
      ath: 'desc'
    })
     .then((board) =>{
      res.render('menu/board',{
        board: mutipleMongooseToObject(board)
      })
     })
     
  }
}

module.exports = new HomeController();