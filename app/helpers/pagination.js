const errors = require('../errors');

exports.pagination = (model, limit, offset) =>
  model.findAndCountAll({ limit, offset: (offset - 1) * limit }).catch(error => {
    throw errors.databaseError(error.message);
  });
