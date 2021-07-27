const { factory } = require('factory-girl');

const { createHash } = require('../../app/helpers/bcrypt');
const { factoryByModel } = require('./factory_by_models');
const { mockUser } = require('../fixtures/users');

factoryByModel('User', { ...mockUser, password: () => createHash(mockUser.password) });

exports.createUser = () => factory.create('User');
