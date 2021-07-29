const usersServices = require('../services/users');
const { userSerializer } = require('../serializers/users');

const {
  authMessages: { LOGGED },
  statusCode: { CREATED_CODE, OK_CODE },
  statusMessages: { CREATED }
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
