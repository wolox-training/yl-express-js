const usersController = require('./controllers/users');
const { healthCheck } = require('./controllers/healthCheck');
const { createUserSchema, signInSchema } = require('./middlewares/schemas/users');
const { schemaValidator } = require('./middlewares/schemaValidator');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [schemaValidator(createUserSchema)], usersController.createUser);
  app.post('/users/sessions', [schemaValidator(signInSchema)], usersController.signIn);
};
