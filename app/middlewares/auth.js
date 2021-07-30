const logger = require('../logger');
const { authError } = require('../errors');
const { validateToken } = require('../helpers/jwt');
const {
  authMessages: { AUTH_ERROR, EXPIRED_TOKEN_ERROR, INVALID_TOKEN_ERROR, VALID_TOKEN }
} = require('../constants/');
const {
  common: {
    session: { header_name }
  }
} = require('../../config');

exports.verifyToken = (req, _, next) => {
  try {
    const headers = req.headers[header_name];
    const authHeader = headers ? headers : next(authError(AUTH_ERROR));
    const token = authHeader.split(' ')[1];
    const tokenInfo = validateToken(token);
    req.headers.user = tokenInfo;
    logger.info(VALID_TOKEN);
    return next();
  } catch (err) {
    logger.error(`${AUTH_ERROR}: ${INVALID_TOKEN_ERROR}`);
    if (err.name === 'TokenExpiredError') return next(authError(EXPIRED_TOKEN_ERROR));
    return next(authError(INVALID_TOKEN_ERROR));
  }
};
