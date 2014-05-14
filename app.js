var express = require('express');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');
// var Animal = require('./models/animal.js');
// no need for this anymore since it was transferred to controllers
var animalController = require('./controllers/animal.js')

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

mongoose.connect('mongodb://localhost/zoo');



app.get('/', animalController.index);
app.get('/new', animalController.create);
app.get('/:animal/getolder', animalController.getOlder);

var server = app.listen(5874, function() {
	console.log('Express server listening on port ' + server.address().port);
});
