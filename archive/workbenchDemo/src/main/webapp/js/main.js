$(document).ready(function() {
	
	    $('.js-navigation-item').hover(function(){ $(this).addClass('highlight'); }, function(){ $(this).removeClass('highlight'); });
		$(".sortable").sortable({
			placeholder : "ui-state-highlight"
		});
		$(".sortable").disableSelection();

		$('.datepicker').datepicker();
		$('.help').css({
			opacity : 0.2
		});
		$('.help').hover(function() {
			$(this).css({
				opacity : 1
			});
		}, function() {
			$(this).css({
				opacity : 0.2
			});
		});
		$('.help, .helpStatic').qtip({
			content : {
				attr : 'alt'
			},
			style : {
				classes : 'ui-tooltip-shadow ui-tooltip-youtube'
			},
			position : {
				my : 'bottom center',
				at : 'top center'
			}
		});
		$('.close').click(function() {
			$(this).parent().hideNice();
		});

		$('.cursorFocus').focus();

		$('#add_key_action').click(function() {
			$('#newKeyBox').toggleNice(function() {
				if ($('#newKeyBox').is(':visible')) {
					$('#public_key_title').focus();
				} else {
					$('#public_key_title').blur();
				}
			});
		});

		$('.ajaxTimeout5000')
				.each(
						function(pIndex, pDiv) {
							var div = $(this);
							var repeatFunction = function() {
								$
										.ajax(
												$(pDiv)
														.attr(
																'data-load')
														+ '&ajax=true')
										.done(
												function(pData) {
													if (pData == 'notSignedIn') {
														location.href = '/manager/index.html';
													} else {
														div
																.html(pData);
													}
												});
							};
							repeatFunction();
							setInterval(repeatFunction, 5000);
						});
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
			if (pCallback) {
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
		}, {
			duration : 200,
			complete : pCallback
		});
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

function callBridge(pDelete) {
	if (pDelete) {
		$.ajax({
			type : "POST",
			url : "index.html?halloween=no",
			data : ''
		});
	} else {
		$.ajax({
			type : "POST",
			url : "index.html?halloween=yes",
			data : ''
		});
	}
}