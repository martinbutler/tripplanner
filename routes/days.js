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
	res.end();

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
	res.end();
});

router.post('/:dayId/delete', function(req, res) {
	models.Day.findOne({"day_number":req.body.dayId}, function(err, result) {
	   // console.log("reqbodyAttType= "+ req.body.attraction_type);
	   switch (req.body.attraction_type) {
	     case "hotel":
	       result.hotels = null;
	       break;
	     case "thing":
	       result.thingsToDo.splice(result.thingsToDo.indexOf(req.body.attraction_id), 1);
	       break;
	     case "restaurant":
	       result.restaurants.splice(result.restaurants.indexOf(req.body.attraction_id), 1);
	       break;  
	   }
	   result.save();
	 })
	res.end();
});

router.get('/', function(req, res) {
	console.log(req);
});


module.exports = router;