var limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });
const db = require('./cardModel');
const knex = require('knex')(require('./knexfile')['development']);
const { getRandomCard } = require('./cardModel');


(async function() {
	//pour rejouer jusqu'a ce que le joeur dise non
	let playAgain = "oui";
	while (playAgain.toLowerCase() === "oui") {
		const cards = await db.getAllCards()
		var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
			binaryClassifierType: limdu.classifiers.Winnow.bind(0, {retrain_count: 10})
		});
		var WordExtractor = function(input, features) {
			input.split(" ").forEach(function(word) {
				features[word]=1;
			});
		};
		var intentClassifier = new limdu.classifiers.EnhancedClassifier({
			classifierType: TextClassifier,
			featureExtractor: WordExtractor
		});
		intentClassifier.trainBatch([
			{input: "1", output: "1"},
			{input: "Je choisi le 1", output: "1"},
			{input: "Je choisi le nombre 1", output: "1"},
			{input: "2", output: "2"},
			{input: "Je choisi le 2", output: "2"},
			{input: "Je choisi le nombre 2", output: "2"},
			{input: "3", output: "3"},
			{input: "Je choisi le 3", output: "3"},
			{input: "Je choisi le nombre 3", output: "3"},
			{input: "4", output: "4"},
			{input: "Je choisi le 4", output: "4"},
			{input: "Je choisi le nombre 4", output: "4"},
			{input: "5", output: "5"},
			{input: "Je choisi le 5", output: "5"},
			{input: "Je choisi le nombre 5", output: "5"},
			{input: "6", output: "6"},
			{input: "Je choisi le 6", output: "6"},
			{input: "Je choisi le nombre 6", output: "6"},
			{input: "7", output: "7"},
			{input: "Je choisi le 7", output: "7"},
			{input: "Je choisi le nombre 7", output: "7"},
			{input: "8", output: "8"},
			{input: "Je choisi le 8", output: "8"},
			{input: "Je choisi le nombre 8", output: "8"},
			{input: "9", output: "9"},
			{input: "Je choisi le 9", output: "9"},
			{input: "Je choisi le nombre 9", output: "9"},
			{input: "10", output: "10"},
			{input: "Je choisi le 10", output: "10"},
			{input: "Je choisi le nombre 10", output: "10"},
		]);

		console.log('Bonjour ! Bienvenue dans ce super jeu de carte trop génial!')
		const card_want = prompt("Choissiez une carte entre 1 et 10: ");
		predicted_response = intentClassifier.classify(card_want);
		
		
		let current_card = predicted_response[0];
		let randomCard = await getRandomCard(cards);
		randomCard = randomCard.name.toString();  // En string pour la comparaison: lexicographical
		
		if (randomCard === current_card) {
		  console.log("Bravo \\(^◇^)/ , vous avez gagné !");
		} else {
		  if (randomCard > current_card) {
			console.log("C'est plus grand");
		  } else {
			console.log("C'est plus petit");
		  }
		  const second_guess = prompt("Choissiez une carte entre 1 et 10 et ne vous trompez pas cette fois: ");
		  predicted_response = intentClassifier.classify(second_guess);
		  current_card = predicted_response[0];  
		
		  if (randomCard === current_card) {
			console.log("Bravo \\(^◇^)/ , vous avez gagné !");
		  } else {
			console.log("Dommage ¯\\_(ツ)_/¯ , la carte gagnante était : ", randomCard);
		  }
		}
		
		playAgain = prompt("Voulez-vous rejouez? (oui/non)");
	}
})();
