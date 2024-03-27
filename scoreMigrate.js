const knex = require('knex')(require('./knexfile')['development']);




async function createScoreTable() {
    try {
      const exists = await knex.schema.hasTable('scores');
      if (exists) {
        await knex.schema.dropTable('scores');
        console.log('La table "scores" a été supprimée avec succès.');
      }
  
      await knex.schema.createTable('scores', table => {
        table.increments('id').primary();
        table.integer('wins').notNullable().defaultTo(0);
        table.integer('losses').notNullable().defaultTo(0);
      });
  
      console.log('La table "scores" a été créée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la création de la table :', error);
    } finally {
      await knex.destroy();
    }
  }
  
  createScoreTable();

