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


// Resizing Sticky Header - Не работает в IE10+
//---------------------------------------------
/*$(document).scroll(function() {
	navbarScroll();
});

function navbarScroll() {
	var y = window.scrollY;
	if (y > 10) {
		$('.page-header').addClass('small');
	} else if (y < 10) {
		$('.page-header').removeClass('small');
	}
}
*/


// Smooth page scroll to an anchor 
//---------------------------------------------
(function() {

var headerHeight = $(".page-header").height();

// Select all links with hashes
$('a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
		// On-page links
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
			&& 
			location.hostname == this.hostname
		) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top -  headerHeight
				}, 1000, function() {
					// Callback after animation
					// Must change focus!
					var $target = $(target);
					$target.focus();
					if ($target.is(":focus")) { // Checking if the target was focused
						return false;
					} else {
						$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
						$target.focus(); // Set focus again
					};
				});
			}
		}
	});

})();


// Custom select with custom scrollbar
//---------------------------------------------
(function() {
	$('select').select2({
		width: '100%',
		minimumResultsForSearch: 'Infinity'
		});
	$('select').on('select2:open', function(e){
		$('.select2-results__options').scrollbar().parent().addClass('scrollbar-inner');
	});
})();


}); // End jQuery


// Resizing Sticky Header. Работает в  IE 10+
// --------------------------------------------
window.onscroll = function() {
	navbarScroll();
};

function navbarScroll() {
	var y = document.querySelector('.page-header');
	if (document.body.scrollTop > 10  || document.documentElement.scrollTop > 10) {
		y.classList.add('small');
	} else if (document.body.scrollTop < 10) {
		y.classList.remove('small');
	}
}



// Range slider
// --------------------------------------------
var scale = document.getElementById("scale"),
		svg = document.querySelector("label[for='scale'] svg"),
		svgns = "http://www.w3.org/2000/svg",
		triangle = svg.getElementsByTagNameNS(svgns, "rect")[0];

function scaleChange() {
	triangle.setAttribute("width",scale.value);
}