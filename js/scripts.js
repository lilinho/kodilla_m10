'use strict';

$(function() {
  
    var width = 720,
        speed = 500,
        currentSlide = 0,
        interval;
    var sliderContainer = $("#carousel .slides");
    var indicatorsContainer = $("#indicators");
    
    function moveFirstSlide() {
        var first = sliderContainer.find(".slide:first"),
            last = sliderContainer.find(".slide:last");
        last.after(first);
        sliderContainer.css({"marginLeft":0})
    }
    function changeSlide() {
        sliderContainer.animate({'marginLeft' : '-='+width}, speed, moveFirstSlide);
      
    }
    function startSlider() {
        
        interval = setInterval(changeSlide, 2000);
        
    }
    
    function stopSlider() {
        clearInterval(interval);
    }
    
    sliderContainer
        .on('mouseenter', stopSlider)
        .on('mouseleave', startSlider)
    startSlider()
})