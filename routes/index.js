var express = require('express');
var router = express.Router();
var models = require('../models');


/* GET home page. */
router.get('/', function(req, res) {
  // console.log('hello');
  var hotels, thingsToDo, restaurants;
  // var finished = _.after(3, doRender);  // TRY THIS WITH UNDERSCORE.JS
  var count = 0;

  models.Hotel.find(function(err, results) {
    hotels = results;
    doRender(count++);
    // finished();
    // res.render('index', { hotels: results, title: "Trip Planner"});
  });

  models.ThingsToDo.find(function(err, results) {
    thingsToDo = results;
    doRender(count++);
  });

  models.Restaurant.find(function(err, results) {
    restaurants = results;
    doRender(count++);
  });

  function doRender() {
    if (count === 3) {
      res.render('index', { hotels: hotels, thingsToDo: thingsToDo, restaurants: restaurants, title: "Trip Planner"});
    }
  }

});

module.exports = router;