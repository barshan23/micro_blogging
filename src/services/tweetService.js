const Tweet = require("../models/Tweet");

module.exports = {
  createTweet: async ({ tweet, userId } = {}) => {
    await Tweet.create({ tweet, userId });

    return Promise.resolve({ message: 'Tweet created' });
  }
};
