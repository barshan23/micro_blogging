const { checkUserExistence } = require('./services/userService');
const { getDataFromAccessToken } = require('./utils/tokenUtil');
const { isTweetValid } = require('./utils/tweetUtils');

module.exports = {
  validateUserNamePassword: function (req, res, next) {
    const requestBody = req.body,
      password = requestBody && requestBody.password,
      username = requestBody && requestBody.username;

    if (!password) {
      return res.status(400).json({error: {
        name: 'paramMissingError',
        message: 'password is missing in the body'
      }});
    }

    if (!username) {
      return res.status(400).json({error: {
        name: 'paramMissingError',
        message: 'username is missing in the body'
      }});
    }

    if (typeof username !== 'string' || username.length > 64) {
      return res.status(400).json({error: {
        name: 'invalidParamError',
        message: 'username should be a string and can not be more than 64 character long'
      }});
    }
  
    return next();
  },

  isAuthenticated: function (req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).send({ message:'Access token is required to make this request' });
    }

    const dataFromToken = getDataFromAccessToken(token);

    if (!dataFromToken) {
      return res.status(401).send({ message:'Invalid access token' });
    }

    const userId = dataFromToken.userId;

    checkUserExistence(userId)
      .then(() => {
        req.userId = userId;

        return next();
      })
      .catch(() => {
        return res.status(401).send({ message:'Invalid access token' });
      });
  },

  validateTweet: function (req, res, next) {
    const requestBody = req.body,
      tweet = requestBody.tweet;

    if (!isTweetValid(tweet)) {
      return res.status(400).json({
        error: {
          name: 'invalidParamError',
          message: 'Tweet should be a string and can not be more than 140 character long'
        }
      })
    }

    return next();
  }
};
