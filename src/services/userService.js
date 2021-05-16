const UserModel = require('../models/User'),
  hashPassword = require('../utils/passwordUtil').hashPassword,
  { getAccessToken, getRefreshToken } = require('../utils/tokenUtil');

module.exports = {
  createUser: async ({username, password: plainTextPassword} = {}) => {
    const hashedPassword = await hashPassword(plainTextPassword).catch((err) => {
      console.error(err);

      return Promise.reject({
        name: 'errorCreatingUser',
        message: 'Encountered an error while creating user'
      }); 
    });

    const { userId } = await UserModel.create({username, hashedPassword}),
      accessToken = getAccessToken({userId}),
      refreshToken = getRefreshToken({userId});

    return Promise.resolve({
      id: userId,
      accessToken,
      refreshToken,
      message: 'Successfully registerd'
    })
  }
};
