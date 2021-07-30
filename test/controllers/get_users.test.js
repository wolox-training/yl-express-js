const request = require('supertest');

const app = require('../../app.js');
const { createUser } = require('../factory/users');
const {
  statusCode: { NOT_AUTH_CODE, OK_CODE },
  statusMessages: { GET_USERS_OK }
} = require('../../app/constants/');
const {
  expiredTokenResponse,
  invalidToken,
  invalidTokenResponse,
  mockUser,
  queryParamsErrorResponse
} = require('../fixtures/users');

const DEFAULT_HEADER = ['Accept', 'application/json'];
const SIGN_IN_PATH = '/users/sessions';
const USERS_PATH = '/users';

describe(`Users endpoint GET ${USERS_PATH}`, () => {
  let access_token = null;
  let response = {};
  beforeAll(async () => {
    await createUser();
    const { email, password } = mockUser;
    response = await request(app)
      .post(SIGN_IN_PATH)
      .set(DEFAULT_HEADER)
      .send({ email, password });
    access_token = response.body.token;
  });

  describe('satisfactory cases - suite', () => {
    beforeAll(async () => {
      response = await request(app)
        .get(USERS_PATH)
        .set('Authorization', `Bearer ${access_token}`);
    });
    test(`Should be return a status code ${OK_CODE}`, () => expect(response.statusCode).toBe(OK_CODE));
    test('Should be return a list of users', () => expect(response.body.users).toBeDefined());
    test('Should be return a list of users in an array', () =>
      expect(response.body.users).toEqual(expect.arrayContaining([])));
    test(`Should be return a "${GET_USERS_OK}" message`, () =>
      expect(response.body.message).toEqual(GET_USERS_OK));

    describe('query params and pagination', () => {
      test('Should be return a list of users with limit=25 by default', () =>
        expect(response.body.pagination.limit).toBe(25));
      test('Should be return a list of users with offset=1 by default', () =>
        expect(response.body.pagination.offset).toBe(1));
      test('Should be return the first page with a limit of one', () =>
        request(app)
          .get(`${USERS_PATH}?limit=1`)
          .set('Authorization', `Bearer ${access_token}`)
          .then(res => {
            expect(res.body.pagination.limit).toBe(1);
            expect(res.body.pagination.offset).toBe(1);
            expect(res.body.pagination.total_records).toBeDefined();
          }));
      test('Should be return the second page with a limit of one', () =>
        request(app)
          .get(`${USERS_PATH}?limit=1&offset=2`)
          .set('Authorization', `Bearer ${access_token}`)
          .then(res => {
            expect(res.body.pagination.limit).toBe(1);
            expect(res.body.pagination.offset).toBe(2);
            expect(res.body.pagination.total_records).toBeDefined();
          }));
      test('Should be return the users total records', () =>
        expect(response.body.pagination.total_records).toBe(response.body.users.length));
    });
  });

  describe('failed cases - suite', () => {
    test('Should be return an error when no token exist', () =>
      request(app)
        .get(USERS_PATH)
        .catch(res => {
          expect(res.statusCode).toEqual(NOT_AUTH_CODE);
          expect(res.body).toEqual(invalidTokenResponse);
        }));
    test('Should be return an error when token is invalid', () =>
      request(app)
        .get(USERS_PATH)
        .set('Authorization', `Bearer ${invalidToken}`)
        .catch(res => {
          expect(res.statusCode).toEqual(NOT_AUTH_CODE);
          expect(res.body).toEqual(invalidTokenResponse);
        }));
    test('Should be return an error when expired token', () =>
      request(app)
        .get(USERS_PATH)
        .set('Authorization', `Bearer ${invalidToken.expiredToken}`)
        .catch(res => {
          expect(res.statusCode).toEqual(NOT_AUTH_CODE);
          expect(res.body).toEqual(expiredTokenResponse);
        }));
    test('Should be return a query params message error', () =>
      request(app)
        .get(`${USERS_PATH}?limit=string&offset=string`)
        .set('Authorization', `Bearer ${access_token}`)
        .catch(res => expect(res.body.message.msg).toEqual(queryParamsErrorResponse)));
  });
});
