const express = require("express")
const router = express.Router()
const HomeController = require("../app/controllers/HomeController")

// Home router

// Game router
router.get("/game/processingFlow/:idQues", HomeController.processingFlow)
router.get("/game/nextQuestionProcessingFlow", HomeController.nextQuestionProcessingFlow)

router.get("/game/playAgainProcessingFlow", HomeController.playAgainProcessingFlow)
router.get("/game", HomeController.game)

router.post("/addQuestion/addQuestionprocess", HomeController.addQuestionprocess)
router.post("/addQuestion", HomeController.addQuestion)

router.get("/board", HomeController.board)
router.get("/", HomeController.index)


module.exports = router