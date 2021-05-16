const bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken'),
  SALT_ROUNDS = 10;

module.exports = {
  hashPassword: (plainTextPassword) => {
    const plainTextPasswordString = plainTextPassword.toString();

    return bcrypt.hash(plainTextPasswordString, SALT_ROUNDS);
  },

  comparePassword: (plainTextPassword, hashedPassword) => {
    const plainTextPasswordString = plainTextPassword.toString();

    return bcrypt.compare(plainTextPasswordString, hashedPassword);
  }
};
