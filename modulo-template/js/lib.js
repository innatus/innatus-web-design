$(document).ready(function(){

	$('.teacher div h1').on('click', function(){
		$('.teacher-details').slideToggle('toggleSlide');
	

	});

// 	blog();

// 	$('#upTop').click(function(event){
// 		event.preventDefault();

// 		$('html, body').animate({
// 			scrollTop: 0
// 		}, 1000);
// 	});

	
// });

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