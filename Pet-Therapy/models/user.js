var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	email: {type:String, unique: true, lowercase: true},
	password: {type: String},
	username: {type: String, default: ''},
	address: {type: String},
	past: [{
		date: Date,
		paid: {type: Number, default: 0},
	}]
})

UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

UserSchema.insert('save', function(next){
	var user = this;
	if(!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt){
		if(err) return next(err);
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});
 
module.exports = mongoose.model('User', UserSchema);

