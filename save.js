
const db = require('./cardModel');



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
    await db.createCard(card_num, cards[card_num].qty);
  }

  // Read
  const getAllcards = await db.getAllCards();
  console.log('Tous les cards :', getAllcards);
}

main().catch(err => console.error(err));