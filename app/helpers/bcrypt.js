const bcrypt = require('bcryptjs');

const {
  common: {
    saltRounds: { passwordSaltRounds }
  }
} = require('../../config');

exports.createHash = (value, salt = passwordSaltRounds) => bcrypt.hash(value, salt);
