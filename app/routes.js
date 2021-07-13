const usersController = require('./controllers/users');
const { healthCheck } = require('./controllers/healthCheck');

const { createUserValidator } = require('./schemas/users');
const { validateRequest } = require('./middlewares/requestValidator');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateRequest(createUserValidator), usersController.createUser);
};
