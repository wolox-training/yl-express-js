const errors = require('../errors');
const logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.BAD_REQUEST_ERROR]: 400,
  [errors.AUTH_ERROR]: 401,
  [errors.NOT_FOUND_ERROR]: 404,
  [errors.CONFLICT_ERROR]: 409,
  [errors.SCHEMA_ERROR]: 422,
  [errors.DEFAULT_ERROR]: 500,
  [errors.BAD_GATEWAY_ERROR]: 502,
  [errors.DATABASE_ERROR]: 503
};

exports.handle = (error, _, res, next) => {
  if (error.internalCode) res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};
