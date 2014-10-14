var express = require('express');
var router = express.Router();
var models = require('../models');


router.post('/', function(req, res) {
	var dayToAdd = req.body.dayId;
	models.Day.findOne({"day_number":dayToAdd}, function(err, result) {
	  if (!result) {
	    var p = new models.Day({"day_number": dayToAdd});
	    p.save();
	  }
	})

});

router.post('/:dayId/attractions', function(req, res) {
	 models.Day.findOne({"day_number":req.params.dayId}, function(err, result) {
	 	switch(req.body.attraction_type){
	 		case "hotel":
	 			result.hotels = req.body.attraction_id;
	 			break;
	 		case "thing":
	 			result.thingsToDo.push(req.body.attraction_id);
	 			break;
 			case "restaurant":
 				result.restaurants.push(req.body.attraction_id);
 				break;
	 	}
	   result.save();
	 })
});

router.get('/:dayId/attractions/delete', function(req, res) {
  models.Day.findOneAndRemove({url_name: req.params.url_name}, function (err, data){
    res.redirect('/');
  })
});

router.get('/', function(req, res) {
	console.log(req);
});


module.exports = router;