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
});