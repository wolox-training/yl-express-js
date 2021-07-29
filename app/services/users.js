const errors = require('../errors');
const logger = require('../logger');
const { comparePassword, createHash } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { pagination } = require('../helpers/pagination');
const { User } = require('../models');
const {
  authMessages: { LOGGED, WRONG_LOGIN },
  pagination: { LIMIT_PAGINATION, OFFSET_PAGINATION },
  statusMessages: { CREATED, GET_USERS_ERROR, NOT_CREATED },
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

exports.getUsers = async ({ limit = LIMIT_PAGINATION, offset = OFFSET_PAGINATION }) => {
  try {
    const { count, rows } = await pagination(User, limit, offset);
    const users = rows.map(user => user);
    return { count, limit, offset, users };
  } catch (error) {
    logger.error(`users: ${GET_USERS_ERROR}`);
    throw errors.databaseError(GET_USERS_ERROR);
  }
};
