const jwt = require('jsonwebtoken'),
  ACCESS_TOKEN_EXPIRY_TIME_IN_MILIS = 86400, // 24 hours
  REFRESH_TOKEN_EXPIRY_TIME_IN_MILIS = 604800; // 7 days

module.exports = {
  getAccessToken: (dataToBeAddedToToken) => {
    const jwtSecret = process.env.SECRET_JWT,
      tokenData = {
        ...dataToBeAddedToToken,
        type: 'access'
      },
      jwtOptions = {expiresIn: ACCESS_TOKEN_EXPIRY_TIME_IN_MILIS},
      accessToken = jwt.sign(tokenData, jwtSecret, jwtOptions);

      return accessToken;
  },
  getRefreshToken: (dataToBeAddedToToken) => {
    const jwtSecret = process.env.SECRET_JWT,
      tokenData = {
        ...dataToBeAddedToToken,
        type: 'refresh'
      },
      jwtOptions = {expiresIn: REFRESH_TOKEN_EXPIRY_TIME_IN_MILIS},
      refreshToken = jwt.sign(tokenData, jwtSecret, jwtOptions);

      return refreshToken;
  },
  getDataFromAccessToken: (tokenToBeVerified) => {
    const jwtSecret = process.env.SECRET_JWT;

    let tokenData;

    try {
      tokenData = jwt.verify(tokenToBeVerified, jwtSecret)
    } catch (err) {
      console.error(err);

      return;
    }

    if (tokenData.type === 'access') {
      return tokenData;
    }

    return null;
  }
};
