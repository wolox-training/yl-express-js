const {
  common: {
    regex: { woloxEmail }
  }
} = require('../../config');

const woloxEmailRegex = `^[a-zA-Z0-9_.+-]+@${woloxEmail}`;

exports.authMessages = {
  AUTH_ERROR: 'user no authenticated',
  LOGGED: 'authenticated successfully',
  WRONG_LOGIN: 'email and/or password incorrect'
};

exports.statusCode = {
  OK_CODE: 200,
  CREATED_CODE: 201,
  NOT_AUTH_CODE: 401,
  NOT_FOUND_CODE: 404,
  CONFLICT_CODE: 409,
  UNPROCESSABLE_ENTITY_CODE: 422
};

exports.statusMessages = {
  CREATED: 'successfully created',
  NOT_CREATED: 'cannot be created'
};

exports.validationMessages = {
  EMAIL_ALREADY_ERROR: 'email already exists',
  INVALID_EMAIL_FORMAT: 'invalid email format',
  INVALIDATE_EMAIL_MATCH: 'is not a valid wolox email',
  INVALIDATE_PASSWORD_MATCH: 'is not a valid password. must be alphanumeric',
  IS_STRING_ERROR: 'must be a string',
  NOT_EMPTY_ERROR: 'must be a non-empty',
  PASSWORD_MIN_LENGTH_ERROR: 'must be a minimum length of 8 characters',
  REQUIRED_ERROR: 'is required'
};

exports.validationRegex = {
  PASSWORD: /^(?=.*[0-9])(?=.*[a-zA-Z_.+\-@$!%*#?&])([a-zA-Z0-9_.+\-@$!%*#?&]){8,}$/,
  WOLOX_EMAIL: new RegExp(woloxEmailRegex)
};
