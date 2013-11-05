$(document).ready(function() {
	$('.cursorFocus').focus();
});

jQuery.fn.hideNice = function(pCallback) {
	var el = $(this);
	el.animate({
		opacity : 0.01
	}, 100, function() {
		el.hide('appear', function() {
			el.css({
				opacity : 1
			});
			if (pCallback){
				pCallback();
			}
		});
	});
}

jQuery.fn.showNice = function(pCallback) {
	var el = $(this);
	var oldheight = el.height();
	el.css({
		opacity : 0.01
	});
	el.slideDown(function() {
		el.animate({
			opacity : 1
		}, {duration: 200, complete: pCallback});
	});	
	
}
jQuery.fn.toggleNice = function(pCallback) {
	var el = $(this);
	if (el.is(":visible")) {
		el.hideNice(pCallback);
	} else {
		el.showNice(pCallback);
	}
}