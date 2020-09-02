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

function makeExpectedScribe(users, scribe) {
  const user = users.find(user => user.id === scribe.user_id);

  return {
    id: scribe.id,
    date_created: scribe.date_created,
    user_id: user.id
  };
}

function makeScribesFixtures() {
  const testUsers = makeUsersArray();
  const testScribes = makeScribesArray(testUsers);
  return { testUsers, testScribes };
}

function cleanTables(db) {
  return db.raw(`TRUNCATE
      lifescribe_scribbles,
      lifescribe_scribes,
      lifescribe_users
      RESTART IDENTITY CASCADE`);
}

function seedUserTables(db, users) {
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

module.exports = {
  makeScribesArray,
  cleanTables,
  seedScribeTables,
  seedUserTables,
  makeScribesFixtures,
  makeExpectedScribe
};