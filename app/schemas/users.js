const { check } = require('express-validator');

const {
  validationMessages: {
    VALIDATE_EMAIL_MATCH,
    VALIDATE_EXISTS,
    VALIDATE_IS_STRING,
    VALIDATE_NOT_EMPTY,
    VALIDATE_PASSWORD_MATCH,
    VALIDATE_PASSWORD_MIN_LENGTH
  },
  validationRegex: { PASSWORD, WOLOX_EMAIL }
} = require('../constants');

exports.createUserValidator = [
  check('firstName')
    .exists()
    .withMessage(`firstName: ${VALIDATE_EXISTS}`)
    .isString()
    .withMessage(`firstName: ${VALIDATE_IS_STRING}`)
    .notEmpty()
    .withMessage(`firstName: ${VALIDATE_NOT_EMPTY}`),
  check('lastName')
    .exists()
    .withMessage(`lastName: ${VALIDATE_EXISTS}`)
    .isString()
    .withMessage(`lastName: ${VALIDATE_IS_STRING}`)
    .notEmpty()
    .withMessage(`lastName: ${VALIDATE_NOT_EMPTY}`),
  check('email')
    .matches(WOLOX_EMAIL)
    .withMessage(`email: ${VALIDATE_EMAIL_MATCH}`)
    .exists()
    .withMessage(`email: ${VALIDATE_EXISTS}`)
    .isString()
    .withMessage(`email: ${VALIDATE_IS_STRING}`)
    .notEmpty()
    .withMessage(`email: ${VALIDATE_NOT_EMPTY}`),
  check('password')
    .exists()
    .withMessage(`password: ${VALIDATE_EXISTS}`)
    .isString()
    .withMessage(`password: ${VALIDATE_IS_STRING}`)
    .notEmpty()
    .withMessage(`password: ${VALIDATE_NOT_EMPTY}`)
    .matches(PASSWORD)
    .withMessage(`password: ${VALIDATE_PASSWORD_MATCH}`)
    .isLength({ min: 8 })
    .withMessage(`password: ${VALIDATE_PASSWORD_MIN_LENGTH}`)
];
