const knex = require('knex')(require('./knexfile')['development']);


async function dropTable() {
  try {
    const exists = await knex.schema.hasTable('cards');
    if (exists) {
      await knex.schema.dropTable('cards');
      console.log('La table "cards" a été supprimée avec succès.');
    } else {
      console.log('La table "cards" n\'existe pas.');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la table :', error);
  }
}

async function createTable() {
  try {
    await dropTable();
    await knex.schema.createTable('cards', table => {
      table.string('name');
      table.integer('quantity');
    });
    console.log('La table "cards" a été créée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la création de la table :', error);
  } finally {
    await knex.destroy();
  }
}

createTable();

/*Ce script JavaScript utilise la bibliothèque knex pour créer une table boissons dans une base de données si elle n'existe pas déjà. Voici une explication détaillée :

Le module knex est importé et configuré avec les paramètres de développement définis dans le fichier knexfile.
mi
Une fonction asynchrone createTable est définie. Cette fonction fait les choses suivantes :

Elle vérifie d'abord si la table boissons existe déjà dans la base de données en utilisant la méthode hasTable de knex.schema.

Si la table n'existe pas, elle crée la table boissons avec les colonnes id, name, price et quantity. L'id est défini comme clé primaire et s'incrémente automatiquement.

Si la table existe déjà, elle affiche un message indiquant que la table existe déjà.

Si une erreur se produit lors de la vérification ou de la création de la table, elle est capturée et affichée dans la console.

Enfin, la connexion à la base de données est fermée avec la méthode destroy de knex, qu'une erreur se soit produite ou non.

Enfin, la fonction createTable est appelée pour exécuter le processus de création de la table.*/