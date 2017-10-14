$( document ).ready(function() {
    console.log( "ready!" );

// Boba Fett flashing animation
	$('#bobafett').click(function() {
	    $('#bobafett').attr('src', 'assets/images/bobafett flash.png');
	    setTimeout(function() {
	          $('#bobafett').attr('src', 'assets/images/bobafett.png');
	    }, 100);
	    setTimeout(function() {
	    	  $('#bobafett').attr('src', 'assets/images/bobafett flash.png');
	    }, 200);
	    setTimeout(function() {
	          $('#bobafett').attr('src', 'assets/images/bobafett.png');
	    }, 300);
	});

// Chewy flashing animation
	$('#chewy').click(function() {
	    $('#chewy').attr('src', 'assets/images/chewy flash.png');
	    setTimeout(function() {
	          $('#chewy').attr('src', 'assets/images/chewy.png');
	    }, 100);
	    setTimeout(function() {
	    	  $('#chewy').attr('src', 'assets/images/chewy flash.png');
	    }, 200);
	    setTimeout(function() {
	          $('#chewy').attr('src', 'assets/images/chewy.png');
	    }, 300);
	});

// Darth Vader flashing animation
	$('#darthvader').click(function() {
	    $('#darthvader').attr('src', 'assets/images/darthvader flash.png');
	    setTimeout(function() {
	          $('#darthvader').attr('src', 'assets/images/darthvader.png');
	    }, 100);
	    setTimeout(function() {
	    	  $('#darthvader').attr('src', 'assets/images/darthvader flash.png');
	    }, 200);
	    setTimeout(function() {
	          $('#darthvader').attr('src', 'assets/images/darthvader.png');
	    }, 300);
	});

// Luke flashing animation
	$('#luke').click(function() {
	    $('#luke').attr('src', 'assets/images/luke flash.png');
	    setTimeout(function() {
	          $('#luke').attr('src', 'assets/images/luke.png');
	    }, 100);
	    setTimeout(function() {
	    	  $('#luke').attr('src', 'assets/images/luke flash.png');
	    }, 200);
	    setTimeout(function() {
	          $('#luke').attr('src', 'assets/images/luke.png');
	    }, 300);
	});

// Obi Wan flashing animation
	$('#obiwan').click(function() {
	    $('#obiwan').attr('src', 'assets/images/obiwan flash.png');
	    setTimeout(function() {
	          $('#obiwan').attr('src', 'assets/images/obiwan.png');
	    }, 100);
	    setTimeout(function() {
	    	  $('#obiwan').attr('src', 'assets/images/obiwan flash.png');
	    }, 200);
	    setTimeout(function() {
	          $('#obiwan').attr('src', 'assets/images/obiwan.png');
	    }, 300);
	});

// Yoda flashing animation
	$('#yoda').click(function() {
	    $('#yoda').attr('src', 'assets/images/yoda flash.png');
	    setTimeout(function() {
	          $('#yoda').attr('src', 'assets/images/yoda.png');
	    }, 100);
	    setTimeout(function() {
	    	  $('#yoda').attr('src', 'assets/images/yoda flash.png');
	    }, 200);
	    setTimeout(function() {
	          $('#yoda').attr('src', 'assets/images/yoda.png');
	    }, 300);
	});
})