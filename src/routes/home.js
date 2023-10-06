const express = require("express")
const router = express.Router()
const HomeController = require("../app/controllers/HomeController")

// Home router
router.get("/", HomeController.index)
// Game router
router.get("/game", HomeController.game)


module.exports = router