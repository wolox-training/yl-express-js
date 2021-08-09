const usersController = require('./controllers/users');
const { healthCheck } = require('./controllers/healthCheck');
const { createUserSchema, paginationSchema, signInSchema } = require('./middlewares/schemas/users');
const { schemaValidator } = require('./middlewares/schemaValidator');
const { verifyToken } = require('./middlewares/auth');

exports.init = app => {
  app.get('/health', healthCheck);
  app
    .route('/users')
    .get([schemaValidator(paginationSchema), verifyToken], usersController.getUsers)
    .post([schemaValidator(createUserSchema)], usersController.createUser);
  app.post('/users/sessions', [schemaValidator(signInSchema)], usersController.signIn);
};
