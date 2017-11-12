
/*
jQuery slider. No RWD (for now)
*/

'use strict';

$(function() {
  
    //slider settings
    var width = 720,
        speed = 500,
        currentSlide = 1,
        interval;

    //DOM cache    
    var sliderAll = $("#carousel");
    var sliderContainer = $("#carousel .slides");
    var indicatorsContainer = $("#indicators");
    var indicator = $(".indicator", indicatorsContainer);
    
    /*
    Function, which moves last slide to first position and resets marginLeft property.
    In other words - thanks to this function we see always first slide
    */
    function moveFirstSlide() {
        var first = sliderContainer.find(".slide:first"),
            last = sliderContainer.find(".slide:last");
        last.after(first);
        sliderContainer.css({"marginLeft":0})
    }
    
    // reverse than moveFirstSlide. Only for left arrow 
    function moveLastSlide() {
        var first = sliderContainer.find(".slide:first"),
            last = sliderContainer.find(".slide:last");
        first.before(last);
        sliderContainer.css({"marginLeft":-(width)})
    }
    
    /*
    It highlights actual indicator. Hot it works is - index of displayed slide is stored
    in currentSlide variable.
    1. It changes opacity of its indicator
    2. Writes to currentSlide index of current slide 
    (Let's say second slide is displayed. User clicked on 4th indicator, so 4th slide is displayed
    So current slide is 2 + 2 = 4 (target is how many slides it have to skip) 
    4 % 5 (number of slides) = 4. So 4th indicator will bi highlighted. I works also when
    user will click indicator that is to the left of current highlighted indicator)
    */
    function changeIndicator(target) {
        $(".indicator:nth-child(" + currentSlide + ")").css('opacity', 0.3);
        currentSlide = (currentSlide + target) % $('.slide', sliderContainer).length;
        if (currentSlide == 0) {
            currentSlide = $('.slide', sliderContainer).length;
        }
        $(".indicator:nth-child(" + currentSlide + ")").css('opacity', 1.0);
    }

    function changeSlide(target) {
        sliderContainer.animate({'marginLeft' : '-='+target*width}, speed, moveFirstSlide);
        changeIndicator(target);
              
    }
    
    function startSlider() {
        
        interval = setInterval(function() {changeSlide(1)}, 2000);
        
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
            changeSlide(target);
        } else if (target < currentSlide) {
            target = currentSlide + target;
            for(var i = 1; i < (target - currentSlide); i++)
                moveFirstSlide();
            changeSlide(target);
        }
        
    });
    
    $('#arrow-right').click(function() {
        changeSlide(1);
    });
    $('#arrow-left').click(function() {
        moveLastSlide();
        sliderContainer.animate({'marginLeft' : '+='+width}, speed);
        changeIndicator(-1);
    });
    startSlider();
})