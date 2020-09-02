const ScribblesService = {
  getAllScribbles(knex) {
    return knex.select('*').from('lifescribe_scribbles');
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
      scribble_type: scribble.scribble_type,
      scribble_content: scribble.scribble_content,
      scribe_id: scribble.scribe_id
    };
  }

};

module.exports = ScribblesService;