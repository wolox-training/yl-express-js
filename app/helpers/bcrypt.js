const bcrypt = require('bcryptjs');

const {
  common: {
    hash: { passwordSalt }
  }
} = require('../../config');

exports.createHash = (value, salt = passwordSalt) => bcrypt.hash(value, salt);
