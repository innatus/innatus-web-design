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
				//window.location.hash = target;
			});
		} else {
			alert('elegir curso');
		}

	});

	// despliega el paso C
	$('.paso-b').on('click', function(e){
		e.preventDefault();

		var names = '';

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
			$('.datos-estadistica').slideDown();
			$('html, body').stop().animate({
				'scrollTop': $('.datos-estadistica').offset().top - 50
			}, 900, 'swing', function () {
				//window.location.hash = target;
			});
		} else {
			names = names.substring(0, names.length - 2);
			alert('debe completar los campos: ' + names );
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

	$('.paso-c').on('click', function(e){
		e.preventDefault();
		alert('submiting...')
	});

});

function valemail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}