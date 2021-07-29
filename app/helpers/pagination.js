exports.pagination = (model, limit, offset) => model.findAndCountAll({ limit, offset: (offset - 1) * limit });
