
const homeRouter = require('./home');
const accountRounter = require('./account');


function route(app) {
  app.use('/', homeRouter);
  app.use('/account', accountRounter);
  
}

module.exports = route;
