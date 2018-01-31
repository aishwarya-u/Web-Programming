var router = require('express').Router();
var User = require('../models/user');
var Dog = require('../models/dog');
var CheckOut = require('../models/checkOut');	


router.get('/checkout', function(req, res, next){
	Cart.findOne({ borrower: req.user._id })
	.populate('items.item')
	.exec(function(err, foundCheckOut){
		if (err) return next(err);
		res.render('checkout', {
			foundCheckOut: foundCheckOut,
			message: req.flash('remove')
		}); 
	});
});

router.post('/remove', function(req, res, next){
	CheckOut.findOne({ borrower: req.user._id}, function(err, foundCheckOut){
		console.log(JSON.stringify(req.body.dog_id));
		var arr = foundCheckOut.items;
		}
		foundCheckOut.items.pull(JSON.stringify(req.body.dog_id));
		foundCheckOut.total = (foundCheckOut.total - parseFloat(req.body.price)).toFixed(2);
		foundCheckOut.save(function(err, found){
			req.flash('remove', 'Successfully Removed!');
			res.redirect('/checkout');
		});
	});
});

module.exports = router;