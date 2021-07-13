const { validationResult } = require('express-validator');

const errors = require('../errors');

exports.validateRequest = schema => [
  schema,
  (req, _res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(errors.badRequestError(result.array()));
    }
    return next();
  }
];
