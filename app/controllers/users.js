const usersServices = require('../services/users');
const {
  statusMessages: { CREATED }
} = require('../constants');

exports.createUser = (req, res, next) => {
  usersServices
    .createUser(req.body)
    .then(value => {
      res.status(201).send({
        data: { email: value.email },
        message: CREATED
      });
    })
    .catch(next);
};
