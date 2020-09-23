const moment = require('moment-timezone');
const xss = require('xss');

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
  
  getCurrentScribe(knex, user_id) {
    return this.getAllScribes(knex)
      .where('user_id', user_id)
      .andWhere('date_created', '=', moment().format('YYYY-MM-DD'))
      .first();
  },

  getByDate(knex, user_id) {
    return this.getAllScribes(knex)
      .where('date_created','>=', moment().format('YYYY-MM-DD'))
      .andWhere('user_id', user_id)
      .first();
  },

  getScribeScribbles(knex, user_id) {
    return knex
      .from('lifescribe_scribbles AS scrib')
      .select('scrib.id',
        'scrib.date_created',
        'scrib.time_created',
        'scrib.scribble_type',
        'scrib.scribble_content')
      .where('scrib.date_created', '>=', moment().startOf('day').toISOString())
      .andWhere('scrib.date_created', '<=', moment().endOf('day').toISOString())
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
      time_created: scribble.time_created,
      scribble_type: scribble.scribble_type,
      scribble_content: xss(scribble.scribble_content),
      scribe_id: scribble.scribe_id
    };
  }

};

module.exports = ScribeService;