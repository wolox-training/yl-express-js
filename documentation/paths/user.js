const {
  statusMessages: { CREATED },
  validationMessages: { EMAIL_ALREADY_ERROR }
} = require('../../app/constants/');

module.exports = {
  '/users': {
    post: {
      tags: ['User'],
      description: 'Create a new user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'New user was created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              },
              example: {
                user: {
                  first_name: 'john',
                  last_name: 'doe',
                  email: 'john.doe@wolox.co'
                },
                message: CREATED
              }
            }
          }
        },
        409: {
          description: 'Conflict error by email already exists',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              },
              example: {
                message: EMAIL_ALREADY_ERROR,
                internal_code: 'conflict_error'
              }
            }
          }
        },
        422: {
          description: 'Error unprocessable entity',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              },
              example: {
                message: {
                  value: 'value',
                  msg: 'message',
                  param: 'field',
                  location: 'body'
                },
                internal_code: 'schema_error'
              }
            }
          }
        }
      }
    }
  }
};
