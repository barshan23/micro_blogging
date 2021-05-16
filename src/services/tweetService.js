const Tweet = require("../models/Tweet");
const { getFollowers } = require("./userService");

module.exports = {
  createTweet: async ({ tweet, userId } = {}) => {
    await Tweet.create({ tweet, userId });

    return Promise.resolve({ message: 'Tweet created' });
  },
  findTweets: async (userId) => {
    const followers = await getFollowers(userId);

    if (!followers || !followers.length) {
      return Promise.resolve([]);
    }

    const followerIds = followers.map(follower => follower.followed_user),
      tweets = await Tweet.findTweetByUserIds(followerIds);

    if (!tweets || !tweets.length) {
      return Promise.resolve([]);
    }

    return Promise.resolve(tweets);
  }
};
