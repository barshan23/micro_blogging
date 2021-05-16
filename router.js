const userControllers = require('./src/controllers/userController');
const policies = require('./policies');

module.exports = {
  registerRoutes:  function (app) {
    app.post('/user/register', [policies.validateUserRegistration], userControllers.register);
  }
};