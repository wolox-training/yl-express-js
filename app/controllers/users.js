const usersServices = require('../services/users');
const { userSerializer } = require('../serializers/users');
const {
  authMessages: { LOGGED },
  statusMessages: { CREATED }
} = require('../constants');

exports.createUser = (req, res, next) =>
  usersServices
    .createUser(req.body)
    .then(userInfo =>
      res.status(201).send({
        user: userSerializer(userInfo),
        message: CREATED
      })
    )
    .catch(next);

exports.signIn = async ({ body: { email, password } }, res, next) => {
  await usersServices
    .signIn(email, password)
    .then(tokenInfo =>
      res.status(200).send({
        tokenInfo,
        message: LOGGED
      })
    )
    .catch(next);
};
