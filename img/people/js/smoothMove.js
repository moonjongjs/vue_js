$(function(){



	$('.smoothBtn').on({
		click:	function(){
			var url = $(this).attr('href');
			
			console.log( url );
			
			$('html,body').animate({scrollTop: $( url ).offset().top },800,'easeInOutExpo');
		}
	});

}); //smoothMove.js