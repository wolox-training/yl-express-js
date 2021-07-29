const errors = require('../../app/errors');
const { authMessages, statusMessages, validationMessages } = require('../../app/constants/');

// Mocking data
exports.mockUser = {
  firstName: 'yovanny',
  lastName: 'lopez',
  email: 'yovanny.lopez@wolox.co',
  password: 'p4ssw0rd'
};
const numberValue = 123;

// Correct data
exports.correctWoloxEmail = [
  { ...exports.mockUser, email: 'test@wolox.ar' },
  { ...exports.mockUser, email: 'test@wolox.cl' },
  { ...exports.mockUser, email: 'test@wolox.co' },
  { ...exports.mockUser, email: 'test@wolox.mx' },
  { ...exports.mockUser, email: 'test@wolox.com.ar' },
  { ...exports.mockUser, email: 'test@wolox.com.mx' }
];

// correct messages data
exports.userAuthResponse = {
  message: authMessages.LOGGED
};
exports.userCreatedResponse = {
  user: {
    first_name: 'yovanny',
    last_name: 'lopez',
    email: 'yovanny.lopez@wolox.co'
  },
  message: statusMessages.CREATED
};

// Wrong data
exports.randomMissingParams = [
  {},
  {
    firstName: exports.mockUser.firstName,
    email: exports.mockUser.email,
    password: exports.mockUser.password
  },
  {
    lastName: exports.mockUser.lastName,
    email: exports.mockUser.email,
    password: exports.mockUser.password
  },
  {
    firstName: exports.mockUser.firstName,
    lastName: exports.mockUser.lastName,
    password: exports.mockUser.password
  },
  {
    firstName: exports.mockUser.firstName,
    lastName: exports.mockUser.lastName,
    email: exports.mockUser.email
  },
  {
    firstName: numberValue,
    lastName: numberValue,
    email: numberValue,
    password: numberValue
  }
];
exports.signInEmpty = {
  email: '',
  password: ''
};
exports.wrongEmail = 'yovanny@wolox.co';
exports.wrongPassword = 'abc1234a';
exports.wrongCredentials = {
  email: exports.wrongEmail,
  password: exports.wrongPassword
};
exports.wrongPasswords = [
  { ...exports.mockUser.email, password: '12345678' },
  { ...exports.mockUser.email, password: 'abc123' },
  { ...exports.mockUser.email, password: '°$%&?~^`' },
  { ...exports.mockUser.email, password: '' },
  { ...exports.mockUser.email, password: 12345678 }
];
exports.wrongWoloxEmail = [
  { ...exports.mockUser, email: 'test@domain.com' },
  { ...exports.mockUser, email: 'test@domain.co' },
  { ...exports.mockUser, email: 'test@wolox.com' },
  { ...exports.mockUser, email: 'test@wolox.com.cl' },
  { ...exports.mockUser, email: 'test@wolox.com.co' },
  { ...exports.mockUser, email: 'test@wolox.a' },
  { ...exports.mockUser, email: 'test@wolox.ww' }
];

// wrong messages data
exports.conflictErrorResponse = {
  message: validationMessages.EMAIL_ALREADY_ERROR,
  internal_code: errors.CONFLICT_ERROR
};
