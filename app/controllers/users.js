const usersServices = require('../services/users');
const { getUsersSerializer, userSerializer } = require('../serializers/users');

const {
  authMessages: { LOGGED },
  statusCode: { CREATED_CODE, OK_CODE },
  statusMessages: { CREATED, GET_USERS_OK }
} = require('../constants');

exports.createUser = (req, res, next) =>
  usersServices
    .createUser(req.body)
    .then(userInfo =>
      res.status(CREATED_CODE).send({
        user: userSerializer(userInfo),
        message: CREATED
      })
    )
    .catch(next);

exports.signIn = ({ body: { email, password } }, res, next) =>
  usersServices
    .signIn(email, password)
    .then(token => res.status(OK_CODE).send({ token, message: LOGGED }))
    .catch(next);

exports.getUsers = ({ query }, res, next) =>
  usersServices
    .getUsers(query)
    .then(({ count, limit, offset, users }) =>
      res.status(OK_CODE).send({
        users: users.map(user => getUsersSerializer(user)),
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          total_records: count
        },
        message: GET_USERS_OK
      })
    )
    .catch(next);
