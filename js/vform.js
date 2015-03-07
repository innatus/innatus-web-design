$(document).ready(function(){

	$(window.location.hash).addClass('active');
	$('#inscripto').val(window.location.hash);

	$('.radiobuttons input').on('click', function(e){
		$(".radiobuttons").attr('style', '');
	});

	// se va el borde rojo si está bien al hacer Blur
	$('.datos-inscripcion input').on('click, blur', function(e){
		if ( $(this).val() != ''){
			$(this).attr('style', '');
		}
		if ( $(this).attr('id') == 'email' ) {
			if ( valemail($(this).val()) ) {
				$(this).attr('style', '');
			}
		}
	});

	// SIGUIENTE cursos
	$('.paso-a').on('click', function(e){
		e.preventDefault();
		pickCourse(1);
	});

	// SIGUIENTE datos alumnos
	$('.paso-b').on('click', function(e){
		e.preventDefault();
		pickCourse(0);
		validateStage(2);
	});

	// SIGUIENTE reCaptcha
	$('.paso-captcha').on('click', function(e){
		e.preventDefault();
		if ( pickCourse(0) ) {
			validateStage(0);
		};
	});

	// CONFIRMA submit
	$('.paso-c').on('click', function(e){
		e.preventDefault();
		$('#inscription').submit();
	});

	// MODIFICAR Confirm submit
	$('.btn-secondary.cancel-conf').on('click', function(e){
		e.preventDefault();
		$('.modal-dialog').fadeOut(150);
		$('html, body').stop().animate({
			'scrollTop': $('.datos-inscripcion').offset().top - 50
		}, 900, 'swing', function () {
			// OCULTA NAV AL SCROLL-UP
			scrollupNavHide();
		});
	});

});

// VALIDA el mail
function valemail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// MODAL texto 
function showModal(title, body) {
	$('.modal-dialog.modal-error')
		.fadeIn().find('h1').text(title);
	$('.modal-dialog.modal-error')
		.fadeIn().find('p').html(body);
}

// VALIDACION gral
function validateStage(stage) {

	var names = ''; // TODO OK CON LOS INPUTS!

	//--------------------------

	// pinta los inputs con borde rojo si se hace click en siguiente con alguno de estos vacío
	$('.datos-inscripcion .required').each( function( i, val ) {
		if ( $(this).val() == '' ) {
			names += $(this).attr('id') + ', ';
			$(this).css('border', '1px solid red');
		} else {
			if ($(this).attr('type') !== 'radio' )
				$(this).addClass('validated-ok');
		}
	});

	// pinta el div con borde rojo si se hace click en siguiente y no se seleccionó una opcion radio
	if ($("input[name='dia']:checked").length == 0){
		names += 'dia de cursada, ';
		$('.radiobuttons').css('border', '1px solid red');
	} else {
		$('.radiobuttons:first').addClass('validated-ok');
	}

	// detecta si el mail es válido y en caso de error, pinta el borde de rojo
	if ( !valemail($('#email').val()) && $('#email').val() !== '' ) {
		names += 'email incorrecto, ';
		$('#email').css('border', '1px solid red');
	} else {
		$('#email').addClass('validated-ok');
	}

	//-----------------------------

	// PRIMERO PREGUNTO SI EXISTE ALGÚN CURSO SELECCIONADO
	// pickCourse(2);

	// SI NAMES = OK
	if (names == '') {
		// SI STAGE = 2) MUESTRA PASO SIG
		if ( stage == 2 ) {
			$('.datos-estadistica').slideDown();
			$('html, body').stop().animate({
			'scrollTop': $('.datos-estadistica').offset().top -50
			}, 800, 'swing', function () {
			 	// OCULTA NAV AL SCROLL-UP
			 	scrollupNavHide();
			});
		} else {
			// SINO CONFIRM-CALL-FUNC. DONE!
			confirmForm();
		}
	} else {
		// ERRORES INPUTS
		names = names.substring(0, names.length - 2);
		body = "Tenés que completar los campos obligatorios (*): <span>" + names + "</span>";
		showModal('Error', body);

		$('html, body').stop().animate({
			'scrollTop': $('.datos-inscripcion').offset().top -50
		}, 800, 'swing', function () {
			// OCULTA NAV AL SCROLL-UP
			scrollupNavHide();
		});
	}

}

function pickCourse(stage) {

	coursePicked = $('.pick-course').hasClass('active');

	if (!coursePicked) {
		// SI NO HAY CURSO SELECCIONADO SALE ERROR
		showModal('Error', 'Tenés que seleccionar un curso');
		$('html, body').stop().animate({
			'scrollTop': $('.select-course').offset().top
		}, 800, 'swing', function () {
			// OCULTA NAV AL SCROLL-UP
			scrollupNavHide();
		});
	} else {
		if ( stage == 1 ) {
			$('.datos-inscripcion').slideDown();
			$('html, body').stop().animate({
			'scrollTop': $('.datos-inscripcion').offset().top
			}, 800, 'swing', function () {
			 	// OCULTA NAV AL SCROLL-UP
			 	scrollupNavHide();
			});
		} else {
			return true;
		}
	}
}

function confirmForm() {
	// toma el valor de los inputs requeridos y los muestra para confirmar
	$('.conf-curso').text( $('#inscripto').val() );
	$('.conf-nombre').text( $('#nombre').val() );
	$('.conf-apellido').text( $('#apellido').val() );
	$('.conf-dni').text( $('#dni').val() );
	$('.conf-email').text( $('#email').val() );
	$('.conf-telefono').text( $('#telefono').val() );

	$('.modal-dialog.modal-submit').fadeIn();
}

function scrollupNavHide(){
	$('nav').fadeOut(100).removeClass('nav-scrollup');
	$('.menues .top').fadeOut().removeClass('scrollup');
	$('.menu-top').hide();
}