const logger = require('../logger');
const { conflictError, databaseError } = require('../errors');
const { createHash } = require('../helpers/bcrypt');
const { User } = require('../models');
const {
  validationMessages: { EMAIL_ALREADY_ERROR }
} = require('../constants');

exports.getUserByEmail = async email => {
  try {
    const result = await User.findOne({ where: { email } });
    return result;
  } catch (error) {
    logger.error(`Database error: ${error}`);
    throw databaseError();
  }
};

exports.createUser = async ({ firstName, lastName, email, password }) => {
  try {
    const hashCode = await createHash(password);
    const result = await User.create({
      firstName,
      lastName,
      email,
      password: hashCode
    });
    logger.info(`user with email: "${email}", successfully created`);
    return result;
  } catch (error) {
    logger.error(`Error signUp user: ${error}`);
    throw conflictError(EMAIL_ALREADY_ERROR);
  }
};
