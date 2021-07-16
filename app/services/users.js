const errors = require('../errors');
const logger = require('../logger');
const { createHash } = require('../helpers/bcrypt');
const { User } = require('../models');
const {
  statusMessages: { CREATED, NOT_CREATED },
  validationMessages: { EMAIL_ALREADY_ERROR }
} = require('../constants');

exports.createUser = async ({ firstName, lastName, email, password }) => {
  try {
    const passwordHashed = await createHash(password);
    const result = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHashed
    });
    logger.info(`user with name: "${firstName}", was ${CREATED}`);
    return result;
  } catch (error) {
    logger.error(`user ${NOT_CREATED} -- ${EMAIL_ALREADY_ERROR}`);
    throw errors.conflictError(EMAIL_ALREADY_ERROR);
  }
};
