var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;

var DogSchema = new Schema({
	breed: {type: Schema.Types.ObjectId, ref: 'Breed'},
	name: String,
	price: Number,
	image: String,
});

DogSchema.plugin(mongoosastic, {
	hosts: [
		'localhost:3000'
	]
});

module.exports = mongoose.model('Dog', DogSchema);