const request = require('supertest');

const app = require('../../app.js');
const userFactory = require('../factory/users');
const {
  CONFLICT_CODE,
  CREATED_CODE,
  DEFAULT_HEADER,
  UNPROCESSABLE_ENTITY_CODE,
  USERS_PATH
} = require('../constants/');
const {
  conflictErrorResponse,
  correctWoloxEmail,
  randomMissingParams,
  user: userTestInfo,
  userCreatedResponse,
  wrongPasswords,
  wrongWoloxEmail
} = require('../fixtures/users');

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
        .then(res => expect(res.statusCode).toBe(CONFLICT_CODE)));
    test('conflict error json reponse (when email already)', () =>
      userFactory
        .create()
        .then(() =>
          request(app)
            .post(USERS_PATH)
            .set(DEFAULT_HEADER)
            .send(userTestInfo)
        )
        .then(res => expect(res.body).toStrictEqual(conflictErrorResponse)));
    test.each(randomMissingParams)('failed with an or more missing parameter: %p', randomTestData =>
      userFactory
        .create()
        .then(() =>
          request(app)
            .post(USERS_PATH)
            .set(DEFAULT_HEADER)
            .send(randomTestData)
        )
        .then(res => expect(res.statusCode).toBe(UNPROCESSABLE_ENTITY_CODE))
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
        .then(res => expect(res.statusCode).toBe(UNPROCESSABLE_ENTITY_CODE))
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
        .then(res => expect(res.statusCode).toBe(UNPROCESSABLE_ENTITY_CODE))
    );
  });
});
