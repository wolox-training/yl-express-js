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
    .then(({ content, page, size, users }) =>
      res.status(OK_CODE).send({
        message: GET_USERS_OK,
        users: users.map(user => getUsersSerializer(user)),
        size: parseInt(size),
        page: parseInt(page),
        previous_page: content.previousPage,
        next_page: content.nextPage,
        total_pages: content.totalPages,
        total_records: content.count
      })
    )
    .catch(next);
