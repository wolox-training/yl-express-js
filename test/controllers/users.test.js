const request = require('supertest');

const app = require('../../app.js');
const userFactory = require('../factory/users');
const {
  statusCode: {
    CONFLICT_CODE,
    CREATED_CODE,
    NOT_AUTH_CODE,
    NOT_FOUND_CODE,
    OK_CODE,
    UNPROCESSABLE_ENTITY_CODE
  }
} = require('../../app/constants/');
const {
  emailInvalidResponse,
  emailNotFoundResponse,
  externalEmail,
  conflictErrorResponse,
  correctWoloxEmail,
  loginEmptyDataResponse,
  loginEmptyData,
  noAuthResponse,
  randomMissingParams,
  user: userTestInfo,
  userAuthResponse,
  userCreatedResponse,
  wrongLoginParams,
  wrongUserLogin,
  wrongPasswords,
  wrongWoloxEmail
} = require('../fixtures/users');

const DEFAULT_HEADER = ['Accept', 'application/json'];
const SIGN_IN_PATH = '/users/sessions';
const USERS_PATH = '/users';

describe(`SignUp endpoint POST ${USERS_PATH}`, () => {
  describe('satisfactory cases - suite', () => {
    test('success json reponse (when users was created)', () =>
      request(app)
        .post(USERS_PATH)
        .set(DEFAULT_HEADER)
        .send(userTestInfo)
        .then(res => expect(res.body).toStrictEqual(userCreatedResponse)));
    test('user successfully created', () =>
      request(app)
        .post(USERS_PATH)
        .set(DEFAULT_HEADER)
        .send(userTestInfo)
        .then(res => expect(res.statusCode).toBe(CREATED_CODE)));
    test.each(correctWoloxEmail)('user created with a valid wolox email: %p', randomTestData =>
      request(app)
        .post(USERS_PATH)
        .set(DEFAULT_HEADER)
        .send(randomTestData)
        .then(res => expect(res.statusCode).toBe(CREATED_CODE))
    );
  });
  describe('failed cases - suite', () => {
    test('failed with an email already exists', () =>
      userFactory
        .create()
        .then(() =>
          request(app)
            .post(USERS_PATH)
            .set(DEFAULT_HEADER)
            .send(userTestInfo)
        )
        .catch(res => expect(res.statusCode).toBe(CONFLICT_CODE)));
    test('conflict error json reponse (when email already)', () =>
      userFactory
        .create()
        .then(() =>
          request(app)
            .post(USERS_PATH)
            .set(DEFAULT_HEADER)
            .send(userTestInfo)
        )
        .catch(res => expect(res.body).toStrictEqual(conflictErrorResponse)));
    test.each(randomMissingParams)('failed with an or more missing parameter: %p', randomTestData =>
      userFactory
        .create()
        .then(() =>
          request(app)
            .post(USERS_PATH)
            .set(DEFAULT_HEADER)
            .send(randomTestData)
        )
        .catch(res => expect(res.statusCode).toBe(UNPROCESSABLE_ENTITY_CODE))
    );
    test.each(wrongPasswords)('failed cases with an invalid passwords: %p', randomTestData =>
      userFactory
        .create()
        .then(() =>
          request(app)
            .post(USERS_PATH)
            .set(DEFAULT_HEADER)
            .send(randomTestData)
        )
        .catch(res => expect(res.statusCode).toBe(UNPROCESSABLE_ENTITY_CODE))
    );
    test.each(wrongWoloxEmail)('failed cases with an invalid wolox email: %p', randomTestData =>
      userFactory
        .create()
        .then(() =>
          request(app)
            .post(USERS_PATH)
            .set(DEFAULT_HEADER)
            .send(randomTestData)
        )
        .catch(res => expect(res.statusCode).toBe(UNPROCESSABLE_ENTITY_CODE))
    );
  });
});

describe(`SignIn endpoint POST ${SIGN_IN_PATH}`, () => {
  beforeEach(async () => {
    await request(app)
      .post(USERS_PATH)
      .set(DEFAULT_HEADER)
      .send(userTestInfo);
  });
  describe('satisfactory cases - suite', () => {
    test('the user should be sign in succesfully and get a token', () =>
      request(app)
        .post(SIGN_IN_PATH)
        .set(DEFAULT_HEADER)
        .send(userTestInfo)
        .expect('Content-Type', /json/)
        .expect(OK_CODE)
        .then(res => {
          expect(res.body.token).toBeDefined();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toStrictEqual(userAuthResponse.message);
        }));
  });
  describe('failed cases - suite', () => {
    test('should be return an error when email is not registered or not found', () =>
      request(app)
        .post(SIGN_IN_PATH)
        .set(DEFAULT_HEADER)
        .send(wrongUserLogin)
        .expect('Content-Type', /json/)
        .expect(NOT_FOUND_CODE)
        .catch(res => expect(res.body).toEqual(emailNotFoundResponse)));
    test('should be return an error when password is incorrect', () =>
      request(app)
        .post(SIGN_IN_PATH)
        .set(DEFAULT_HEADER)
        .send({ ...userTestInfo, password: '1234567b' })
        .expect('Content-Type', /json/)
        .expect(NOT_AUTH_CODE)
        .catch(res => expect(res.body).toEqual(noAuthResponse)));
    test('should be return an error when email does not belong to Wolox', () =>
      request(app)
        .post(SIGN_IN_PATH)
        .set(DEFAULT_HEADER)
        .send({ ...userTestInfo, email: externalEmail })
        .expect('Content-Type', /json/)
        .expect(UNPROCESSABLE_ENTITY_CODE)
        .catch(res => expect(res.body).toEqual(emailInvalidResponse)));
    test('should be return an error message when data is empty', () =>
      request(app)
        .post(SIGN_IN_PATH)
        .set(DEFAULT_HEADER)
        .send({ email: '', password: '' })
        .catch(res => expect(res.body).toEqual(loginEmptyDataResponse)));
    test.each(loginEmptyData)('should be return an error with missing parameter(s) %p', randomTestData =>
      request(app)
        .post(SIGN_IN_PATH)
        .set(DEFAULT_HEADER)
        .send(randomTestData)
        .then(res => expect(res.statusCode).toBe(UNPROCESSABLE_ENTITY_CODE))
    );
    test.each(wrongLoginParams)('should be return an error with invalid parameter(s) %p', randomTestData =>
      request(app)
        .post(SIGN_IN_PATH)
        .set(DEFAULT_HEADER)
        .send(randomTestData)
        .then(res => expect(res.statusCode).toBe(UNPROCESSABLE_ENTITY_CODE))
    );
  });
});
