$(document).ready(function(){

	$(window.location.hash).addClass('active');
	$('#inscripto').val(window.location.hash);

	// despliega el paso B
	$('.paso-a').on('click', function(e){
		e.preventDefault();

		errorInscripCurso();

		if (choosed.hasClass('active')) {
			$('.datos-inscripcion').slideDown();
			$('html, body').stop().animate({
				'scrollTop': $('.datos-inscripcion').offset().top - 50
			}, 900, 'swing', function () {
				//window.location.hash = target;
			});
		} else {
			msgErrorInscripCurso();
		}

	});

	// despliega el paso C
	$('.paso-b').on('click', function(e){
		e.preventDefault();

		errorInscripFields();

		if (names == '') {
			$('.datos-estadistica').slideDown();
			$('html, body').stop().animate({
				'scrollTop': $('.datos-estadistica').offset().top - 50
			}, 900, 'swing', function () {
				//window.location.hash = target;
			});
		} else {
			msgErrorInscripFields();
		}


	});

	$('.radiobuttons input').on('click', function(e){
		$(".radiobuttons").attr('style', '');
	});

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

	$('.paso-captcha').on('click', function(e){
		e.preventDefault();

		validaCurso		= 0; // ORIGINAL 1
		validaFields	= 0; // ORIGINAL 3

		errorInscripFields();
		errorInscripCurso();

		if (validaCurso+validaFields == 4) {
			alert('Bieen boludo bieeeen!');
			var	confCurso		= $('#inscripto').val(),
				confNombre		= $('#nombre').val(),
				confApellido	= $('#apellido').val(),
				confDni			= $('#dni').val(),
				confEmail		= $('#email').val(),
				confTelefono	= $('#telefono').val();

			$('.modal-dialog.modal-submit').fadeIn();

			$('.conf-curso').text(confCurso);
			$('.conf-nombre').text(confNombre);
			$('.conf-apellido').text(confApellido);
			$('.conf-dni').text(confDni);
			$('.conf-email').text(confEmail);
			$('.conf-telefono').text(confTelefono);
		} else {
			if (validaCurso+validaFields == 3) {
				alert('Faltan campos');
				msgErrorInscripFields();
			} else {
				if (validaCurso+validaFields == 1) {
					alert('Falta curso');
					msgErrorInscripCurso();
				} else {
					alert('Error magnifico');
					msgErrorInscripCaptcha();
				};
			}
		};

	});

	$('.btn-secondary.cancel-conf').on('click', function(e){
		e.preventDefault();
		$('.modal-dialog').fadeOut(150);
		$('html, body').stop().animate({
			'scrollTop': $('.datos-inscripcion').offset().top - 50
		}, 900, 'swing', function () {
			$('nav').fadeOut(100).removeClass('nav-scrollup');
			$('.menues .top').fadeOut().removeClass('scrollup');
			$('.menu-top').hide();
		});
	});

	$('.paso-c').on('click', function(e){
		e.preventDefault();
		$('#inscription').submit();
	});

});

var validaCurso		= 0,
	validaFields	= 0,
	names 			= '',
	choosed 		= $('.pick-course');

function valemail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function errorInscripFields(){ //.datos-estadistica

	$('.datos-inscripcion .required').each( function( i, val ) {
		if ( $(this).val() == '' ) {
			names += $(this).attr('id') + ', ';
			$(this).css('border', '1px solid red');
		}
	});

	if ($("input[name='dia']:checked").length == 0){
		names += 'dia de cursada, ';
		$('.radiobuttons').css('border', '1px solid red');
	}

	if ( !valemail($('#email').val()) && $('#email').val() !== '' ) {
		names += 'email incorrecto, ';
		$('#email').css('border', '1px solid red');
	}

	if (names == '') {
		validaFields = 3;	
	}
}

function errorInscripCurso(){

	if (choosed.hasClass('active')) {
		validaCurso = 1;
	}
}

// MENSAJES DE ERROR

function msgErrorInscripFields(){
	// Modal sumatoria de errores
	names = names.substring(0, names.length - 2);
	$('.modal-dialog.modal-error').fadeIn().find('h1').text("Error");
	// $('.modal-dialog.modal-error').fadeIn().find('span').text(names);
	$('.modal-dialog.modal-error').fadeIn().find('p').html("Tenés que completar los campos: <span>" + names + "</span>");
	// alert('debe completar los campos: ' + names );
}

function msgErrorInscripCurso(){
	// error elegir curso
	$('.modal-dialog.modal-error').fadeIn().find('h1').text("Error");
	$('.modal-dialog.modal-error').fadeIn().find('p').text("Tenés que elegir un curso");
	// alert('elegir curso');
}

function msgErrorInscripCaptcha(){
	// Modal sumatoria de errores
	names = names.substring(0, names.length - 2);
	$('.modal-dialog.modal-error').fadeIn().find('h1').text("Error");
	// $('.modal-dialog.modal-error').fadeIn().find('span').text(names);
	$('.modal-dialog.modal-error').fadeIn().find('p').html("Tenés que seleccionar un curso. Y además tenés que completar los campos: <span>" + names + "</span>");
	// alert('debe completar los campos: ' + names );
}
