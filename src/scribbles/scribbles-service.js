const xss = require('xss');

const ScribblesService = {
  getAllScribbles(knex) {
    return knex.select('*').from('lifescribe_scribbles');
  },

  getScribblesForScribe(knex, scribeId) {
    return knex.select('*').from('lifescribe_scribbles')
      .where('scribe_id', scribeId);
  },

  insertScribble(knex, newScribble) {
    return knex
      .insert(newScribble)
      .into('lifescribe_scribbles')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex
      .from('lifescribe_scribbles')
      .select('*')
      .where('id', id)
      .first();
  },

  deleteScribble(knex, id) {
    return knex('lifescribe_scribbles')
      .where({ id })
      .delete();
  },

  updateScribble(knex, id, newScribbleFields) {
    return knex('lifescribe_scribbles')
      .where({ id })
      .update(newScribbleFields);
  },


  serializeScribbles(scribbles) {
    return scribbles.map(this.serializeScribble);
  },

  serializeScribble(scribble) {
    return {
      id: scribble.id,
      date_created: scribble.date_created,
      time_created: scribble.time_created,
      scribble_type: scribble.scribble_type,
      scribble_content: xss(scribble.scribble_content),
      scribe_id: scribble.scribe_id,
      user_id: scribble.user_id
    };
  }

};

module.exports = ScribblesService;