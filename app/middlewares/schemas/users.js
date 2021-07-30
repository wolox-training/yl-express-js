const { check, checkSchema } = require('express-validator');

const {
  validationMessages: {
    INVALID_EMAIL_FORMAT,
    INVALIDATE_EMAIL_MATCH,
    INVALIDATE_PASSWORD_MATCH,
    IS_STRING_ERROR,
    NOT_EMPTY_ERROR,
    PASSWORD_MIN_LENGTH_ERROR,
    QUERY_PARAMS_ERROR,
    REQUIRED_ERROR
  },
  validationRegex: { PASSWORD, WOLOX_EMAIL }
} = require('../../constants');

exports.signInSchema = [
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
  ...exports.signInSchema
];

const queryParamsSchema = {
  in: ['params', 'query'],
  isInt: { options: { min: 1 } },
  optional: true,
  toInt: true,
  errorMessage: QUERY_PARAMS_ERROR
};

exports.paginationSchema = [
  checkSchema({
    limit: queryParamsSchema,
    offset: queryParamsSchema
  })
];
