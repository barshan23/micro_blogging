const authService = require('../services/authService');
const { handleError } = require('../utils/errorHandler');

module.exports = {
  login: function (req, res) {
    const username = req.body.username,
      password = req.body.password;

      authService.login({username, password})
      .then((response) => {
        return res.json(response);
      })
      .catch((err) => {
        return handleError(err, res);
      });
  }
};