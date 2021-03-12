$(function(){
	
	$('.sec10_14').on({
		mouseenter:	function(){
			$(this).addClass('addOpac');
			$(this).find('i').addClass('addOpac');
		},
		mouseleave:	function(){
			$(this).removeClass('addOpac');
			$(this).find('i').removeClass('addOpac');
		}
	});
	
	
});//section10_11_12_13_14.js