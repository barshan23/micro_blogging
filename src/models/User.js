const makeQuery = require('../db/DB');

module.exports = {
  create: async ({username, hashedPassword} = {}) => {
    try {
      const sqlQueryString = 'INSERT INTO `User` (`username`, `password`) values(?, ?)',
        valuesToBeInserted = [username, hashedPassword],
        queryResults = await makeQuery(sqlQueryString, valuesToBeInserted);

      if (queryResults) {
        const {insertId: userId} = queryResults;

        return Promise.resolve({ userId });
      }

      return Promise.reject({
        name: 'userNotCreated',
        message: 'Encountered an error while creating user'
      });
    } catch (error) {
      return Promise.reject({
        name: 'userNotCreated',
        message: 'Encountered an error while creating user'
      });
    }
  }
};