const {
  validateTweet,
  validateUserNamePassword,
  isAuthenticated,
  validateFollowUser
} = require('./src/policies');
const userControllers = require('./src/controllers/userController');
const authController = require('./src/controllers/authController');
const tweetController = require('./src/controllers/tweetController');

module.exports = {
  registerRoutes:  function (app) {
    app.post('/register', [validateUserNamePassword], userControllers.register);
    app.post('/login', [validateUserNamePassword], authController.login);
    app.post('/follow/user/:id', [isAuthenticated, validateFollowUser], userControllers.follow);
    app.post('/tweet', [validateTweet, isAuthenticated], tweetController.create);
    app.get('/tweet', [isAuthenticated], tweetController.find);
  }
};