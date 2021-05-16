const makeQuery = require('../db/DB'),
  SQL_DUPLICATE_ENTRY_ERROR_CODE = 'ER_DUP_ENTRY';

module.exports = {
  create: async ({username, hashedPassword} = {}) => {
    const sqlQueryString = 'INSERT INTO `User` (`username`, `password`) values(?, ?)',
      valuesToBeInserted = [username, hashedPassword];

    let queryResult;

    try {
      queryResult = await makeQuery(sqlQueryString, valuesToBeInserted);
    } catch (error) {
      console.error(error);

      let errorMessage = 'Encountered an error while creating user';

      if (error.code === SQL_DUPLICATE_ENTRY_ERROR_CODE) {
        errorMessage = 'This username is already taken';
      }

      return Promise.reject({
        name: 'userNotCreated',
        message: errorMessage
      });
    }

    const {insertId: userId} = queryResult;

    return Promise.resolve({ userId });
  },
  fetchUserByUserName: async (username) => {
    const sqlQueryString = 'SELECT * FROM `User` WHERE `username` = ?',
      values = [username];

    let queryResult;

    try {
      queryResult = await makeQuery(sqlQueryString, values);
    } catch (error) {
      console.error(error);

      return Promise.reject();
    }

    if (queryResult) {
      const userData = queryResult[0];

      return Promise.resolve(userData);
    }

    return Promise.reject({
      name: 'userNotFoundError',
      message: 'The user could not be found'
    });
  },
  fetchUserByUserId: async (userId) => {
    const sqlQueryString = 'SELECT * FROM `User` WHERE `id` = ?',
      values = [userId];

    let queryResult;

    try {
      queryResult = await makeQuery(sqlQueryString, values);
    } catch (error) {
      console.error(error);

      return Promise.reject();
    }

    if (queryResult && queryResult.length) {
      const userData = queryResult[0];

      return Promise.resolve(userData);
    }

    return Promise.reject({
      name: 'userNotFoundError',
      message: 'The user could not be found'
    });
  },
  followUserById: async (followerUserId, userIdBeingFollowed) => {
    const sqlQueryString = 'INSERT INTO `User_follow_through` (`follower_user`, `followed_user`) values(?, ?)',
      valuesToBeInserted = [followerUserId, userIdBeingFollowed];

    let queryResult;

    try {
      queryResult = await makeQuery(sqlQueryString, valuesToBeInserted);
    } catch (error) {
      console.error(error);

      let errorMessage = 'Unable to follow user',
        errorName = 'unableToFollow';

      if (error.code === SQL_DUPLICATE_ENTRY_ERROR_CODE) {
        errorMessage = 'You are already following the user';
        errorName = 'alreadyFollowing';
      }

      return Promise.reject({
        name: errorName,
        message:  errorMessage
      });
    }

    return Promise.resolve();
  },
  getFollowers: async (userId) => {
    const sqlQueryString = 'SELECT `followed_user` FROM `User_follow_through` WHERE `follower_user` = ?',
      values = [userId];

    let queryResult;

    try {
      queryResult = await makeQuery(sqlQueryString, values);
    } catch (err) {
      console.error(err);

      return Promise.reject({ message: 'Not able to find followers' });
    }

    return Promise.resolve(queryResult);
  }
};