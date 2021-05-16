const bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken'),
  SALT_ROUNDS = 10;

module.exports = {
  hashPassword: async (plainTextPassword) => {
    const plainTextPasswordString = plainTextPassword.toString();

    return await bcrypt.hash(plainTextPasswordString, SALT_ROUNDS);
  }
};
