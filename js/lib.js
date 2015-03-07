var lastScrollTop = 0;
var top = $(window).scrollTop();
	left = $(window).scrollLeft();

function docenteExpand(){
	$('.teacher-details').slideToggle('toggleSlide');
	$('html, body').stop().animate({
		'scrollTop': $('.teacher').offset().top
	}, 500, 'swing', function () {
		//window.location.hash = target;
	});
}

function superScrollDown(scrollToX){
	return true;
}


$(document).keyup(function(e) {
	// Tecla ESC
	if (e.keyCode == 27) { 

		// Oculta los modal
		$('.modal-dialog').fadeOut(150);

		// Se cierra el menú
		$('.expanded-menu').fadeOut(100);
		$('.menu-items').removeClass('expand');
		// $('body, html').css('overflow', 'visible')
		if ( $(window).scrollTop() > 5) {
			$('nav').show().addClass('nav-scrollup')
		}
	}
});

$(document).ready(function(){

	if ( $(window) <= 0) {
		$('nav').removeClass('nav-scrollup');
		$('.menues .top').removeClass('scrollup').hide();
	}

	// Detalles del docente solo cambio de texto
	$('.teacher h1').on('click', function(){
		docenteExpand();
		if ( $('.teacher h1 span').text() == 'ver-' ) {
			$('.teacher h1 span').text('ver+');
		} else{
			$('.teacher h1 span').text('ver-');
		}
	});

	$('.teacher-details p i').on('click', function(){
		docenteExpand();
		$('.teacher h1 span').text('ver+');
	});

	// ir arriba
	$('.top').on('click', function(e){
		e.preventDefault();
		$(this).blur();
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
		// $('body, html').css('overflow', 'hidden')
	});

	// se cierra el menú
	$('.menu.menu-exp').on('click', function(){
		$('.expanded-menu').fadeOut(100);
		$('.menu-items').removeClass('expand');
		// $('body, html').css('overflow', 'visible')
		if ( $(window).scrollTop() > 5) {
			$('nav').show().addClass('nav-scrollup')
		}
	});

	// Salir de un modal
	$('.btn-secondary.esc').on('click', function(e){
		e.preventDefault();
		$('.modal-dialog').fadeOut(150);
	});
	

	//INSCRIPCION

	//previene link del a
	$('.pick-course a').on('click', function(e){
		e.preventDefault();
	});

	//agrega borde naranja y otros estilo
	$('.pick-course').on('click', function(){
		//agarra el titulo del curso
		var acronimo 	= $(this).find('.acronym').text();
			titulo		= $(this).find('.course-title').text();
		if ( $(this).hasClass('active') ) {
			$(this).removeClass('active');
			$('.alerta-inscripcion span').text("");
			$('#inscripto').val("");
			$('.alerta-inscripcion').removeClass('show');
		} else {
			$('.pick-course').removeClass('active');
			$(this).addClass('active');
			//pega el titulo del curso
			$('.alerta-inscripcion span').text(" " + acronimo + " - " + titulo);
			$('#inscripto').val(acronimo);
			$('.alerta-inscripcion').addClass('show');
		}
	});

});

	
$(window).scroll(function(){

	var st = $(this).scrollTop();

	if (st > lastScrollTop){
		// scroll down
		if ( $(window).width() > 768) {
			$('nav').fadeOut(100).removeClass('nav-scrollup');
		} else {
			$('nav').hide().removeClass('nav-scrollup');
		}
		$('.menues .top').fadeOut().removeClass('scrollup');
	} else {
		// scroll up
		if ( $(window).width() > 768) {
			if (st <= 5) {
				$('nav').removeClass('nav-scrollup');
				$('.menues .top').hide().removeClass('scrollup');
				$('.menu-top').hide();
			} else {
				$('nav').slideDown(150).addClass('nav-scrollup');
				if (st > 450) {
					$('.menues .top').fadeIn(1000).addClass('scrollup');
				}
			}
		} else {
			if (st <= 0) {
				$('nav').removeClass('nav-scrollup');
				$('.menu-top').hide();
			} else {
				$('nav').fadeIn(100).addClass('nav-scrollup');
				if (st > 450) {
					$('.menu-top').fadeIn();
				}
			}
		}
		
	} //end if

	lastScrollTop = st;

});