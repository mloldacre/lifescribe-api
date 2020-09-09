const moment = require('moment-timezone');

const ScribeService = {
  getAllScribes(knex) {
    return knex.select('*').from('lifescribe_scribes');
  },


  insertScribe(knex, newScribe) {
    return knex
      .insert(newScribe)
      .into('lifescribe_scribes')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  getScribesByUserId(knex, user_id) {
    return this.getAllScribes(knex)
      .where('user_id', user_id);
  },
  
  getScribeById(knex, scribe_id) {
    return this.getAllScribes(knex)
      .where('id', scribe_id)
      .first();
  },

  //TODO modify routes to filter by user_id
  getByDate(knex, user_id) {
    return this.getAllScribes(knex)
      .where('date_created','>=', moment().format('YYYY-MM-DD'))
      .andWhere('user_id', user_id)
      .first();
  },

  getScribblesForScribe(knex, user_id, scribe_id) {
    return knex
      .from('lifescribe_scribbles AS scrib')
      .select('scrib.id',
        'scrib.date_created',
        'scrib.scribble_type',
        'scrib.scribble_content')
      .where('scrib.scribe_id', scribe_id)
      .andWhere('scrib.user_id', user_id);
  },

  deleteScribe(knex, id) {
    return knex('lifescribe_scribes')
      .where({ id })
      .delete();
  },

  updateScribe(knex, id, newScribeFields) {
    return knex('lifescribe_scribes')
      .where({ id })
      .update(newScribeFields);
  },


  serializeScribes(scribes) {
    return scribes.map(this.serializeScribe);
  },

  serializeScribe(scribe) {
    return {
      id: scribe.id,
      date_created: scribe.date_created,
      user_id: scribe.user_id
    };
  },

  serializeScribeScribble(scribble) {
    return {
      id: scribble.id,
      date_created: scribble.date_created,
      scribble_type: scribble.scribble_type,
      scribble_content: scribble.scribble_content,
      scribe_id: scribble.scribe_id
    };
  }

};

module.exports = ScribeService;