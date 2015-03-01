var lastScrollTop = 0;

function docenteExpand(){
	$('.teacher-details').slideToggle('toggleSlide');
	$('html, body').stop().animate({
		'scrollTop': $('.teacher').offset().top
	}, 500, 'swing', function () {
		//window.location.hash = target;
	});
};

$(document).ready(function(){

	if ( $(window) <= 0) {
		$('nav').removeClass('nav-scrollup');
		$('.menues .top').removeClass('scrollup').hide();
	};

	// Detalles del docente solo cambio de texto
	$('.teacher h1').on('click', function(){
		docenteExpand();
		if ( $('.teacher h1 span').text() == 'ver-' ) {
			$('.teacher h1 span').text('ver+');
		} else{
			$('.teacher h1 span').text('ver-');
		};
	});

	$('.teacher-details p i').on('click', function(){
		docenteExpand();
		$('.teacher h1 span').text('ver+');
	});

	// ir arriba
	$('.top').on('click', function(e){
		e.preventDefault();
		$('html, body').stop().animate({
			'scrollTop': 0
		}, 1200, 'swing', function () {
			//window.location.hash = target;
		});
	});

	// boton te lleva a ver cursos manuales
	$('#link-to-manuales').on('click', function(e){
		e.preventDefault();
		$('html, body').stop().animate({
			'scrollTop': $('#manuales').offset().top +17
		}, 900, 'swing', function () {
			//window.location.hash = target;
		});
	});

	// boton te lleva a ver cursos informaticos
	$('#link-to-informaticos').on('click', function(e){
		e.preventDefault();
		$('html, body').stop().animate({
			'scrollTop': $('#informaticos').offset().top +17
		}, 900, 'swing', function () {
			//window.location.hash = target;
		});
	});

	// boton que te lleva a inscripcion
	$('#link-to-inscripcion').on('click', function(e){
		e.preventDefault();
		$('html, body').stop().animate({
			'scrollTop': $('.full-price').offset().top
		}, 1000, 'swing', function () {
			//window.location.hash = target;
		});
	});

	// se abre el menú
	$('.menu').on('click', function(){
		$('.expanded-menu').fadeIn(400);
		$('.menu-items').addClass('expand');
		$('body, html').css('overflow', 'hidden')
		$('nav').hide();
	});

	// se abre el menú
	$('.menu.menu-exp').on('click', function(){
		$('.expanded-menu').fadeOut(100);
		$('.menu-items').removeClass('expand');
		$('body, html').css('overflow', 'visible')
		$('nav').show();
	});

});

	
$(window).scroll(function(){

	var st = $(this).scrollTop();

	if (st > lastScrollTop){
		// scroll down
		$('nav').fadeOut(100).removeClass('nav-scrollup');
		$('.menues .top').fadeOut().removeClass('scrollup');
	} else {
		// scroll up
		if (st <= 150) {
			$('nav').removeClass('nav-scrollup');
			$('.menues .top').hide().removeClass('scrollup');
		} else {
			$('nav').slideDown(150).addClass('nav-scrollup');
			if ( $(window).width() > 768 && st > 450) {
				$('.menues .top').fadeIn().addClass('scrollup');
			};
		}
	}

	lastScrollTop = st;

});