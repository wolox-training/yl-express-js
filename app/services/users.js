const errors = require('../errors');
const logger = require('../logger');
const { comparePassword, createHash } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { pagination, paginatedContent } = require('../helpers/pagination');
const { User } = require('../models');
const {
  authMessages: { LOGGED, WRONG_LOGIN },
  pagination: { PAGE_PAGINATION, SIZE_PAGINATION },
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

exports.getUsers = async ({ page = PAGE_PAGINATION, size = SIZE_PAGINATION }) => {
  const { count, rows } = await pagination(User, page, size);
  const { nextPage, previousPage, totalPages } = paginatedContent(count, page, size);
  const users = rows.map(user => user);
  const content = { count, nextPage, previousPage, totalPages };
  return { content, page, size, users };
};
