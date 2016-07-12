// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).on("click", "#submit-problem", function(e) {
  e.preventDefault();
  $("#problem-form-wrapper").fadeOut(function() {
    $("form#new_problem").trigger("submit.rails");
  });
});

$(document).on("click", "#submit-again", function(e) {
  e.preventDefault();
  $("#display-problem-wrapper").fadeOut(function() {
    $("#problem_body, #problem_email").val("");
    $("#problem-form-wrapper").fadeIn();
  });
});

$(document).on("click", "#another-problem", function(e) {
  e.preventDefault();
  $("#display-problem").fadeOut(function() {
    $("form#new_problem").trigger("submit.rails");
  });
});

// geo

function geo_success(position) {
  console.log(position);
  $('#problem_latitude').val(position.coords.latitude);
  $('#problem_longitude').val(position.coords.longitude);
  //$('#problem_accuracy').val(position.coords.accuracy);
}

function geo_error() {
  console.log("Sorry, no position available.");
}

var geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 10000,
  timeout           : 27000
};

var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);

// positioning

var image = { width: 3300, height: 2550 };
var target = { x: 1600, y: 1850 };

var wrapper = $('.content-wrapper');

$(document).ready(updatePointer);
$(window).resize(updatePointer);

function updatePointer() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    
    // Get largest dimension increase
    var xScale = windowWidth / image.width;
    var yScale = windowHeight / image.height;
    var scale;
    var yOffset = 0;
    var xOffset = 0;
    
    if (xScale > yScale) {
        // The image fits perfectly in x axis, stretched in y
        scale = xScale;
        yOffset = (windowHeight - (image.height * scale)) / 2;
    } else {
        // The image fits perfectly in y axis, stretched in x
        scale = yScale;
        xOffset = (windowWidth - (image.width * scale)) / 2;
    }
    
    wrapper.css('top', (target.y) * scale + yOffset);
    wrapper.css('left', (target.x) * scale + xOffset);
}