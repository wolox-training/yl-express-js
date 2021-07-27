const request = require('supertest');

const app = require('../../app.js');
const { createUser } = require('../factory/users');
const { AUTH_ERROR, CONFLICT_ERROR, SCHEMA_ERROR } = require('../../app/errors');
const {
  statusCode: { CONFLICT_CODE, CREATED_CODE, NOT_AUTH_CODE, OK_CODE, UNPROCESSABLE_ENTITY_CODE }
} = require('../../app/constants/');
const {
  conflictErrorResponse,
  correctWoloxEmail,
  mockUser,
  randomMissingParams,
  signInEmpty,
  userAuthResponse,
  userCreatedResponse,
  wrongCredentials,
  wrongEmail,
  wrongPassword,
  wrongPasswords,
  wrongWoloxEmail
} = require('../fixtures/users');

const DEFAULT_HEADER = ['Accept', 'application/json'];
const SIGN_IN_PATH = '/users/sessions';
const USERS_PATH = '/users';

describe(`Sign Up endpoint POST ${USERS_PATH} - suite`, () => {
  let response = {};
  beforeAll(async () => {
    try {
      response = await request(app)
        .post(USERS_PATH)
        .set(DEFAULT_HEADER)
        .send(mockUser);
    } catch (err) {
      throw err;
    }
  });
  describe('satisfactory cases - suite', () => {
    test('create a new user', () => expect(response.statusCode).toBe(CREATED_CODE));
    test('success response (when user was created)', () =>
      expect(response.body).toStrictEqual(userCreatedResponse));
    test('should be not return password', () => expect(response.body).not.toHaveProperty('password'));
    test.each(correctWoloxEmail)('user created with a valid wolox email: %p', randomTestData =>
      request(app)
        .post(USERS_PATH)
        .set(DEFAULT_HEADER)
        .send(randomTestData)
        .then(res => expect(res.statusCode).toBe(CREATED_CODE))
    );
  });
  describe('failed cases - suite', () => {
    describe('failed with an email already exists', () => {
      beforeAll(async () => {
        try {
          await createUser();
          response = await request(app)
            .post(USERS_PATH)
            .set(DEFAULT_HEADER)
            .send(mockUser);
        } catch (err) {
          throw err;
        }
      });
      test(`should be return status code ${CONFLICT_CODE}`, () =>
        expect(response.status).toBe(CONFLICT_CODE));
      test(`should be return internal code ${CONFLICT_ERROR}`, () =>
        expect(response.body).toMatchObject({ internal_code: CONFLICT_ERROR }));
      test('should be return conflict error reponse (when email already)', () =>
        expect(response.body).toStrictEqual(conflictErrorResponse));
    });
    describe('failed with an email invalid', () => {
      test.each(wrongWoloxEmail)('failed with invalid wolox emails: %p', randomTestData =>
        request(app)
          .post(USERS_PATH)
          .set(DEFAULT_HEADER)
          .send(randomTestData)
          .catch(() => expect(response.statusCode).toBe(UNPROCESSABLE_ENTITY_CODE))
      );
    });
    describe('failed with an incorrect password', () => {
      beforeAll(async () => {
        try {
          response = await request(app)
            .post(USERS_PATH)
            .set(DEFAULT_HEADER)
            .send({ ...mockUser, password: wrongPassword });
        } catch (err) {
          throw err;
        }
      });
      test.each(wrongPasswords)('failed with invalid passwords: %p', randomTestData =>
        request(app)
          .post(USERS_PATH)
          .set(DEFAULT_HEADER)
          .send(randomTestData)
          .catch(res => expect(res.statusCode).toBe(UNPROCESSABLE_ENTITY_CODE))
      );
    });
    describe('failed with empty param(s)', () => {
      beforeAll(async () => {
        try {
          response = await request(app)
            .post(USERS_PATH)
            .set(DEFAULT_HEADER)
            .send({});
        } catch (err) {
          throw err;
        }
      });
      test(`should be return status code ${UNPROCESSABLE_ENTITY_CODE}`, () =>
        expect(response.status).toBe(UNPROCESSABLE_ENTITY_CODE));
      test(`should be return internal code ${SCHEMA_ERROR}`, () =>
        expect(response.body).toMatchObject({ internal_code: SCHEMA_ERROR }));
      test.each(randomMissingParams)('failed with an or more missing parameter: %p', randomTestData =>
        request(app)
          .post(USERS_PATH)
          .set(DEFAULT_HEADER)
          .send(randomTestData)
          .catch(() => expect(response.statusCode).toBe(UNPROCESSABLE_ENTITY_CODE))
      );
    });
  });
});

describe(`Sign In endpoint POST ${SIGN_IN_PATH} - suite`, () => {
  describe('satisfactory cases - suite', () => {
    describe('sign in with correct credentials', () => {
      let response = {};
      beforeAll(async () => {
        try {
          await createUser();
          const { email, password } = mockUser;
          response = await request(app)
            .post(SIGN_IN_PATH)
            .set(DEFAULT_HEADER)
            .send({ email, password });
        } catch (err) {
          throw err;
        }
      });
      test(`should be return status code ${OK_CODE}`, () => expect(response.status).toBe(OK_CODE));
      test('should be get a token', () => expect(response.body.token).toBeDefined());
      test('should be return a sign in succesfully message', () =>
        expect(response.body.message).toStrictEqual(userAuthResponse.message));
    });
  });
  describe('failed cases - suite', () => {
    describe('failed with incorrect email credential', () => {
      let response = {};
      beforeAll(async () => {
        try {
          await createUser();
          const { password } = mockUser;
          response = await request(app)
            .post(SIGN_IN_PATH)
            .set(DEFAULT_HEADER)
            .send({ password, email: wrongEmail });
        } catch (err) {
          throw err;
        }
      });
      test(`should be return status code ${NOT_AUTH_CODE}`, () =>
        expect(response.status).toBe(NOT_AUTH_CODE));
      test(`should be return internal code ${AUTH_ERROR}`, () =>
        expect(response.body).toMatchObject({ internal_code: AUTH_ERROR }));
    });
    describe('failed with incorrect password credential', () => {
      let response = {};
      beforeAll(async () => {
        try {
          await createUser();
          const { email } = mockUser;
          response = await request(app)
            .post(SIGN_IN_PATH)
            .set(DEFAULT_HEADER)
            .send({ email, password: wrongPassword });
        } catch (err) {
          throw err;
        }
      });
      test(`should be return status code ${NOT_AUTH_CODE}`, () =>
        expect(response.status).toBe(NOT_AUTH_CODE));
      test(`should be return internal code ${AUTH_ERROR}`, () =>
        expect(response.body).toMatchObject({ internal_code: AUTH_ERROR }));
    });
    describe('failed with incorrect credentials', () => {
      let response = {};
      beforeAll(async () => {
        try {
          await createUser();
          response = await request(app)
            .post(SIGN_IN_PATH)
            .set(DEFAULT_HEADER)
            .send(wrongCredentials);
        } catch (err) {
          throw err;
        }
      });
      test(`should be return status code ${NOT_AUTH_CODE}`, () =>
        expect(response.status).toBe(NOT_AUTH_CODE));
      test(`should be return internal code ${AUTH_ERROR}`, () =>
        expect(response.body).toMatchObject({ internal_code: AUTH_ERROR }));
    });
    describe('failed with empty credentials', () => {
      let response = {};
      beforeAll(async () => {
        try {
          response = await request(app)
            .post(SIGN_IN_PATH)
            .set(DEFAULT_HEADER)
            .send(signInEmpty);
        } catch (err) {
          throw err;
        }
      });
      test(`should be return status code ${UNPROCESSABLE_ENTITY_CODE}`, () =>
        expect(response.status).toBe(UNPROCESSABLE_ENTITY_CODE));
      test(`should be return internal code ${SCHEMA_ERROR}`, () =>
        expect(response.body).toMatchObject({ internal_code: SCHEMA_ERROR }));
    });
  });
});
