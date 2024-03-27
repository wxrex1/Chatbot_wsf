// db.js - Fichier pour gérer les opérations CRUD avec Knex


const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createCard(name, quantity) {
  return await knex('cards').insert({ name, quantity });
}

// Read
async function getAllCards() {
  return await knex.select().from('cards');
}

async function getCardById(id) {
  return await knex('cards').where({ id }).first();
}

async function getRandomCard() {
  const randomCard = await knex.select().from('cards').where({ quantity: 1 });
  if (randomCard.length === 0) {
    throw new Error("il n'ya plus de carte disponible");
  }
  const randomIndex = Math.floor(Math.random() * randomCard.length);
  return randomCard[randomIndex];
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
  deleteCard,
  getRandomCard
};

