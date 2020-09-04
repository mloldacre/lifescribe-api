const ScribesService = {
  getAllScribes(knex) {
    return knex.select('*').from('lifescribe_scribes');
  },

  //TODO Create getByDate method
  insertScribe(knex, newScribe) {
    return knex
      .insert(newScribe)
      .into('lifescribe_scribes')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return this.getAllScribes(knex)
      .where('id', id)
      .first();
  },

  getScribblesForScribe(knex, scribe_id) {
    return knex
      .from('lifescribe_scribbles AS scrib')
      .select('scrib.id',
        'scrib.date_created',
        'scrib.scribble_type',
        'scrib.scribble_content')
      .where('scrib.scribe_id', scribe_id);
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
  
  serializeScribeScribble(scribble){
    return{
      id: scribble.id,
      date_created: scribble.date_created,
      scribble_type: scribble.scribble_type,
      scribble_content: scribble.scribble_content,
      scribe_id: scribble.scribe_id      
    };
  }

};

module.exports = ScribesService;