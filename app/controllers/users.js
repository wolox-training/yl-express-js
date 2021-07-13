const errors = require('../errors');
const logger = require('../logger');
const usersServices = require('../services/users');

const { createHash } = require('../helpers/bcrypt');
const {
  statusMessages: { CREATED, NOT_CREATED }
} = require('../constants');

exports.createUser = async (req, res, next) => {
  const { body: userInfo } = req;
  try {
    const hashCode = await createHash(userInfo.password);
    if (hashCode) userInfo.password = hashCode;
    usersServices.createUser(userInfo);
    return res.status(201).send({
      data: { email: userInfo.email },
      message: CREATED
    });
  } catch (err) {
    logger.error(`${NOT_CREATED}: ${userInfo.email}`);
    return next(errors.schemaError(JSON.stringify(err.message)));
  }
};
