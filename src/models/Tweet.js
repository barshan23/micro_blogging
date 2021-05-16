const makeQuery = require('../db/DB');

module.exports = {
  create: async ({tweet, userId}) => {
    const sqlQueryString = 'INSERT INTO `Tweet` (`tweet`, `createdBy`) VALUES (?, ?)',
      valuesToBeInserted = [tweet, userId];

    try {
      await makeQuery(sqlQueryString, valuesToBeInserted);
    } catch (error) {
      console.error(error);

      return Promise.reject({
        name: 'tweetNotCreated',
        message: 'Encountered an error while creating tweet'
      });
    }

    return Promise.resolve();
  },
  findTweetByUserIds: async (userIds) => {
    const sqlQueryString = 'SELECT `tweet`, `id` FROM `Tweet` WHERE `createdBy` IN (?) ORDER BY `id` DESC',
      values = [userIds];

    let queryResult;

    try {
      queryResult = await makeQuery(sqlQueryString, values);
    } catch (error) {
      console.error(error);

      return Promise.reject({
        message: 'Encountered an error while fetching tweets'
      });
    }

    return Promise.resolve(queryResult);
  }
};