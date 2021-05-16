const userService = require('../services/userService');
const { handleError } = require('../utils/errorHandler');

module.exports = {
  register: function (req, res) {
    const username = req.body.username,
      password = req.body.password;

    userService.createUser({ username, password })
      .then((response) => {
        return res.json(response);
      })
      .catch((err) => {
        return handleError(err, res);
      });
  },
  follow: function (req, res) {
    const userIdToFollow = Number(req.params.id),
      currentUserId = req.userId;

    userService.followUser({userIdToFollow, currentUserId})
      .then((response) => {
        return res.json(response);
      })
      .catch((err) => {
        return handleError(err, res);
      });
  }
};
