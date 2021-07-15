const usersServices = require('../services/users');
const { userSerializer } = require('../serializers/users');

const {
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
