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
    .withMessage(`firstName: ${REQUIRED_ERROR}`)
    .notEmpty()
    .withMessage(`firstName: ${NOT_EMPTY_ERROR}`)
    .isString()
    .withMessage(`firstName: ${IS_STRING_ERROR}`),
  check('lastName')
    .exists()
    .withMessage(`lastName: ${REQUIRED_ERROR}`)
    .notEmpty()
    .withMessage(`lastName: ${NOT_EMPTY_ERROR}`)
    .isString()
    .withMessage(`lastName: ${IS_STRING_ERROR}`),
  check('email')
    .exists()
    .withMessage(`email: ${REQUIRED_ERROR}`)
    .notEmpty()
    .withMessage(`email: ${NOT_EMPTY_ERROR}`)
    .isString()
    .withMessage(`email: ${IS_STRING_ERROR}`)
    .isEmail()
    .withMessage(`email: ${INVALID_EMAIL_FORMAT}`)
    .matches(WOLOX_EMAIL)
    .withMessage(`email: ${INVALIDATE_EMAIL_MATCH}`),
  check('password')
    .exists()
    .withMessage(`password: ${REQUIRED_ERROR}`)
    .notEmpty()
    .withMessage(`password: ${NOT_EMPTY_ERROR}`)
    .isString()
    .withMessage(`password: ${IS_STRING_ERROR}`)
    .isLength({ min: 8 })
    .withMessage(`password: ${PASSWORD_MIN_LENGTH_ERROR}`)
    .matches(PASSWORD)
    .withMessage(`password: ${INVALIDATE_PASSWORD_MATCH}`)
];

exports.signInSchema = [
  check('email')
    .exists()
    .withMessage(`email: ${REQUIRED_ERROR}`)
    .notEmpty()
    .withMessage(`email: ${NOT_EMPTY_ERROR}`)
    .isString()
    .withMessage(`email: ${AUTH_ERROR}`)
    .isEmail()
    .withMessage(`email: ${AUTH_ERROR}`)
    .matches(WOLOX_EMAIL)
    .withMessage(`email: ${AUTH_ERROR}`),
  check('password')
    .exists()
    .withMessage(`password: ${REQUIRED_ERROR}`)
    .notEmpty()
    .withMessage(`password: ${NOT_EMPTY_ERROR}`)
    .isString()
    .withMessage(`password: ${AUTH_ERROR}`)
    .isLength({ min: 8 })
    .withMessage(`password: ${AUTH_ERROR}`)
    .matches(PASSWORD)
    .withMessage(`password: ${AUTH_ERROR}`)
];
