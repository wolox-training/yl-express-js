const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.BAD_GATEWAY_ERROR = 'bad_gateway_error';
exports.badGatewayError = message => internalError(message, exports.BAD_GATEWAY_ERROR);

exports.BAD_REQUEST_ERROR = 'bad_request_error';
exports.badRequestError = message => internalError(message, exports.BAD_REQUEST_ERROR);

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.EMAIL_EXISTS_ERROR = 'email_exists_error';
exports.emailExistsError = message => internalError(message, exports.EMAIL_EXISTS_ERROR);

exports.NOT_FOUND_ERROR = 'not_found_error';
exports.notFoundError = message => internalError(message, exports.NOT_FOUND_ERROR);

exports.SCHEMA_ERROR = 'schema_error';
exports.schemaError = message => internalError(message, exports.SCHEMA_ERROR);
