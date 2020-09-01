//TODO Create test for Scribe endpoints
const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const test = require('./test-fixtures');
const supertest = require('supertest');

describe.only('Scribes Endpoints', () => {
  let db;

  const { testUsers, testScribes } = test.makeScribesFixtures();

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
  
  

  describe('GET /api/scribes', () => {
    context('Given no scribes', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/scribes')
          .expect(200, []);
      });
    });

    context('Given there are scribes in database', () => {
      beforeEach('insert scribes', () =>
        test.seedTables(db, testUsers, testScribes)
      );

      it('responds with 200 and all scribes', () => {
        const expectedScribes = testScribes.map(scribe =>
          test.makeExpectedScribe(testUsers, scribe)
        );
        return supertest(app)
          .get('/api/scribes')
          .expect(200, expectedScribes);
      });

      it('responds with 401 when API token isn\'t sent');
    });
  });

  describe.only('POST /api/scribes', () => {
    beforeEach('insert scribes', () =>
      test.seedTables(db, testUsers, testScribes)
    );  
    
    it('responds with 201 and scribe if created', () => {
      const testParams = {
        user_id: 2
      };
      return supertest(app)
        .post('/api/scribes')
        .send(testParams)
        .expect(201);
    });
  });

});
