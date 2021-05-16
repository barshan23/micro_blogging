module.exports = {
  isTweetValid: (tweet) => {
    if (tweet) {
      const tweetString = tweet.toString();

      if (tweetString.length <= 140) {
        return true;
      }
    }

    return false;
  }
};
