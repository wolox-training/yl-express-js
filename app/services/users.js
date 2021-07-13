const logger = require('../logger');

const { errors } = require('../errors');
const { User } = require('../models');

exports.createUser = ({ firstName, lastName, email, password }) =>
  User.findOne({ where: { email } })
    .catch(err => {
      logger.error(`Database Find Error: ${JSON.stringify(err)}`);
      throw errors.databaseError();
    })
    .then(user => {
      if (user) {
        logger.error(`email already: ${JSON.stringify(email)}`);
        throw errors.emailExistsError();
      }
      logger.info(`user with email: "${email}", successfully created`);
      User.create({
        firstName,
        lastName,
        email,
        password
      }).catch(err => {
        logger.error(`Database Create Error: ${JSON.stringify(err)}`);
        throw errors.databaseError();
      });
    });
