const bcrypt = require('bcryptjs');

const {
  constantsValues: { PASSWORD_SALT }
} = require('../constants');

exports.createHash = (value, salt = PASSWORD_SALT) => bcrypt.hash(value, salt);
