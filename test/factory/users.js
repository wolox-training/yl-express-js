const { factory } = require('factory-girl');

const { factoryByModel } = require('./factory_by_models');
const { user } = require('../fixtures/users');

const modelName = 'User';

factoryByModel(modelName, false);

module.exports = {
  create: () => factory.create(modelName, user)
};
