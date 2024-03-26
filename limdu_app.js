var limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });
const db = require('./boissonModel');

(async function() {

	const boissons = await db.getAllBoissons()
	console.log(boissons)
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
		{input: "Je veux boire un barcadi", output: "barcadi"},
		{input: "Je veux boire un barcad", output: "barcadi"},
		{input: "Je veux une boisson de barcadir", output: "barcadi"},
		{input: "J'aime du barcardi", output: "barcadi"},
		{input: "Je veux boire un captain morgan", output: "captain_morgan"},
		{input: "J'aime du captain morgan", output: "captain_morgan"},
		{input: "Je veux boire un old nick", output: "old_nick"},
		{input: "J'aime du old nick", output: "old_nick"},
	]);


	// Initialize a classifier with the base classifier type and the feature extractor:
	var intentClassifierAccept = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor
	});

	// Train and test:
	intentClassifierAccept.trainBatch([
		{input: "Je veux bien cette boisson", output: "oui"},
		{input: "Donne moi !", output: "oui"},
		{input: "je prends", output: "oui"},
		{input: "ok", output: "oui"},
		{input: "je ne prends pas", output: "no"},
		{input: "Non c'est trop chère", output: "non"},
		{input: "Non je veux pas", output: "non"},
		{input: "Non sait pas !", output: "non"},
	]);



	console.log('Bonjour')
	const rhum_want = prompt("Pouvez-vous me dire le rhum que vous souhaitez (Nick, Barcardi, Morgan) possible ?");
	predicted_response = intentClassifier.classify(rhum_want);

	let current_boisson = null
	// console.log('predicted_response', predicted_response)
	for (boison of boissons) {
		if (boison.name == predicted_response[0]) {
			console.log("La boison", boison['name'], "est de", boison['price'], " EUR")
			current_boisson = boison 
			break
		}
	}

	const yesno = prompt(`Souhaitez-vous payer votre ${current_boisson.name} ?`);
	predicted_response = intentClassifierAccept.classify(yesno);
	if (predicted_response[0] == 'non') {
		console.log('Merci et à la prochaine!')
	}

	if (predicted_response[0] == 'oui') {

		const want_qty = prompt(`Avez-vous besoin de combien de ${current_boisson.name} ?`);
		console.log(`Vous voulez ${Number(want_qty)} ${current_boisson.name}(s)`)
		boisson_from_db = await db.getBoisonById(current_boisson.id)
		if ((boisson_from_db.quantity <= 0)) {
			console.log(`Nous n'avons plus de ${boisson_from_db.name}!`)
		} else if ((boisson_from_db.quantity - Number(want_qty)) <= 0) {
			console.log(`Nous n'avons pas suffisamment de ${boisson_from_db.name} pour vous servir!`)
		} else {
			db.updateBoisson(current_boisson.id, boisson_from_db.quantity - Number(want_qty))
			if (Number(want_qty) == 1) {
				console.log('Ok merci prennez votre boisson!')
			} else {
				console.log('Ok merci prennez vos boissons!')
			}
		}
	}

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