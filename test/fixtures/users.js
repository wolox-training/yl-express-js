const errors = require('../../app/errors');
const { authMessages, statusMessages, validationMessages } = require('../../app/constants/');

// Mocking data
const userTestInfo1 = {
  id: 1,
  firstName: 'brendan',
  lastName: 'eich',
  email: 'test@wolox.co'
};
const userTestInfo2 = {
  id: 1,
  firstName: 'brendan',
  lastName: 'eich',
  password: 'abc12345'
};
const userTestLogin = {
  email: 'test@wolox.co',
  password: 'abc12345'
};

// Correct data
exports.user = {
  id: 1,
  firstName: 'brendan',
  lastName: 'eich',
  email: userTestLogin.email,
  password: userTestLogin.password
};
exports.correctWoloxEmail = [
  { ...userTestInfo2, email: 'test@wolox.ar' },
  { ...userTestInfo2, email: 'test@wolox.cl' },
  { ...userTestInfo2, email: 'test@wolox.co' },
  { ...userTestInfo2, email: 'test@wolox.mx' },
  { ...userTestInfo2, email: 'test@wolox.com.ar' },
  { ...userTestInfo2, email: 'test@wolox.com.mx' }
];

// correct messages data
exports.userAuthResponse = {
  message: authMessages.LOGGED
};
exports.userCreatedResponse = {
  user: {
    first_name: 'brendan',
    last_name: 'eich',
    email: 'test@wolox.co'
  },
  message: statusMessages.CREATED
};

// Wrong data
exports.externalEmail = {
  email: 'test@wolox.com'
};
exports.loginEmptyData = [
  {
    email: ''
  },
  {
    password: ''
  },
  {
    email: '',
    password: ''
  }
];
exports.randomMissingParams = [
  {},
  {
    firstName: 'brendan',
    email: 'test@wolox.co',
    password: 'abc12345'
  },
  {
    lastName: 'eich',
    email: 'test@wolox.co',
    password: 'abc12345'
  },
  {
    firstName: 'brendan',
    lastName: 'eich',
    password: 'abc12345'
  },
  {
    firstName: 'brendan',
    lastName: 'eich',
    email: 'test@wolox.co'
  },
  {
    firstName: 12345,
    lastName: 12345,
    email: 12345,
    password: 12345
  }
];
exports.wrongLoginParams = [
  {},
  { ...userTestLogin, email: 12345678 },
  { ...userTestLogin, email: true },
  { ...userTestLogin, password: 12345678 },
  { ...userTestLogin, password: true }
];
exports.wrongPasswords = [
  { ...userTestInfo1, password: '12345678' },
  { ...userTestInfo1, password: 'abc123' },
  { ...userTestInfo1, password: '°$%&?~^`' },
  { ...userTestInfo1, password: '' },
  { ...userTestInfo1, password: 12345678 }
];
exports.wrongUserLogin = {
  email: 'tests@wolox.co',
  password: 'abc12345'
};
exports.wrongWoloxEmail = [
  { ...userTestInfo2, email: 'test@domain.com' },
  { ...userTestInfo2, email: 'test@domain.co' },
  { ...userTestInfo2, email: 'test@wolox.com' },
  { ...userTestInfo2, email: 'test@wolox.com.cl' },
  { ...userTestInfo2, email: 'test@wolox.com.co' },
  { ...userTestInfo2, email: 'test@wolox.a' },
  { ...userTestInfo2, email: 'test@wolox.ww' }
];

// wrong messages data
exports.conflictErrorResponse = {
  message: validationMessages.EMAIL_ALREADY_ERROR,
  internal_code: errors.CONFLICT_ERROR
};
exports.emailInvalidResponse = {
  message: {
    value: {
      email: this.externalEmail.email
    },
    msg: authMessages.AUTH_ERROR,
    param: 'email',
    location: 'body'
  },
  internal_code: errors.SCHEMA_ERROR
};
exports.emailNotFoundResponse = {
  message: `User with email ${this.wrongUserLogin.email} not found`,
  internal_code: errors.NOT_FOUND_ERROR
};
exports.loginEmptyDataResponse = {
  message: {
    value: '',
    msg: validationMessages.NOT_EMPTY_ERROR,
    param: 'email',
    location: 'body'
  },
  internal_code: errors.SCHEMA_ERROR
};
exports.noAuthResponse = {
  message: authMessages.AUTH_ERROR,
  internal_code: errors.AUTH_ERROR
};
