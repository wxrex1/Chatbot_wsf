// App.js - Utilisation des opérations CRUD avec Knex

/*const db = require('./boissonModel');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function main() {
  const boissons = {
    'captain_morgan': { qty: 10, price: 30},
    'barcadi': { qty: 19, price: 10},
    'old_nick': { qty: 5, price: 30},
  }

  for (boisson_name in boissons) {
    await db.createBoisson(boisson_name, boissons[boisson_name].qty, boissons[boisson_name].price);
  }

  // Read
  const getAllBoissons = await db.getAllBoissons();
  console.log('Tous les boissons :', getAllBoissons);
}

main().catch(err => console.error(err));*/

_______________________________________

const db = require('./cardModel');

function getRandomInt(max) {
  return Math.floor(Math.random() * 10);
}

async function main() {
  const cards = {
    '1': { qty: 1},
    '2': { qty: 1},
    '3': { qty: 1},
    '4': { qty: 1},
    '5': { qty: 1},
    '6': { qty: 1},
    '7': { qty: 1},
    '8': { qty: 1},
    '9': { qty: 1},
    '10': { qty: 1},
  }

  for (card_num in cards) {
    await db.createcard(card_num, cards[card_num].qty, cards[card_num].price);
  }

  // Read
  const getAllcards = await db.getAllcard();
  console.log('Tous les cards :', getAllcards);
}

main().catch(err => console.error(err));