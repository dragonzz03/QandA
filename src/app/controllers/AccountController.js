const PlayerManagament = require('../model/PlayerManagements');
const {
  validateAccountName,
  validatePassword,
} = require('../middleWare/validateAccount');
const { MongooseToObject } = require('../../util/mongoose');

class AccountController {
  logIn(req, res, next) {
    res.render('account/login',{
      display: 'none'
    })
  }

  register(req, res, next) {
    res.render('account/register')
  }

  //[]POST] account/signUpProcessing
  registerProcessing(req, res, next) {
    const formData = req.body;
    const registerProcessing = new PlayerManagament(formData);
    registerProcessing
      .save()
      .then(() => res.redirect('/'))
      .catch(next);
  }

  //[POST] account/signInProcess
  signInProcessing(req, res, next) {
    PlayerManagament.findOne({ account: req.body.accountName })
        .then((account) =>
          validateAccountName(account.account, req.body.accountName) &&
          validatePassword(account.password, req.body.password)
            ? [
                req.session.accountName = account.name,
                req.session.image = account.image,
                req.session.idUser = account._id,
                res.redirect("/"),
                
              ]
            : res.render('account/login',{
              display: 'block',
              warning: 'Your password is incorrect'
            })


            
        ) //account is not defined
        .catch((err) => {
          res.render('account/login',{
          display: 'block',
          warning: 'Your account is incorrect'
        })
        }
        )
  }
  //[GET] account/logOut
  logOut(req, res) {
    req.session.destroy();
    res.redirect("/")
  }

  
}

module.exports = new AccountController();