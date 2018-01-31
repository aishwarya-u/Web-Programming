var router = require('express').Router();
var Breed = require('../models/breed');

router.get('/add-breed', function(req, res, next){
	res.render('add-breed', {message: req.flash('success')});
});

router.post('/add-breed', function(req, res, next){
	var breed = new Breed();
	breed.name =  req.body.name;

	breed.save(function(err){
		if(err) return next(err);
		req.flash('success', 'Successfully added a breed');
		return res.redirect('/add-breed');
	});
}); 

module.exports = router;