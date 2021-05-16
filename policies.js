module.exports = {
  validateUserRegistration: function (req, res, next) {
    const requestBody = req.body,
      password = requestBody && requestBody.password,
      username = requestBody && requestBody.username;

    if (!password) {
      return res.status(400).send({error: {
        name: 'paramMissingError',
        message: 'password is missing in the body'
      }});
    }

    if (!username) {
      return res.status(400).send({error: {
        name: 'paramMissingError',
        message: 'username is missing in the body'
      }});
    }

    if (typeof username !== 'string' || username.length > 64) {
      return res.status(400).send({error: {
        name: 'invalidParamError',
        message: 'username should be a string and can not be more than 64 character long'
      }});
    }
  
    return next();
  }
};
