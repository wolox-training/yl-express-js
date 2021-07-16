const { validationResult } = require('express-validator');

const errors = require('../errors');

exports.schemaValidator = schema => [
  schema,
  (req, _, next) => {
    const result = validationResult(req);
    return result.isEmpty() ? next() : next(errors.schemaError(result.array()[0]));
  }
];
