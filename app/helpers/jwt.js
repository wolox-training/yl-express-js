const jwt = require('jsonwebtoken');

const {
  common: {
    session: { secret }
  }
} = require('../../config');

exports.generateToken = payload => jwt.sign(payload, secret);
