const policies = require('./policies');
const userControllers = require('./src/controllers/userController');
const authController = require('./src/controllers/authController');

module.exports = {
  registerRoutes:  function (app) {
    app.post('/register', [policies.validateUserNamePassword], userControllers.register);
    app.post('/login', [policies.validateUserNamePassword], authController.login);
  }
};