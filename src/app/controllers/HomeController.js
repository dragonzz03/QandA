const ListQuestion = require("../model/ListQuestions");

class HomeController {
  index(req, res, next) {
    res.render('home')
  }

  game(req, res, next) {
    res.render('menu/game')
  }
}

module.exports = new HomeController();