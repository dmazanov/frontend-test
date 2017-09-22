jQuery(document).ready(function( $ ) {
	"use strict";

// Menu Hamburger 
(function() {
	$('.hamburger').click(function() {
		$(this).toggleClass('open');
	});
})();


// Responsive Menu
//---------------------------------------------
(function() {
	var menuButton = $('.menu-toggler'),
			menu = $('.menu');

	$(menuButton).on('click', function(e) {
		e.preventDefault();
		menu.stop(true, true).slideToggle();
	});

	$(window).resize(function() {
		var w = $(window).width();
		if( w > 760 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});
	})();

	});