
var map;
var marker;
var myLatlng;
var mapOptions;
var map_canvas_obj;


function initialize_gmaps(lat, lng) {
 
  // initialize new google maps LatLng object
  hotelLocation = false;
  if (lat == undefined) {
    if (days[selectedIndex].hotel != null) {
      lat = days[selectedIndex].hotel.place[0].location[0];
      lng = days[selectedIndex].hotel.place[0].location[1];
      hotelLocation = true;
    } else {
      lat = 40.705786;
      lng = -74.007672;
    }
  } else {
    lat = lat;
    lng = lng;
  }
  
  myLatlng = new google.maps.LatLng(lat, lng);
 
  // set the map options hash
  mapOptions = {
    center: myLatlng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
 
  // get the maps div's HTML obj
  map_canvas_obj = document.getElementById("map_canvas");
 
  // initialize a new Google Map with the options
  map = new google.maps.Map(map_canvas_obj, mapOptions);
 
  // Add the marker to the map
  if (hotelLocation == false) {
    marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title:"Hello World!"
    });
  }


  if (days[selectedIndex].hotel != null) {
    hotelLat = days[selectedIndex].hotel.place[0].location[0];
    hotelLng = days[selectedIndex].hotel.place[0].location[1];

    var hotelLatLng = new google.maps.LatLng(hotelLat, hotelLng);
    mapOptions.center = hotelLatLng;
    marker = new google.maps.Marker ({
    
      position: hotelLatLng,
      map: map,
      icon: 'http://www.googlemapsmarkers.com/v1/H/0099FF/'
    });
  };

  if (days[selectedIndex].thingsToDo.length > 0){
    for(i=0, n=days[selectedIndex].thingsToDo.length; i<n; i++) {
      thingLat = days[selectedIndex].thingsToDo[i].place[0].location[0];
      thingLng = days[selectedIndex].thingsToDo[i].place[0].location[1];

      var thingLatLng = new google.maps.LatLng(thingLat, thingLng);
      marker = new google.maps.Marker ({
      
      position: thingLatLng,
      map: map,
      icon: 'http://www.googlemapsmarkers.com/v1/T/00FFCC/'
    });
    }
  }
  if (days[selectedIndex].restaurants.length > 0){
    for(i=0, n=days[selectedIndex].restaurants.length; i<n; i++) {
      restaurantsLat = days[selectedIndex].restaurants[i].place[0].location[0];
      restaurantsLng = days[selectedIndex].restaurants[i].place[0].location[1];

      var restaurantsLatLng = new google.maps.LatLng(restaurantsLat, restaurantsLng);
      marker = new google.maps.Marker ({
      
      position: restaurantsLatLng,
      map: map,
      icon: 'http://www.googlemapsmarkers.com/v1/R/FF00CC/'
    });
    }
  }
  // var myLatlng3 = new google.maps.LatLng(40.705800, -74.008);
  // marker = new google.maps.Marker ({
    
  //   position: myLatlng3,
  //   map: map
  // });

 
  // Add the marker to the map by calling setMap()
  marker.setMap(map);
}

$(document).ready(function() {
 initialize_gmaps();
});


var hotelArray, restaurantArray, thingArray;

var days = [{
    hotel: null,
    thingsToDo: [],
    restaurants: []
  }],
    selectedIndex = 0;

function addDay() {
    days.push({
    hotel: null,
    thingsToDo: [],
    restaurants: []
  });
}


$(function(){
  $('.dropdown-menu li a').click(function(e){
    var val = ($(this).text());
    $(this).parent().parent().siblings().eq(0).text(val);
      var whichList = ($(this)[0].classList);
      if(whichList.contains("hotelList")){
        for(i=0; i<all_hotels.length; i++){
          if(all_hotels[i].name == val){
            var markerLocation = all_hotels[i].place[0].location;
          }
        }
      }
      else if(whichList.contains("thingsList")){
        for(i=0; i<all_things_to_do.length; i++){
          if(all_things_to_do[i].name == val){
            var markerLocation = all_things_to_do[i].place[0].location;
          }
        }
      }
      else if(whichList.contains("restaurantList")){
        for(i=0; i<all_restaurants.length; i++){
          if(all_restaurants[i].name == val){
            var markerLocation = all_restaurants[i].place[0].location;
          }
        }
      }

          $(document).ready(function() {
            initialize_gmaps(markerLocation[0], markerLocation[1]);
          });

      })
})



$(function(){
  $('#addHotel').click(function(){
    var val = $('#hotelSelect').text()
    $('#hotelArr').html('<li>' + val + '<br><a class="delete">Remove</a></li>');
    for (i=0, n = all_hotels.length; i<n; i++){
       if(all_hotels[i].name == val) {
         days[selectedIndex].hotel = all_hotels[i];
         initialize_gmaps();
       }
     }
  })
})

$(function(){
  $('#addThing').click(function(){
    var val = $('#thingSelect').text()
    $('#thingsArr').append('<li>' + val + '<br><a class="delete">Remove</a></li>');
    for (i=0, n = all_things_to_do.length; i<n; i++){
       if(all_things_to_do[i].name == val) {
         days[selectedIndex].thingsToDo.push(all_things_to_do[i]);
         initialize_gmaps(all_things_to_do[i].place[0].location[0], all_things_to_do[i].place[0].location[1]);
       }
     }
  })
})

$(function(){
  $('#addRestaurant').click(function(){
    if($('#restaurantsArr').children().length < 3){
      var val = $('#restaurantSelect').text()
      $('#restaurantsArr').append('<li>' + val + '<br><a class="delete">Remove</a></li>');
      for (i=0, n = all_restaurants.length; i<n; i++){
         if(all_restaurants[i].name == val) {
           days[selectedIndex].restaurants.push(all_restaurants[i]);
           initialize_gmaps(all_restaurants[i].place[0].location[0], all_restaurants[i].place[0].location[1]);
         }
       }
    }
  })
});


$(function(){
  var count = 1
  var $blankPlan = $('.dayplan').clone()
  $('.addDay').click(function(){
    $('.dayplan').replaceWith($blankPlan.clone());
    count += 1;
    selectedIndex = count - 1;
    addDay();
    var newButton = '<button type="button" class="btn btn-default btn-primary btn-sm">Day ' + count + '</button>';
    // console.log(count);
    $('#days').children().removeClass('btn-primary');
    $('#days').append(newButton);
    $('#dayNum').text("Day " + count);
  })
})


$(function(){
  var $blankPlan = $('.dayplan').clone();
  $('#days').click(function(e){
    if($(e.target)[0].className !== 'btn-group'){
      
      (selectedIndex = $(e.target).index());
      $('.dayplan').replaceWith($blankPlan.clone());
      $('#days > .btn-primary').removeClass('btn-primary');
      $(e.target).addClass('btn-primary');
      $('#dayNum').text($(e.target).text());
      if(days[selectedIndex].hotel){
        $('#hotelArr').html('<li>' + days[selectedIndex].hotel.name + '<br><a>Remove</a></li>');
        }
      if(days[selectedIndex].restaurants){
        for (i=0, n = days[selectedIndex].restaurants.length; i < n; i++) {
          $('#restaurantsArr').append('<li>' + days[selectedIndex].restaurants[i].name + '<br><a class="delete">Remove</a></li>');
        }    
      }
      if(days[selectedIndex].thingsToDo){
        for (i=0, n = days[selectedIndex].thingsToDo.length; i < n; i++) {
          $('#thingsArr').append('<li>' + days[selectedIndex].thingsToDo[i].name + '<br><a class="delete">Remove</a></li>');
        }    
      }
    }
    initialize_gmaps();
  })
})

$(function(){
  $('.planBox').on('click', '.delete', (function(e){
    var targetId = $(e.target).parent().parent()[0].id;
    var placeName = $(e.target).parent()[0].childNodes[0].data;
    if(targetId == "hotelArr"){
      days[selectedIndex].hotel = null;
    }
    else if(targetId == "thingsArr"){
      var thingList = days[selectedIndex].thingsToDo;
      for(i=0, n = thingList.length; i < n; i++){
          if(thingList[i].name === (placeName)){
            thingList.splice(i, 1);
          }
        }
      }
    else if(targetId == "restaurantsArr"){
      var restList = days[selectedIndex].restaurants;
      for(i=0, n = restList.length; i < n; i++){
          if(restList[i].name === (placeName)){
            restList.splice(i, 1);
          }
        }
      }
    $(e.target).parent().remove();
    initialize_gmaps();
    })
  )
})
  // var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
  // var mapOptions = {
  //   zoom: 4,
  //   center: myLatlng
  // }
  // var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

  // // To add the marker to the map, use the 'map' property
  // var marker = new google.maps.Marker({
  //     position: myLatlng,
  //     map: map,
  //     title:"Hello World!"
  // });

  // marker.setMap(map);



// console.log(all_hotels[0].name);

