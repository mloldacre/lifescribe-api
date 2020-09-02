const ScribesService = {
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

  getById(knex, id) {
    return knex
      .from('lifescribe_scribes')
      .select('*')
      .where('id', id)
      .first();
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
  } 
  
};

module.exports = ScribesService;