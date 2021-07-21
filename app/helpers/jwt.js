const jwt = require('jsonwebtoken');

const {
  common: {
    session: { secret }
  }
} = require('../../config');

exports.generateToken = payload => jwt.sign(payload, secret);

exports.validateToken = token => jwt.verify(token, secret);
