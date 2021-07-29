const jwt = require('jsonwebtoken');

const {
  common: {
    session: { expiredTimeToken, secret }
  }
} = require('../../config');

const options = { expiresIn: expiredTimeToken };

exports.generateToken = payload => jwt.sign(payload, secret, options);

exports.validateToken = token => jwt.verify(token, secret, options);
