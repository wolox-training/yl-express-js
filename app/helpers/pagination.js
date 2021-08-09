const errors = require('../errors');

exports.pagination = (model, page, size) =>
  model.findAndCountAll({ limit: size, offset: page * size }).catch(error => {
    throw errors.databaseError(error.message);
  });

exports.paginatedContent = (count, page, size) => {
  const totalPages = Math.ceil(count / size);
  const pageSize = Math.ceil(count / (size + 1));
  const previousPage = page === 0 ? null : page - 1;
  const nextPage = page >= pageSize ? null : page + 1;

  return {
    nextPage,
    previousPage,
    totalPages
  };
};
