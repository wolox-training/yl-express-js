const {
  authMessages: { AUTH_ERROR, LOGGED },
  statusMessages: { CREATED },
  validationMessages: { EMAIL_ALREADY_ERROR }
} = require('../../app/constants/');

module.exports = {
  '/users': {
    get: {
      tags: ['Users'],
      description: 'List of users',
      operationId: 'getUsers',
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          $ref: '#/components/schemas/limit'
        },
        {
          $ref: '#/components/schemas/offset'
        }
      ],
      responses: {
        200: {
          description: 'Get a list of users',
          content: {
            'application/json': {
              example: {
                users: [
                  {
                    first_name: 'yovanny',
                    last_name: 'lopez',
                    email: 'yovanny.lopez@wolox.co',
                    created_at: '2021-07-26T18:31:17.102Z',
                    updated_at: '2021-07-26T18:31:17.102Z'
                  }
                ],
                pagination: {
                  limit: 1,
                  offset: 1,
                  total_records: 12
                },
                message: 'get users successfully'
              }
            }
          }
        },
        401: {
          description: 'Not authorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'invalid and/or expired token',
                internal_code: 'auth_error'
              }
            }
          }
        }
      }
    },
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
                token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMDAwQHdvbG94LmNvIiwiaWF0IjoxNjI2OTYwMzAzfQ.cbX3jUeLkfKbwA65Ez2029xLY98dn8pvu54PiQO4J-8',
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
