var limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });
const db = require('./cardModel');
const knex = require('knex')(require('./knexfile')['development']);


(async function() {

	const cards = await db.getAllCards()
	console.log(cards)
	// First, define our base classifier type (a multi-label classifier based on winnow):
	var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
		binaryClassifierType: limdu.classifiers.Winnow.bind(0, {retrain_count: 10})
	});

	// Now define our feature extractor - a function that takes a sample and adds features to a given features set:
	var WordExtractor = function(input, features) {
		input.split(" ").forEach(function(word) {
			features[word]=1;
		});
	};

	// Initialize a classifier with the base classifier type and the feature extractor:
	var intentClassifier = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor
	});





	// Train and test:
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


	










	async function getRandomCard() {
		const randomCard = await knex.select().from('cards').where({ quantity: 1 });
		if (randomCard.length === 0) {
		  throw new Error("il n'ya plus de carte disponible");
		}
		const randomIndex = Math.floor(Math.random() * randomCard.length);
		return randomCard[randomIndex];
		}
	  



	// le chat bot choisi une carte dans le tableau
	console.log('Bonjour')
	const card_want = prompt("bonjour choissiez une carte entre 1 et 10?");
	predicted_response = intentClassifier.classify(card_want);

	let current_card = predicted_response[0]
	// console.log('predicted_response', predicted_response)
	

	
	  



			// Choisissez une carte aléatoire
		const randomCard = await getRandomCard(cards);

		// Comparez les deux cartes
		if (randomCard === current_card) {
		console.log("Bravo ! vous avez gagné!");
		}
		 else {
		console.log("La carte gagnante était : ", randomCard.name);

		}

	  	


	/*const yesno = prompt(`Souhaitez-vous payer votre ${current_carte.name} ?`);
	predicted_response = intentClassifierAccept.classify(yesno);
	if (predicted_response[0] == 'non') {
		console.log('Merci et à la prochaine!')
	}

	if (predicted_response[0] == 'oui') {
		const want_qty = prompt(`Avez-vous besoin de combien de ${current_card.name} ?`);
		console.log(`Vous voulez ${Number(want_qty)} ${current_card.name}(s)`)
		card_from_db = await db.getCardById(current_card.id)
		if ((card_from_db.quantity <= 0)) {
			console.log(`Nous n'avons plus de ${card_from_db.name}!`)
		} else if ((card_from_db.quantity - Number(want_qty)) <= 0) {
			console.log(`Nous n'avons pas suffisamment de ${card_from_db.name} pour vous servir!`)
		} else {
			db.updateCard(current_card.id, card_from_db.quantity - Number(want_qty))
			if (Number(want_qty) == 1) {
				console.log('Ok merci prennez votre carte!')
			} else {
				console.log('Ok merci prennez vos cartes!')
			}
		}
	}*/

})()


/*Les modules limdu, prompt-sync et boissonModel sont importés.

Une fonction asynchrone anonyme est définie et immédiatement appelée. Cette fonction fait les choses suivantes :

Elle récupère toutes les boissons de la base de données en utilisant la méthode getAllBoissons du module boissonModel et les affiche dans la console.

Elle définit un classificateur de texte basé sur l'algorithme Winnow de limdu. Ce classificateur est utilisé pour classer les entrées de texte en plusieurs catégories.

Elle définit un extracteur de caractéristiques qui prend une entrée de texte, la divise en mots et ajoute chaque mot comme une caractéristique.

Elle initialise un classificateur avec le type de classificateur de base et l'extracteur de caractéristiques. Ce classificateur est utilisé pour entraîner et tester le modèle.

Elle entraîne le classificateur avec plusieurs exemples de phrases et les boissons correspondantes.

Elle initialise un autre classificateur, intentClassifierAccept, avec le même type de classificateur de base et l'extracteur de caractéristiques. Ce classificateur est utilisé pour entraîner et tester le modèle sur des phrases d'acceptation ou de refus.

Elle demande à l'utilisateur quelle boisson il souhaite et utilise le classificateur pour prédire la boisson correspondante.

Elle vérifie si la boisson prédite est disponible dans la base de données et affiche son prix.

Elle demande à l'utilisateur s'il souhaite acheter la boisson et utilise le deuxième classificateur pour prédire si la réponse est affirmative ou négative.

Si la réponse est affirmative, elle demande à l'utilisateur combien de boissons il souhaite, vérifie si la quantité est disponible dans la base de données et, si c'est le cas, met à jour la quantité de boissons dans la base de données et confirme la vente à l'utilisateur.

Si la réponse est négative, elle remercie l'utilisateur et termine le programme.*/