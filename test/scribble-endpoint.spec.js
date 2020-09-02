//TODO Create test for Scribble authenticated endpoint
const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const test = require('./test-fixtures');
const supertest = require('supertest');

describe.only('Scribbles Endpoints', () => {
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



  describe('GET /api/scribbles', () => {
    context('Given no scribbles', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/scribbles')
          .expect(200, []);
      });
    });

    context('Given there are scribbles in database', () => {
      beforeEach('insert scribbles', () =>
        test.seedScribbleTables(db, testUsers, testScribes, testScribbles)
      );

      it('responds with 200 and all scribbles', () => {
        const expectedScribbles = testScribbles.map(scribble =>
          test.makeExpectedScribble(testScribes, scribble)
        );
        return supertest(app)
          .get('/api/scribbles')
          .expect(200, expectedScribbles);
      });

      it('responds with 401 when API token isn\'t sent');
    });
  });

  describe('GET /api/scribbles/:scribble_id', () => {
    const scribbleId = 2;
    context('Given no scribbles', () => {
      it('responds with 404', () => {

        return supertest(app)
          .get(`/api/scribbles/${scribbleId}`)
          .expect(404, {
            error: { message: 'Scribble doesn\'t exist' }
          });
      });
    });

    context('Given there are scribbles in database', () => {
      beforeEach('insert scribbles', () =>
        test.seedScribbleTables(db, testUsers, testScribes, testScribbles)
      );

      it('responds with 200 and specified scribe', () => {
        const expectedScribble = testScribbles[scribbleId - 1];
        return supertest(app)
          .get(`/api/scribbles/${scribbleId}`)
          .expect(200, expectedScribble);
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
        .send(testParams)
        .expect(201)
        .expect(res => {
          expect(res.body.user_id).to.eql(testParams.user_id);
          expect(res.body).to.have.property('id');
          expect(res.headers.location).to.eql(`/api/scribes/${res.body.id}`);
          const expected = new Date().toLocaleString();
          const actual = new Date(res.body.date_created).toLocaleString();
          expect(actual).to.eql(expected);
        })
        .then(postRes =>
          supertest(app)
            .get(`/api/scribes/${postRes.body.id}`)
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
          .send(newScribe)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
          });
      });
    });
  });

  describe('DELETE /api/scribbles/:scribble_id', () => {
    const scribbleIdToRemove = 3;
    context('Given no scribbles', () => {
      it('responds with 404', () => {

        return supertest(app)
          .delete(`/api/scribbles/${scribbleIdToRemove}`)
          .expect(404, {
            error: { message: 'Scribble doesn\'t exist' }
          });
      });
    });

    context('Given there are scribbles in the database', () => {
      beforeEach('insert scribbles', () =>
        test.seedScribbleTables(db, testUsers, testScribes, testScribbles)
      );

      it('responds with 204 and removes the scribble', () => {
        const expectedScribbles = testScribbles.filter(scribble => scribble.id !== scribbleIdToRemove);
        return supertest(app)
          .delete(`/api/scribbles/${scribbleIdToRemove}`)
          .expect(204)
          .then(res =>
            supertest(app)
              .get('/api/scribbles')
              .expect(expectedScribbles)
          );
      });
    });
  });

  describe('PATCH /api/scribbles/:scribble_id', () => {
    const scribbleIdToUpdate = 4;
    context('Given no scribbles', () => {
      it('responds with 404', () => {

        return supertest(app)
          .patch(`/api/scribbles/${scribbleIdToUpdate}`)
          .expect(404, {
            error: { message: 'Scribble doesn\'t exist' }
          });
      });
    });

    context('Given there are scribbles in the database', () => {
      beforeEach('insert scribbles', () =>
        test.seedScribbleTables(db, testUsers, testScribes, testScribbles)
      );

      it('responds with 204 and updates the scribble', () => {
        const scribbleUpdate = {
          scribble_content: 'Updated content'
        };

        const expectedScribble = {
          ...testScribbles[scribbleIdToUpdate - 1],
          ...scribbleUpdate
        };
        return supertest(app)
          .patch(`/api/scribbles/${scribbleIdToUpdate}`)
          .send(scribbleUpdate)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/scribbles/${scribbleIdToUpdate}`)
              .expect(expectedScribble)
          );
      });
      
      it('responds with 400 when no required field supplied', () => {
        return supertest(app)
          .patch(`/api/scribbles/${scribbleIdToUpdate}`)
          .send({ madeUpField: 'This shouldn\'t work!'})
          .expect(400, {
            error: {
              message: 'Request body must contain \'content\''
            }
          })
      });      
    });
  });

});
