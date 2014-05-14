var mongoose =  require('mongoose');
// require for every file that uses it

var Animal = mongoose.model('animal', {
	name: String,
	diet: String,
	age: Number,
	weight: Number
});

module.exports = Animal;

// storing it in a variable because typically there is only one thing being exported because anoything related to another resource would be another file.