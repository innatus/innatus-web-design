$(document).ready(function(){

	$(window.location.hash).addClass('active');
	$('#inscripto').val(window.location.hash);

	// despliega el paso B
	$('.paso-a').on('click', function(e){
		e.preventDefault();
		var choosed = $('.pick-course');

		if (choosed.hasClass('active')) {
			$('.datos-inscripcion').slideDown();
			$('html, body').stop().animate({
				'scrollTop': $('.datos-inscripcion').offset().top - 50
			}, 900, 'swing', function () {
				// window.location.hash = target;
			});
		} else {
			// error elegir curso
			showModal('Error', 'Tenés que elegir un curso');
		}

	});

	// despliega el paso C
	$('.paso-b').on('click', function(e){
		e.preventDefault();
		validateStage1(1);
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

		if ( validateStage1(2) ) {

			$('.conf-curso').text( $('#inscripto').val() );
			$('.conf-nombre').text( $('#nombre').val() );
			$('.conf-apellido').text( $('#apellido').val() );
			$('.conf-dni').text( $('#dni').val() );
			$('.conf-email').text( $('#email').val() );
			$('.conf-telefono').text( $('#telefono').val() );

			$('.modal-dialog.modal-submit').fadeIn();
		}

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

function valemail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function showModal(title, body) {
	$('.modal-dialog.modal-error')
		.fadeIn().find('h1').text(title);
	$('.modal-dialog.modal-error')
		.fadeIn().find('p').html(body);
}

function validateStage1(stage) {

	var names = '';

	coursePicked = $('.pick-course').hasClass('active');

	if ( !coursePicked ) {
		showModal('Error', 'Tenés que elegir un curso');
	}

	$('.datos-inscripcion .required').each( function( i, val ) {
		if ( $(this).val() == '' ) {
			names += $(this).attr('id') + ', ';
			$(this).css('border', '1px solid red');
		} else {
			if ($(this).attr('type') !== 'radio' )
				$(this).addClass('validated-ok');
		}
	});

	if ($("input[name='dia']:checked").length == 0){
		names += 'dia de cursada, ';
		$('.radiobuttons').css('border', '1px solid red');
	} else {
		$('.radiobuttons:first').addClass('validated-ok');
	}

	if ( !valemail($('#email').val()) && $('#email').val() !== '' ) {
		names += 'email incorrecto, ';
		$('#email').css('border', '1px solid red');
	} else {
		$('#email').addClass('validated-ok');
	}

	if (names == '') {
		if ( stage == 1 ) {

			$('.datos-estadistica').slideDown();
			$('html, body').stop().animate({
				'scrollTop': $('.datos-estadistica').offset().top - 50
			}, 900, 'swing', function () {
				// window.location.hash = target;
			});

		} else {
			return true;
		}
	} else {
		// Modal sumatoria de errores
		names = names.substring(0, names.length - 2);
		body = "Tenés que completar los campos: <span>" + names + "</span>";
		showModal('Error', body);
	}

}