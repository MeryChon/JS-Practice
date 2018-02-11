var createSlideshow = function(slideshowElem, duration) {
	if(duration === undefined) {
		duration = 5000;
	}
	var images = slideshowElem.children();
	images.hide();
	
	var timeOfSlideIn = duration/3;
	var timeOfSlideOut = duration/3;
	var delay = duration/3;
	var numberOfImages = images.length;
	var i = 0;

	(function swapImages() {
		images.eq(i).fadeIn(timeOfSlideIn).delay(delay).fadeOut(timeOfSlideOut);
		i = (i+1)%numberOfImages;
		setTimeout(swapImages, duration);
	})();
};

$(document).ready(function() {
	var slideShowElements = $(".slideshow");
	createSlideshow(slideShowElements, 3000);
});
