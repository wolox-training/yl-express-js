const { check } = require('express-validator');

const {
  authMessages: { AUTH_ERROR },
  validationMessages: {
    INVALID_EMAIL_FORMAT,
    INVALIDATE_EMAIL_MATCH,
    INVALIDATE_PASSWORD_MATCH,
    IS_STRING_ERROR,
    NOT_EMPTY_ERROR,
    PASSWORD_MIN_LENGTH_ERROR,
    REQUIRED_ERROR
  },
  validationRegex: { PASSWORD, WOLOX_EMAIL }
} = require('../../constants');

exports.createUserSchema = [
  check('firstName')
    .exists()
    .withMessage(REQUIRED_ERROR)
    .notEmpty()
    .withMessage(NOT_EMPTY_ERROR)
    .isString()
    .withMessage(IS_STRING_ERROR),
  check('lastName')
    .exists()
    .withMessage(REQUIRED_ERROR)
    .notEmpty()
    .withMessage(NOT_EMPTY_ERROR)
    .isString()
    .withMessage(IS_STRING_ERROR),
  check('email')
    .exists()
    .withMessage(REQUIRED_ERROR)
    .notEmpty()
    .withMessage(NOT_EMPTY_ERROR)
    .isString()
    .withMessage(IS_STRING_ERROR)
    .isEmail()
    .withMessage(INVALID_EMAIL_FORMAT)
    .matches(WOLOX_EMAIL)
    .withMessage(INVALIDATE_EMAIL_MATCH),
  check('password')
    .exists()
    .withMessage(REQUIRED_ERROR)
    .notEmpty()
    .withMessage(NOT_EMPTY_ERROR)
    .isString()
    .withMessage(IS_STRING_ERROR)
    .isLength({ min: 8 })
    .withMessage(PASSWORD_MIN_LENGTH_ERROR)
    .matches(PASSWORD)
    .withMessage(INVALIDATE_PASSWORD_MATCH)
];

exports.signInSchema = [
  check('email')
    .exists()
    .withMessage(REQUIRED_ERROR)
    .notEmpty()
    .withMessage(NOT_EMPTY_ERROR)
    .isString()
    .withMessage(AUTH_ERROR)
    .isEmail()
    .withMessage(AUTH_ERROR)
    .matches(WOLOX_EMAIL)
    .withMessage(AUTH_ERROR),
  check('password')
    .exists()
    .withMessage(REQUIRED_ERROR)
    .notEmpty()
    .withMessage(NOT_EMPTY_ERROR)
    .isString()
    .withMessage(AUTH_ERROR)
    .isLength({ min: 8 })
    .withMessage(AUTH_ERROR)
    .matches(PASSWORD)
    .withMessage(AUTH_ERROR)
];
