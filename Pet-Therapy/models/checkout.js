var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckOut = new Schema({
	borrower: {type: Schema.Types.ObjectId, ref: 'User'},
	total: {type: Number, default: 0},
	items: [{
		item: {type: Schema.Types.ObjectId, ref: 'Dog'},
		dog_id: {type: String},
		cost: {type: Number, default: 0},
		image: {type: String},
		name: {type: String}
	}]
});

module.exports = mongoose.model('CheckOut', CheckOutSchema);	 	