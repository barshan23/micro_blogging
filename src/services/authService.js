const { fetchUserByUserName } = require('../models/User');
const { comparePassword } = require('../utils/passwordUtil');
const { getAccessToken, getRefreshToken } = require('../utils/tokenUtil');

module.exports = {
  login: async function ({username, password}) {
    const user = await fetchUserByUserName(username),
      hashedPasswordFromDB = user.password;

    let isCorrectPassword = false;

    try {
      isCorrectPassword = await comparePassword(password, hashedPasswordFromDB);
    } catch (err) {
      console.error(err);

      return Promise.reject({
        name: 'passwordValidationError',
        message: 'Encountered an error while validating password'
      });
    }

    if (isCorrectPassword) {
      const userId = user.id,
        accessToken = getAccessToken({userId}),
        refreshToken = getRefreshToken({userId});

      return Promise.resolve({
        message: 'Success',
        accessToken,
        refreshToken
      });
    }

    return Promise.reject({
      name: 'invalidCredentialsError',
      message: 'Invalid credentials!'
    });
  }
};