$(function(){

	winHObj.init();
	
}); //section1_4.js
var winH = 0;
var winW = 0;
var fontSize = 0;
var fontPercent = 0; 

	
var winHObj = {
	init:	function(){
		winHObj.winResize();
		winHObj.fontSizeResizeFn();
		winHObj.winHFn();
	},
	winHFn: function(){
		winH = $(window).innerHeight();
		$('.section1-4').css({height:winH});

	},
	winResize:	function(){
		$(window).resize(function(){
			winHObj.winHFn();
			winHObj.fontSizeResizeFn();
		});				
	},
	fontSizeResizeFn:	function(){
		winW =  $(window).innerWidth();
		fontPercent = 200/1903; 	//0.105097215 화면 너비의 글자크기의 비율 = 글자크기/최초의 화면너비
		$('.section1-4 h2').css({fontSize: winW*fontPercent, marginTop:-(winW*fontPercent)/2 });
	}
}








