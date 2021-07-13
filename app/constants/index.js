exports.constantsValues = {
  PASSWORD_SALT: 10
};

exports.statusMessages = {
  CREATED: 'Created successfully',
  NOT_CREATED: 'Cannot be created'
};

exports.validationMessages = {
  VALIDATE_EMAIL_ALREADY: 'email already exists',
  VALIDATE_EMAIL_MATCH: 'is not a valid wolox email',
  VALIDATE_EXISTS: 'is required',
  VALIDATE_IS_STRING: 'must be a string',
  VALIDATE_NOT_EMPTY: 'must be a non-empty',
  VALIDATE_PASSWORD_MATCH: 'is not a valid password',
  VALIDATE_PASSWORD_MIN_LENGTH: 'must be a minimum of 8 characters'
};

exports.validationRegex = {
  PASSWORD: /^(?=.*[0-9])(?=.*[a-zA-Z_.+\-@$!%*#?&])([a-zA-Z0-9_.+\-@$!%*#?&]){8,}$/,
  WOLOX_EMAIL: /^[a-zA-Z0-9_.+-]+@wolox\.(ar|cl|co|mx|com\.ar|com\.mx)$/
};
