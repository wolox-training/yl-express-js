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

// Correct data
exports.user = {
  id: 1,
  firstName: 'brendan',
  lastName: 'eich',
  email: 'test@wolox.co',
  password: 'abc12345'
};
exports.correctWoloxEmail = [
  { ...userTestInfo2, email: 'test@wolox.ar' },
  { ...userTestInfo2, email: 'test@wolox.cl' },
  { ...userTestInfo2, email: 'test@wolox.co' },
  { ...userTestInfo2, email: 'test@wolox.mx' },
  { ...userTestInfo2, email: 'test@wolox.com.ar' },
  { ...userTestInfo2, email: 'test@wolox.com.mx' }
];
exports.userCreatedResponse = {
  user: {
    first_name: 'brendan',
    last_name: 'eich',
    email: 'test@wolox.co'
  },
  message: 'successfully created'
};

// Wrong data
exports.conflictErrorResponse = {
  internal_code: 'conflict_error',
  message: 'email already exists'
};
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
exports.wrongPasswords = [
  { ...userTestInfo1, password: '12345678' },
  { ...userTestInfo1, password: 'abc123' },
  { ...userTestInfo1, password: '°$%&?~^`' },
  { ...userTestInfo1, password: '' },
  { ...userTestInfo1, password: 12345678 }
];
exports.wrongWoloxEmail = [
  { ...userTestInfo2, email: 'test@domain.com' },
  { ...userTestInfo2, email: 'test@domain.co' },
  { ...userTestInfo2, email: 'test@wolox.com' },
  { ...userTestInfo2, email: 'test@wolox.com.cl' },
  { ...userTestInfo2, email: 'test@wolox.com.co' },
  { ...userTestInfo2, email: 'test@wolox.a' },
  { ...userTestInfo2, email: 'test@wolox.ww' }
];
