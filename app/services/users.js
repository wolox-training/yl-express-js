const errors = require('../errors');
const logger = require('../logger');
const { comparePassword, createHash } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { User } = require('../models');
const {
  authMessages: { AUTH_ERROR, LOGGED },
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

exports.signIn = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw errors.notFoundError(`User with email ${email} not found`);

  const { password: hashedPassword } = user;
  const isValidPassword = await comparePassword(password, hashedPassword);
  if (!isValidPassword) throw errors.authError(AUTH_ERROR);

  const token = generateToken({ email });
  logger.info(`User "${email}" is ${LOGGED}`);

  return { token };
};
