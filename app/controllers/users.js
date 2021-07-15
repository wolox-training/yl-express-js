const usersServices = require('../services/users');
const { userSerializer } = require('../serializers/users');
const {
  statusMessages: { CREATED }
} = require('../constants');

exports.createUser = (req, res, next) => {
  usersServices
    .createUser(req.body)
    .then(value => {
      res.status(201).send({
        user: userSerializer(value),
        message: CREATED
      });
    })
    .catch(next);
};
