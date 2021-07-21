const {
  authMessages: { AUTH_ERROR, LOGGED },
  statusMessages: { CREATED },
  validationMessages: { EMAIL_ALREADY_ERROR }
} = require('../../app/constants/');

module.exports = {
  '/users': {
    post: {
      tags: ['Users'],
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
          description: 'New user created',
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
  },
  '/users/sessions': {
    post: {
      tags: ['Users'],
      description: 'Get token by authentication',
      operationId: 'signIn',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SignIn'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'token generated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignIn'
              },
              example: {
                tokenInfo: {
                  token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMDAwQHdvbG94LmNvIiwiaWF0IjoxNjI2OTYwMzAzfQ.cbX3jUeLkfKbwA65Ez2029xLY98dn8pvu54PiQO4J-8'
                },
                message: LOGGED
              }
            }
          }
        },
        401: {
          description: 'User no authorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignIn'
              },
              example: {
                message: AUTH_ERROR,
                internal_code: 'auth_error'
              }
            }
          }
        },
        422: {
          description: 'Error unprocessable entity',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignIn'
              },
              example: {
                message: {
                  value: 'test@wolox.com',
                  msg: 'email: user no authenticated',
                  param: 'email',
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
