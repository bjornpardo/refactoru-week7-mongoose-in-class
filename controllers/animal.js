var Animal = require('../models/animal.js');

var animalController = {
	index: function(req, res) {
	
		Animal.find({}, function(err, animals1) {
			if(err) {
				console.log(err);
				res.send(500, 'There was an error');
				return;
			}

			res.render('index', {
				animals: animals1
			});
		});
	},

	create: function(req, res) {

		var elephant = new Animal({
			name: 'elephant',
			age: req.query.age,
			weight: req.query.weight
		});

		elephant.save(function(err, data) {
			if(err) {
				console.log(err);
				res.send(500, 'There was an error creating');
				return;
			}

			res.send(201, 'Success!');
		})
	},

	getOlder: function(req, res) {
		Animal.findOne( { name: req.params.animal}, function(err, animalDoc) {
			// name inside {} is the key being searched for 

			if(err) {
				console.log(err);
				res.send(500, 'There was an error searching for animalDoc');
				return;
			}

			animalDoc.age++;

			animalDoc.save(function(err, data) {
				res.send(req.params.animal + ' is ' + animalDoc.age + ' years old');
			});

			// res.send(animal.age.toString());
			// before age++, toString because the first arg is read as a Number
		})
	}

};

module.exports = animalController;