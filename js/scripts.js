'use strict';

$(function() {
  
    var width = 720,
        speed = 500,
        currentSlide = 1,
        interval;
    var sliderContainer = $("#carousel .slides");
    var indicatorsContainer = $("#indicators");
    var indicator = $(".indicator", indicatorsContainer);
    
    function moveFirstSlide() {
        var first = sliderContainer.find(".slide:first"),
            last = sliderContainer.find(".slide:last");
        last.after(first);
        sliderContainer.css({"marginLeft":0})
    }
    
    function changeSlide() {
        sliderContainer.animate({'marginLeft' : '-='+width}, speed, moveFirstSlide);
        if(++currentSlide == (indicator.length + 1)){
            $(".indicator:nth-child(" + (currentSlide - 1) + ")").css('opacity', 0.3);
            currentSlide = 1;
            $(".indicator:nth-child(" + currentSlide + ")").css('opacity', 1.0);
        }
        $(".indicator:nth-child(" + (currentSlide - 1) + ")").css('opacity', 0.3);
        $(".indicator:nth-child(" + currentSlide + ")").css('opacity', 1.0);
      
    }
    function startSlider() {
        
        interval = setInterval(changeSlide, 2000);
        
    }
    
    function stopSlider() {
        clearInterval(interval);
    }
    
    sliderContainer
        .on('mouseenter', stopSlider)
        .on('mouseleave', startSlider);
    indicator.click(function() {
        var first = sliderContainer.find(".slide:nth-child(" + indicatorsContainer.index(this)  + ")");
        var last = sliderContainer.find(".slide:last");
        last.after(first);
        sliderContainer.css({"marginLeft":0});
    });
    startSlider();
})