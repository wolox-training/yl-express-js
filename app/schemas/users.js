const {
  validationMessages: {
    INVALIDATE_EMAIL_MATCH,
    INVALIDATE_PASSWORD_MATCH,
    IS_STRING_ERROR,
    NOT_EMPTY_ERROR,
    PASSWORD_MIN_LENGTH_ERROR,
    REQUIRED_ERROR
  },
  validationRegex: { PASSWORD, WOLOX_EMAIL }
} = require('../constants');

exports.createUserValidator = {
  firstName: {
    in: ['body'],
    exists: { errorMessage: `firstName: ${REQUIRED_ERROR}` },
    isString: { errorMessage: `firstName: ${IS_STRING_ERROR}` },
    notEmpty: {
      value: true,
      errorMessage: `firstName: ${NOT_EMPTY_ERROR}`
    },
    trim: true
  },
  lastName: {
    in: ['body'],
    exists: { errorMessage: `lastName: ${REQUIRED_ERROR}` },
    isString: { errorMessage: `lastName: ${IS_STRING_ERROR}` },
    notEmpty: {
      value: true,
      errorMessage: `lastName: ${NOT_EMPTY_ERROR}`
    },
    trim: true
  },
  email: {
    in: ['body'],
    exists: { errorMessage: `email: ${REQUIRED_ERROR}` },
    isString: { errorMessage: `email: ${IS_STRING_ERROR}` },
    notEmpty: {
      value: true,
      errorMessage: `email: ${NOT_EMPTY_ERROR}`
    },
    matches: {
      options: WOLOX_EMAIL,
      errorMessage: `email: ${INVALIDATE_EMAIL_MATCH}`
    }
  },
  password: {
    in: ['body'],
    exists: { errorMessage: `password: ${REQUIRED_ERROR}` },
    isString: { errorMessage: `password: ${IS_STRING_ERROR}` },
    notEmpty: { errorMessage: `password: ${NOT_EMPTY_ERROR}` },
    matches: {
      options: PASSWORD,
      errorMessage: `password: ${INVALIDATE_PASSWORD_MATCH}`
    },
    isLength: {
      options: { min: 8 },
      errorMessage: `password: ${PASSWORD_MIN_LENGTH_ERROR}`
    }
  }
};
