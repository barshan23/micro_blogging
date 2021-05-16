const tweetService = require('../services/tweetService');
const { handleError } = require('../utils/errorHandler');

module.exports = {
  create: function (req, res) {
    const tweet = req.body.tweet,
      userId = req.userId;

    tweetService.createTweet({ tweet, userId })
      .then((response) => {
        return res.json(response);
      })
      .catch((err) => {
        return handleError(err, res);
      });
  }
};