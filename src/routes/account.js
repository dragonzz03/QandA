const express = require("express")
const router = express.Router()
const AccountController = require("../app/controllers/AccountController")

// LogIn router
router.get("/logIn", AccountController.logIn)
// Register process router
router.post("/registerProcessing", AccountController.registerProcessing)

router.post("/signInProcess", AccountController.signInProcessing)
// Register router
router.get("/register", AccountController.register)

router.get("/logOut", AccountController.logOut)


module.exports = router