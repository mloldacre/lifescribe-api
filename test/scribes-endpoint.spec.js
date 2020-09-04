//TODO Create test for Scribe authenticated endpoint
const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const test = require('./test-fixtures');
const supertest = require('supertest');

describe.only('Scribes Endpoints', () => {
  let db;

  const { testUsers, testScribes, testScribbles } = test.makeScribesFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => test.cleanTables(db));

  afterEach('cleanup', () => test.cleanTables(db));

  describe('Protected endpoints', () => {
    beforeEach('insert scribbles', () =>
      test.seedScribbleTables(db, testUsers, testScribes, testScribbles)
    );

    const protectedEndpoints = [
      {
        name: 'GET /api/scribes/:scribe_id',
        path: '/api/scribes/1'
      },
      // {
      //   name: 'GET /api/scribes/:scribe_id/scribbles',
      //   path: '/api/scribes/1/scribbles'
      // }
    ];

    protectedEndpoints.forEach(endpoint => {

      describe(endpoint.name, () => {
        it('responds with 401 \'Missing bearer token\' when no bearer token', () => {
          return supertest(app)
            .get(endpoint.path)
            .expect(401, { error: 'Missing bearer token' });
        });
      });

      it('responds 401 \'Unauthorized request\' when no credentials in token', () => {
        const userNoCreds = { user_name: '', password: '' };
        return supertest(app)
          .get(endpoint.path)
          .set('Authorization', test.makeJWTAuthHeader(userNoCreds))
          .expect(401, { error: 'Unauthorized request' });
      });

      it('responds 401 \'Unauthorized request\' when invalid user', () => {
        const userInvalidUsername = { user_name: 'user-not', password: 'existy' };
        return supertest(app)
          .get(endpoint.path)
          .set('Authorization', test.makeBasicAuthHeader(userInvalidUsername))
          .expect(401, { error: 'Unauthorized request' });
      });

      it.only('responds 401 \'Unauthorized request\' when invalid password', () => {
        const userInvalidPass = { user_name: testUsers[0].user_name, password: 'WRONG' };
        return supertest(app)
          .get(endpoint.path)
          .set('Authorization', test.makeBasicAuthHeader(userInvalidPass))
          .expect(401, { error: 'Unauthorized request' });
      });
    });
  });

  describe('GET /api/scribes', () => {
    context('Given no scribes', () => {
      beforeEach('insert scribes', () =>
        test.seedUserTables(db, testUsers)
      );
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/scribes')
          .set('Authorization', test.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });
    });

    context('Given there are scribes in database', () => {
      beforeEach('insert scribes', () =>
        test.seedScribeTables(db, testUsers, testScribes)
      );

      it('responds with 200 and all scribes', () => {
        const expectedScribes = testScribes.map(scribe =>
          test.makeExpectedScribe(testUsers, scribe)
        );
        return supertest(app)
          .get('/api/scribes')
          .set('Authorization', test.makeAuthHeader(testUsers[0]))
          .expect(200, expectedScribes);
      });

      it('responds with 401 when API token isn\'t sent');
    });
  });

  describe('GET /api/scribes/:scribe_id', () => {
    const scribeId = 2;
    context('Given no scribes', () => {
      beforeEach('insert scribes', () =>
        test.seedUserTables(db, testUsers)
      );
    
      it('responds with 404', () => {

        return supertest(app)
          .get(`/api/scribes/${scribeId}`)
          .set('Authorization', test.makeAuthHeader(testUsers[0]))
          .expect(404, {
            error: { message: 'Scribe doesn\'t exist' }
          });
      });
    });

    context('Given there are scribes in database', () => {
      beforeEach('insert scribes', () =>
        test.seedScribeTables(db, testUsers, testScribes)
      );

      it('responds with 200 and specified scribe', () => {
        const expectedScribe = testScribes[scribeId - 1];
        return supertest(app)
          .get(`/api/scribes/${scribeId}`)
          .set('Authorization', test.makeAuthHeader(testUsers[0]))
          .expect(200, expectedScribe);
      });
    });
  });

  describe('POST /api/scribes', () => {
    beforeEach('insert scribes', () =>
      test.seedUserTables(db, testUsers)
    );

    it('responds with 201 and scribe if created', () => {
      const testParams = {
        user_id: 2
      };
      return supertest(app)
        .post('/api/scribes')
        .set('Authorization', test.makeAuthHeader(testUsers[0]))
        .send(testParams)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id');
          expect(res.body.user_id).to.eql(testParams.user_id);
          expect(res.headers.location).to.eql(`/api/scribes/${res.body.id}`);
          const expected = new Date().toLocaleString();
          const actual = new Date(res.body.date_created).toLocaleString();
          expect(actual).to.eql(expected);
        })
        .then(postRes =>
          supertest(app)
            .get(`/api/scribes/${postRes.body.id}`)
            .set('Authorization', test.makeAuthHeader(testUsers[0]))
            .expect(postRes.body)
        );
    });

    const requiredFields = ['user_id'];

    requiredFields.forEach(field => {
      const newScribe = {
        user_id: 2
      };

      it(`responds with 400 and an error message when the ${field} is missing`, () => {
        delete newScribe[field];

        return supertest(app)
          .post('/api/scribes')
          .set('Authorization', test.makeAuthHeader(testUsers[0]))
          .send(newScribe)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
          });
      });

    });

  });

});
