$(document).ready(function(){

	$('.teacher h1, .teacher-details p i').on('click', function(){
		$('.teacher-details').slideToggle('toggleSlide');
	});

// 	blog();

	$('.acronym, .courseTitle').click(function(event){
		event.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	$('a[href^="#detalles"], a[href^="#second"]').on('click',function (e) {
		e.preventDefault();

		var target = this.hash;
		$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top - 79
		}, 900, 'swing', function () {
//	        window.location.hash = target;
		});
	});

	
// $(window).resize(function(){
// 	blog();
});

$(window).scroll(function(){
	var scrollPos 		= $(this).scrollTop();
		headerHei 		= $('.background').height();
		navHei		 	= $('.navbar').offset().top;
		navDist			= (navHei - scrollPos); 

	if (scrollPos > headerHei) {
		$('.navbar').css('position','fixed');
		$('.modulo').css('padding-top','185px');

	} else {
		$('.navbar').css('position','relative');
		$('.modulo').css('padding-top','100px');
	};
});