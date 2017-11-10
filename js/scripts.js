'use strict';

$(function() {
  
    var width = 720,
        speed = 500,
        interval;
    var sliderContainer = $("#carousel .slides");
    
    function moveFirstSlide() {
        return;
    }
    function changeSlide() {
        sliderContainer.animate({'marginLeft' : '-='+width}, speed, moveFirstSlide);
    }
    function startSlider() {
        
        interval = setInterval(changeSlide, 2000);
        
    }
    startSlider()
})