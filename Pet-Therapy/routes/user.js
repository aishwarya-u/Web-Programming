var router = require('express').Router();
var User = require('../models/user');
var Cart = require('../models/CheckOut');
var async = require('async');
var passport = require('passport');

router.get('/login', function(req,res){
	if(req.user) return res.redirect('/');
	res.render('login', {message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true
}));

router.get('/profile', function(req, res){
	User.findOne({_id: req.user._id}, function(err,user){
		if(err) return next(err);
		res.render('profile', {user: user});
	});
});

router.get('/signup', function(req, res){
	res.render('signup', {
		errors: req.flash('errors')
	});
});

router.post('/signup', function(req, res){
	
	async.waterfall([
		function(callback){
			var user = new User();

			user.username = req.body.username;
			user.email = req.body.email;
			user.password = req.body.password;
			user.picture = user.avatar();
			user.address = req.body.address;

			User.findOne({email: req.body.email}, function(err, existingUser){
				if(existingUser){
					req.flash('errors', 'Use a different email');
					return res.redirect('/signup');
				}else{
					user.save(function(err, user){
						if(err) return next(err);
						callback(null, user);
					});
				}
			});
		},

		function(user){
			var CheckOut = new CheckOut();  
			CheckOut.borrower = user._id;
			CheckOut.save(function(err){
				if(err) return next(err);
				req.logIn(user, function(err){
					if(err) return next(err);
					res.redirect('/profile');
				});
			});
		}
	]); 	
});

router.get('/logout', function(req, res, next){
	req.logout();
	res.redirect('/');
});

router.get('/edit-profile', function(req, res, next){
	res.render('edit-profile', {message: req.flash('success')});
});

router.post('/edit-profile', function(req, res, next){
	User.findOne({_id: req.user._id}, function(err, user){
		if(err) return next(err);
		
		if(req.body.username){
			user.username = req.body.username;
		}

		if(req.body.address){
			user.address = req.body.address;
		} 

		user.save(function(err){})
		if(err) return next(err);
		req.flash('success', 'Successful');
		return res.redirect('/edit-profile');
	});
});



module.exports = router;