var express = require('express');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

mongoose.connect('mongodb://localhost/zoo');

var Animal = mongoose.model('animal', {
	name: String,
	diet: String,
	age: Number,
	weight: Number
});

app.get('/', function(req, res) {
	
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
});

app.get('/new', function(req, res) {

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
})

app.get('/:animal/getolder', function(req, res) {
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
})

var server = app.listen(5874, function() {
	console.log('Express server listening on port ' + server.address().port);
});
