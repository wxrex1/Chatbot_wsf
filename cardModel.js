// db.js - Fichier pour gérer les opérations CRUD avec Knex





const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createCard(name, quantity, price) {
  return await knex('cards').insert({ name, quantity, price });
}

// Read
async function getAllCards() {
  return await knex.select().from('cards');
}

async function getCardById(id) {
  return await knex('cards').where({ id }).first();
}

// Update
async function updateCard(id, quantity) {
  return await knex('cards').where({ id }).update({ quantity });
}

// Delete
async function deleteCard(id) {
  return await knex('cards').where({ id }).del();
}

module.exports = {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard
};



// npm install knex sqlite3*


/*Ce fichier JavaScript, boissonModel.js, est un module qui fournit des fonctions pour effectuer des opérations CRUD (Create, Read, Update, Delete) sur une base de données de boissons. Il utilise knex, un constructeur de requêtes SQL pour Node.js. Voici une explication détaillée de chaque fonction :

createBoisson(name, quantity, price): Cette fonction asynchrone crée une nouvelle boisson dans la base de données. Elle prend en paramètres le nom, la quantité et le prix de la boisson, et insère ces informations dans la table boissons.

getAllBoissons(): Cette fonction asynchrone récupère toutes les boissons de la table boissons.

getBoisonById(id): Cette fonction asynchrone récupère une boisson spécifique de la table boissons en utilisant son id.

updateBoisson(id, quantity): Cette fonction asynchrone met à jour la quantité d'une boisson spécifique dans la table boissons en utilisant son id.

deletBoisson(id): Cette fonction asynchrone supprime une boisson spécifique de la table boissons en utilisant son id.

Enfin, toutes ces fonctions sont exportées à la fin du fichier pour pouvoir être utilisées dans d'autres modules. Le commentaire à la fin du fichier suggère d'installer les modules knex et sqlite3 via npm, ce qui indique que la base de données utilisée est probablement SQLite.*/