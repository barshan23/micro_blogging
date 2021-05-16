const makeQuery = require('../db/DB');

module.exports = {
  create: async ({username, hashedPassword} = {}) => {
    const sqlQueryString = 'INSERT INTO `User` (`username`, `password`) values(?, ?)',
      valuesToBeInserted = [username, hashedPassword];

    let queryResults;

    try {
        queryResults = await makeQuery(sqlQueryString, valuesToBeInserted);
    } catch (error) {
      console.error(error);

      return Promise.reject({
        name: 'userNotCreated',
        message: 'Encountered an error while creating user'
      });
    }

    const {insertId: userId} = queryResults;

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
  }
};