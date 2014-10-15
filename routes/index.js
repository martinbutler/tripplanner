var express = require('express');
var async = require('async');
var router = express.Router();
var models = require('../models');
var arr = [];

/* GET home page. */
router.get('/', function(req, res) {
  // console.log('hello');
  var hotels, thingsToDo, restaurants, Day;
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
  var results;
  var callback = function(){
    return;
  }

  models.Day.find().populate('hotels restaurants thingsToDo').exec(function(err, data){
    dayData = data;
    console.log(dayData);
    doRender(count++)
  })



  // models.Day.find(function(err, days){
  //   async.eachSeries(days, (function(day, callback){
  //     day.populate("hotels restaurants thingsToDo", function(err, popVisit){
  //       // console.log(popVisit);
  //       arr.push(popVisit);
  //       // console.log(arr)
  //       console.log(count);
  //       callback();
  //       })
  //     })
  //   )
  //   doRender(count++)
  // })

  function doRender() {
    if (count === 4) {
      res.render('index', { dayData: dayData, hotels: hotels, thingsToDo: thingsToDo, restaurants: restaurants, title: "Trip Planner"});
    }
  }





});



module.exports = router;