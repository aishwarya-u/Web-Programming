var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BreedSchema = new Schema({
	name: {type: String, unique: true}
});

module.exports = mongoose.model('Breed', BreedSchema);