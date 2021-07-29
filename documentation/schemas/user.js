module.exports = {
  userFirstName: {
    type: 'string',
    required: true,
    example: 'john'
  },
  userLastName: {
    type: 'string',
    required: true,
    example: 'doe'
  },
  userEmail: {
    type: 'string',
    required: true,
    unique: true,
    example: 'test@wolox.co'
  },
  userPassword: {
    type: 'string',
    required: true,
    minLength: 8,
    example: 'SecurePassword1234'
  },
  limit: {
    name: 'limit',
    in: 'query',
    schema: {
      type: 'integer',
      default: 25
    },
    required: false
  },
  offset: {
    name: 'offset',
    in: 'query',
    schema: {
      type: 'integer',
      default: 1
    },
    required: false
  },
  SignIn: {
    type: 'object',
    properties: {
      email: {
        $ref: '#/components/schemas/userEmail'
      },
      password: {
        $ref: '#/components/schemas/userPassword'
      }
    }
  },
  User: {
    type: 'object',
    properties: {
      firstName: {
        $ref: '#/components/schemas/userFirstName'
      },
      lastName: {
        $ref: '#/components/schemas/userLastName'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      },
      password: {
        $ref: '#/components/schemas/userPassword'
      }
    }
  }
};
