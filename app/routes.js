const usersController = require('./controllers/users');
const { healthCheck } = require('./controllers/healthCheck');
const { createUserSchema } = require('./schemas/users');
const { schemaValidator } = require('./middlewares/schemaValidator');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', schemaValidator(createUserSchema), usersController.createUser);
};
