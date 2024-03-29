const errors = require('../errors');
const logger = require('../logger');
const { comparePassword, createHash } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { User } = require('../models');
const {
  authMessages: { LOGGED, WRONG_LOGIN },
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
  const findUserEmail = await User.findOne({ where: { email } });
  if (!findUserEmail) throw errors.authError(WRONG_LOGIN);

  const { password: hashedPassword } = findUserEmail;
  const isValidPassword = await comparePassword(password, hashedPassword);
  if (!isValidPassword) throw errors.authError(WRONG_LOGIN);

  logger.info(`User "${email}" is ${LOGGED}`);
  const token = generateToken({ email });

  return token;
};
