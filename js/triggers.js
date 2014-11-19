$(document).ready(function() {

    

	var circles = $(".js-circ");
    var squares = $(".js-square");

    for (var i = 0, limit = circles.length; i < limit; i++) {
    	var eachCircle = $(circles[i]);

        circles.on("click touchend", function(e) {
        	e.preventDefault();
            getClickPosition(e);

        	var clickedCircle = $(e.currentTarget);
            var hero = $(".js-hero");

			if(!clickedCircle.hasClass("arc")) {

				circles.not(clickedCircle).addClass("fade");
				clickedCircle.addClass("arc");

				hero.delay(450).queue(function() {
                	$(this).addClass("fill covered");
                	$(this).dequeue();
                });

            	circles.delay(1200).queue(function() {
            		$(this).hide();
            		$(this).dequeue();
            	});

                squares.delay(550).queue(function() {
                    $(this).addClass("display");
                    $(this).dequeue();
                });
			}
        });
    }

    // Make sure the mask is always in the correct position
    var getClickPosition = function(e) {
        var offset = $("body").offset();
        var xPos = e.pageX - offset.left;
        var mouseXPercent = Math.round(xPos / $("body").width() * 100);
        var masked = $(".js-hero");
        masked.css({
            "-webkit-mask-position" : mouseXPercent+"%"+"85%",
            "mask-position" : mouseXPercent+"%"+"85%",
        });
    }

    // Make sure there is proper browser support
    var detectFeatures = function() {
        var mask_support = Modernizr.testAllProps('maskImage');
        console.log("masks?", mask_support);

        var gradient_support = Modernizr.cssgradients;
        console.log("gradient?", gradient_support);

        var detectWarning = $("section.detect");
        var warningGradient = $(".detect__content").children(".d-gradient");
        var warningMasks = $(".detect__content").children(".d-masks");
        var warningBoth = $(".detect__content").children(".d-or");

        if(mask_support === false) {
            console.log("No SVG mask support!")
            detectWarning.css({display: "block"});
            warningMasks.css({display: "inline"});
        }
        if(gradient_support === false) {
            console.log("No gradient support!")
            detectWarning.css({display: "block"});
            warningGradient.css({display: "inline"});
        }
        if(gradient_support === false && mask_support === false) {
            detectWarning.css({display: "block"});
            warningMasks.css({display: "inline"});
            warningGradient.css({display: "inline"});
            warningBoth.css({display: "inline"});
        }
    };

    detectFeatures();
});