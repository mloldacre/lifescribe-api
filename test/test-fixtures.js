const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      first_name: 'F-One',
      last_name: 'L-One',
      user_name: 'TestUserOne',
      password: 'TestPasswordOne',
      email: 'TU1@email.com',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      date_modified: new Date('2029-02-22T16:28:32.615Z')
    },
    {
      id: 2,
      first_name: 'F-Two',
      last_name: 'L-Two',
      user_name: 'TestUserTWO',
      password: 'TestPasswordTwo',
      email: 'TU2@email.com',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      date_modified: new Date('2029-02-22T16:28:32.615Z')
    },
    {
      id: 3,
      first_name: 'F-Three',
      last_name: 'L-Three',
      user_name: 'TestUserThree',
      password: 'TestPasswordThree',
      email: 'TU3@email.com',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      date_modified: new Date('2029-02-22T16:28:32.615Z')
    },
    {
      id: 4,
      first_name: 'F-Four',
      last_name: 'L-Four',
      user_name: 'TestUserFour',
      password: 'TestPasswordFour',
      email: 'TU4@email.com',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      date_modified: new Date('2029-02-22T16:28:32.615Z')
    }
  ];
}

function makeScribesArray(users) {
  return [
    {
      id: 1,
      date_created: '2029-01-22T16:28:32.615Z',
      user_id: users[0].id
    },
    {
      id: 2,
      date_created: '2029-01-22T16:28:32.615Z',
      user_id: users[1].id
    },
    {
      id: 3,
      date_created: '2029-01-22T16:28:32.615Z',
      user_id: users[2].id
    },
    {
      id: 4,
      date_created: '2029-01-22T16:28:32.615Z',
      user_id: users[3].id
    },
    {
      id: 5,
      date_created: '2029-01-22T16:28:32.615Z',
      user_id: users[0].id
    },
    {
      id: 6,
      date_created: '2029-01-22T16:28:32.615Z',
      user_id: users[1].id
    },
    {
      id: 7,
      date_created: '2029-01-22T16:28:32.615Z',
      user_id: users[2].id
    },
    {
      id: 8,
      date_created: '2029-01-22T16:28:32.615Z',
      user_id: users[3].id
    }
  ];
}

function makeScribblesArray(scribes) {
  return [
    {
      id: 1,
      date_created: '2029-01-22T16:28:34.615Z',
      scribble_type: 0,
      scribble_content: 'Text scribble',
      scribe_id: scribes[7].id
    },
    {
      id: 2,
      date_created: '2029-01-22T16:28:34.615Z',
      scribble_type: 1,
      scribble_content: 'Picture scribble',
      scribe_id: scribes[6].id
    },
    {
      id: 3,
      date_created: '2029-01-22T16:28:34.615Z',
      scribble_type: 2,
      scribble_content: 'Audio scribble',
      scribe_id: scribes[5].id
    },
    {
      id: 4,
      date_created: '2029-01-22T16:28:34.615Z',
      scribble_type: 3,
      scribble_content: 'Video scribble',
      scribe_id: scribes[4].id
    },
    {
      id: 5,
      date_created: '2029-01-22T16:28:34.615Z',
      scribble_type: 0,
      scribble_content: 'Text scribble',
      scribe_id: scribes[3].id
    },
    {
      id: 6,
      date_created: '2029-01-22T16:28:34.615Z',
      scribble_type: 1,
      scribble_content: 'Picture scribble',
      scribe_id: scribes[2].id
    },
    {
      id: 7,
      date_created: '2029-01-22T16:28:34.615Z',
      scribble_type: 2,
      scribble_content: 'Audio scribble',
      scribe_id: scribes[1].id
    },
    {
      id: 8,
      date_created: '2029-01-22T16:28:34.615Z',
      scribble_type: 3,
      scribble_content: 'Video scribble',
      scribe_id: scribes[0].id
    }
  ];
}

function makeExpectedScribe(users, scribe) {
  const user = users.find(user => user.id === scribe.user_id);

  return {
    id: scribe.id,
    date_created: scribe.date_created,
    user_id: user.id
  };
}

function makeExpectedScribble(scribes, scribble) {
  const scribe = scribes.find(scribe => scribe.id === scribble.scribe_id);

  return {
    id: scribble.id,
    date_created: scribble.date_created,
    scribble_type: scribble.scribble_type,
    scribble_content: scribble.scribble_content,
    scribe_id: scribe.id
  };
}

function makeScribesFixtures() {
  const testUsers = makeUsersArray();
  const testScribes = makeScribesArray(testUsers);
  const testScribbles = makeScribblesArray(testScribes);
  return { testUsers, testScribes, testScribbles };
}

function cleanTables(db) {
  return db.raw(`TRUNCATE
      lifescribe_scribbles,
      lifescribe_scribes,
      lifescribe_users
      RESTART IDENTITY CASCADE`);
}

function seedUserTables(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('lifescribe_users')
    .insert(users);
}

function seedScribeTables(db, users, scribes) {
  return db.into('lifescribe_users')
    .insert(users)
    .then(() =>
      db.into('lifescribe_scribes')
        .insert(scribes)
    );
}

function seedScribbleTables(db, users, scribes, scribbles) {
  return db.into('lifescribe_users')
    .insert(users)
    .then(() =>
      db.into('lifescribe_scribes')
        .insert(scribes)
    )
    .then(() =>
      db.into('lifescribe_scribbles')
        .insert(scribbles));
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

module.exports = {
  cleanTables,
  seedScribeTables,
  seedUserTables,
  seedScribbleTables,
  
  makeScribesArray,
  makeScribesFixtures,
  makeExpectedScribe,
  makeExpectedScribble,
  makeAuthHeader
};