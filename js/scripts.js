'use strict';

$(function() {
  
    var width = 720,
        speed = 500,
        currentSlide = 1,
        interval;
    var sliderAll = $("#carousel");
    var sliderContainer = $("#carousel .slides");
    var indicatorsContainer = $("#indicators");
    var indicator = $(".indicator", indicatorsContainer);
    
    function moveFirstSlide() {
        var first = sliderContainer.find(".slide:first"),
            last = sliderContainer.find(".slide:last");
        last.after(first);
        sliderContainer.css({"marginLeft":0})
    }
    
    function moveLastSlide() {
        var first = sliderContainer.find(".slide:first"),
            last = sliderContainer.find(".slide:last");
        first.before(last);
        sliderContainer.css({"marginLeft":-(width)})
        sliderContainer.animate({'marginLeft' : '+='+width}, speed, moveFirstSlide);
    }
    
    function changeSlide(target, sp) {
        sliderContainer.animate({'marginLeft' : '-='+target*width}, sp, moveFirstSlide);
        $(".indicator:nth-child(" + currentSlide + ")").css('opacity', 0.3);
        currentSlide = (currentSlide + target) % $('.slide', sliderContainer).length;
        if (currentSlide == 0) {
            currentSlide = $('.slide', sliderContainer).length;
        }
        $(".indicator:nth-child(" + currentSlide + ")").css('opacity', 1.0);
              
    }
    
    function startSlider() {
        
        interval = setInterval(function() {changeSlide(1, speed)}, 2000);
        
    }
    
    function stopSlider() {
        clearInterval(interval);
    }
    
    sliderAll
        .on('mouseenter', stopSlider)
        .on('mouseleave', startSlider);

    indicator.click(function() {
        var target = $(this).attr("index-of") ;
        if (target > currentSlide) {
            target = target - currentSlide;
            for(var i = 1; i < target; i++)
                moveFirstSlide();
            changeSlide(target, speed);
        } else if (target < currentSlide) {
            target = currentSlide + target;
            for(var i = 1; i < (target - currentSlide); i++)
                moveFirstSlide();
            changeSlide(target, speed);
        }
        
    });
    
    $('#arrow-right').click(function() {
        changeSlide(1, speed);
    });
    $('#arrow-left').click(function() {
        moveLastSlide();
    });
    startSlider();
})