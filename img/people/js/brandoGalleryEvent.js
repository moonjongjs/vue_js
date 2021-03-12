$(function(){
	var imgPerSmall= 0.99625;	//세로가 작은 이미지 가로의 대한 세로 비율
	var imgPerBig  = 1.5;		//세로가 큰 이미지 가로의 대한 세로 비율
	var imgHeightSmall = 0; 			//이미지 박스 높이
	var imgHeightBig = 0; 			//이미지 박스 높이
	var smallBigH = 0; 			//이미지2개 박스 높이
	var smallBigH2 = 0; 		//small2 big1이미지 박스 높이
	var smallBigH3 = 0; 		//small1 big2이미지 박스 높이
	var smallBigH4 = 0; 		//small1 big2이미지 박스 높이
	var smallBigH5 = 0; 		//small1 big2이미지 박스 높이
	var smallBigH6 = 0; 		//small1 big2이미지 박스 높이
	var smallBigH7 = 0; 		//small1 big2이미지 박스 높이
	var imgWidth = 0; 			//이미지 박스 너비
	var galleryBoxWidth  = 0  	//이미지 전체박스의 너비
	var galleryBoxHeight = 0 	//이미지 전체박스의 높이
	var winWidth = 0			//창(window)너비  
	var hap=0;
	var t=0;
	
		var autoResize = function(){
			
			if( $(window).innerWidth()<=1170 ){
				$('.section8-gallery-wrap').css({width:'80%', marginLeft:'auto', marginRight:'auto'});
				imgWidth = $('.section8-gallery-wrap').innerWidth() / 3;
			}
			else if( $(window).innerWidth()<=1000 ){
				$('.section8-gallery-wrap').css({width:'auto', marginLeft:'auto', marginRight:'auto'});
				imgWidth = $('.section8-gallery-wrap').innerWidth() / 2;
			}			
			else{
				$('.section8-gallery-wrap').css({width:'100%', marginLeft:'auto', marginRight:'auto'});				
				imgWidth = $('.section8-gallery-wrap').innerWidth() / 1;				
			}


			imgHeightSmall = imgWidth * 0.99625;  //작은이미지 높이
			imgHeightBig = (imgWidth * 1.5)-15;	 //큰이미지 높이	
			
			smallBigH = imgHeightSmall+imgHeightBig;
			smallBigH2 = (imgHeightSmall*2)+imgHeightBig;
			smallBigH3 = imgHeightSmall+(imgHeightBig*2);
			smallBigH4 = (imgHeightSmall*3)+imgHeightBig;
			smallBigH5 = imgHeightSmall+(imgHeightBig*3);
			smallBigH6 = imgHeightSmall+(imgHeightBig*4);
			smallBigH7 = (imgHeightSmall*4)+imgHeightBig;
			
			galleryBoxHeight = ((imgHeightSmall*2) + (imgHeightBig*2))	
			$('.section8-gallery-wrap').stop().animate({height: smallBigH6+300 });
		}
		
		
		
		var galleryFn = function(){

			$('.gallery>div').removeClass('addScale');	
			
			if( $(window).innerWidth() >=761 && $(window).innerWidth() <=1000 ){
				$('.gallery').css({position:'absolute'});
				
				$('.gallery').eq(0) .stop().animate({ width:imgWidth, height:imgHeightSmall, top:imgHeightSmall*0, left:imgWidth*0 },300);	
				$('.gallery').eq(1) .stop().animate({ width:imgWidth, height:imgHeightBig,   top:imgHeightSmall*0, left:imgWidth*1 },300);	
				
				$('.gallery').eq(2) .stop().animate({ width:imgWidth, height:imgHeightSmall, top:imgHeightSmall*1, left:imgWidth*0 },300);	
				$('.gallery').eq(3) .stop().animate({ width:imgWidth, height:imgHeightBig,   top:imgHeightBig*1,   left:imgWidth*1 },300);	
				
				$('.gallery').eq(4) .stop().animate({ width:imgWidth, height:imgHeightSmall, top:imgHeightBig*2,   left:imgWidth*1 },300);	
				$('.gallery').eq(5) .stop().animate({ width:imgWidth, height:imgHeightBig,   top:imgHeightSmall*2, left:imgWidth*0 },300);	
				
				$('.gallery').eq(6) .stop().animate({ width:imgWidth, height:imgHeightSmall, top:smallBigH2, 	   left:imgWidth*0 },300);	
				$('.gallery').eq(7) .stop().animate({ width:imgWidth, height:imgHeightBig,   top:smallBigH3,       left:imgWidth*1 },300);	
				
				$('.gallery').eq(8) .stop().animate({ width:imgWidth, height:imgHeightSmall, top:smallBigH4,       left:imgWidth*0 },300);	
				$('.gallery').eq(9) .stop().animate({ width:imgWidth, height:imgHeightBig,   top:smallBigH5,       left:imgWidth*1 },300);	
				
				$('.gallery').eq(10).stop().animate({ width:imgWidth, height:imgHeightSmall, top:smallBigH6,       left:imgWidth*1 },300);	
				$('.gallery').eq(11).stop().animate({ width:imgWidth, height:imgHeightBig,   top:smallBigH7,       left:imgWidth*0 },300);	

			}
			else if( $(window).innerWidth() >=0 && $(window).innerWidth()  <=760  ){
				$('.gallery').css({position:'relative',top:0,left:0, width:'100%',height:'auto', marginBottom:10});
				
				if( t==0 ){	
					t=1;
					for(i=0; i<=11; i++){ //전체 갤러리 높이 합
						hap+=$('.section8-gallery-wrap>li').eq(i).innerHeight();
						console.log(i, $('.section8-gallery-wrap>li').eq(i).innerHeight());
						console.log( hap);
					}
				}	
				$('.section8-gallery-wrap').stop().animate({height: hap },0);
				
			}
			else{  //1170 초과인경우
				$('.gallery').css({position:'absolute'});
				
				$('.gallery').eq(0) .stop().animate({ width:imgWidth, height:imgHeightSmall, top:imgHeightSmall*0, left:imgWidth*0 },300);	
				$('.gallery').eq(1) .stop().animate({ width:imgWidth, height:imgHeightBig,   top:imgHeightSmall*0, left:imgWidth*1 },300);	
				$('.gallery').eq(2) .stop().animate({ width:imgWidth, height:imgHeightSmall, top:imgHeightSmall*0, left:imgWidth*2 },300);	
				$('.gallery').eq(3) .stop().animate({ width:imgWidth, height:imgHeightBig,   top:imgHeightSmall*1, left:imgWidth*0 },300);	
				$('.gallery').eq(4) .stop().animate({ width:imgWidth, height:imgHeightSmall, top:imgHeightBig*1, 	left:imgWidth*1 },300);	
				$('.gallery').eq(5) .stop().animate({ width:imgWidth, height:imgHeightBig,   top:imgHeightSmall*1, left:imgWidth*2  },300);	
				$('.gallery').eq(6) .stop().animate({ width:imgWidth, height:imgHeightSmall, top:smallBigH, 	    left:imgWidth*0 },300);	
				$('.gallery').eq(7) .stop().animate({ width:imgWidth, height:imgHeightBig,   top:smallBigH,        left:imgWidth*1 },300);	
				$('.gallery').eq(8) .stop().animate({ width:imgWidth, height:imgHeightSmall, top:smallBigH,        left:imgWidth*2 },300);	
				$('.gallery').eq(9) .stop().animate({ width:imgWidth, height:imgHeightBig,   top:smallBigH2,       left:imgWidth*0 },300);	
				$('.gallery').eq(10).stop().animate({ width:imgWidth, height:imgHeightSmall, top:smallBigH3,       left:imgWidth*1 },300);	
				$('.gallery').eq(11).stop().animate({ width:imgWidth, height:imgHeightBig,   top:smallBigH2,       left:imgWidth*2 },300);	
			}
			
			$('.gallery>div').addClass('addScale');	
			
		}
		
		
		galleryFn();
		autoResize();
		
		setTimeout(galleryFn, 100);
		setTimeout(autoResize, 100);
		
		$(window).resize(function(){
			autoResize();
			galleryFn();
		});
				
		
		
		//갤러리 버튼 클릭 이벤트
		$('.sec8NavBtn').each(function(index){
			$(this).on({
				click:	function(){
					
					
					
					if( index == 0 ){ //ALL
						$('.gallery>div').removeClass('addScale');
						
						$('.gallery').eq(0) .show().stop().animate({ width:imgWidth, height:imgHeightSmall, top:imgHeightSmall*0, left:imgWidth*0 });	
						$('.gallery').eq(1) .show().stop().animate({ width:imgWidth, height:imgHeightBig,   top:imgHeightSmall*0, left:imgWidth*1 });	
						$('.gallery').eq(2) .show().stop().animate({ width:imgWidth, height:imgHeightSmall, top:imgHeightSmall*0, left:imgWidth*2 });	
						$('.gallery').eq(3) .show().stop().animate({ width:imgWidth, height:imgHeightBig,   top:imgHeightSmall*1, left:imgWidth*0 });	
						$('.gallery').eq(4) .show().stop().animate({ width:imgWidth, height:imgHeightSmall, top:imgHeightBig*1, 	left:imgWidth*1 });	
						$('.gallery').eq(5) .show().stop().animate({ width:imgWidth, height:imgHeightBig,   top:imgHeightSmall*1, left:imgWidth*2 });	
						$('.gallery').eq(6) .show().stop().animate({ width:imgWidth, height:imgHeightSmall, top:smallBigH, 	    left:imgWidth*0 });	
						$('.gallery').eq(7) .show().stop().animate({ width:imgWidth, height:imgHeightBig,   top:smallBigH,        left:imgWidth*1 });	
						$('.gallery').eq(8) .show().stop().animate({ width:imgWidth, height:imgHeightSmall, top:smallBigH,        left:imgWidth*2 });	
						$('.gallery').eq(9) .show().stop().animate({ width:imgWidth, height:imgHeightBig,   top:smallBigH2,       left:imgWidth*0 });	
						$('.gallery').eq(10).show().stop().animate({ width:imgWidth, height:imgHeightSmall, top:smallBigH3,       left:imgWidth*1 });	
						$('.gallery').eq(11).show().stop().animate({ width:imgWidth, height:imgHeightBig,   top:smallBigH2,       left:imgWidth*2 });	
						
						$('.gallery>div').addClass('addScale');
						
					}
					else if( index == 1 ){ //PEOPLE 
					
						$('.gallery>div').removeClass('addScale');
					
						$('.gallery').eq(1).hide();
						$('.gallery').eq(3).hide();
						$('.gallery').eq(5).hide();
						$('.gallery').eq(6).hide();
						$('.gallery').eq(8).hide();

						
						$('.gallery').eq(0) .show().stop().animate({ width:imgWidth, height:imgHeightSmall, 	top:0, 					left:imgWidth*0 });	
						$('.gallery').eq(2) .show().stop().animate({ width:imgWidth, height:imgHeightSmall, 	top:0, 					left:imgWidth*1 });	
						$('.gallery').eq(4) .show().stop().animate({ width:imgWidth, height:imgHeightSmall, 	top:0,					left:imgWidth*2 });	
						$('.gallery').eq(7) .show().stop().animate({ width:imgWidth, height:imgHeightBig,   	top:imgHeightSmall,   	left:imgWidth*0 });	
						$('.gallery').eq(9) .show().stop().animate({ width:imgWidth, height:imgHeightBig,   	top:imgHeightSmall,   	left:imgWidth*1 });	
						$('.gallery').eq(11).show().stop().animate({ width:imgWidth, height:imgHeightBig, 		top:imgHeightSmall,   	left:imgWidth*2 });	
						$('.gallery').eq(10).show().stop().animate({ width:imgWidth, height:imgHeightSmall,   	top:smallBigH,       	left:imgWidth*0 });	
					
						$('.gallery>div').addClass('addScale');	
						
					}
					else if( index == 2 ){ //NATURE   
						$('.gallery>div').removeClass('addScale');
					
						$('.gallery').eq(0).hide();
						$('.gallery').eq(3).hide();
						$('.gallery').eq(6).hide();

						
						$('.gallery').eq(1) .show().stop().animate({ width:imgWidth, height:imgHeightBig, 		top:0, 					left:imgWidth*0 });	
						$('.gallery').eq(3) .show().stop().animate({ width:imgWidth, height:imgHeightBig, 		top:0, 					left:imgWidth*1 });	
						$('.gallery').eq(5) .show().stop().animate({ width:imgWidth, height:imgHeightBig, 		top:0,					left:imgWidth*2 });
						
						$('.gallery').eq(4) .show().stop().animate({ width:imgWidth, height:imgHeightSmall,   	top:imgHeightBig,   	left:imgWidth*0 });	
						$('.gallery').eq(7) .show().stop().animate({ width:imgWidth, height:imgHeightBig,   	top:imgHeightBig,   	left:imgWidth*1 });	
						$('.gallery').eq(8) .show().stop().animate({ width:imgWidth, height:imgHeightSmall, 	top:imgHeightBig,   	left:imgWidth*2 });	
						
						$('.gallery').eq(9).show().stop().animate({ width:imgWidth, height:imgHeightBig,   	top:smallBigH,       	left:imgWidth*0 });	
						$('.gallery').eq(10).show().stop().animate({ width:imgWidth, height:imgHeightSmall,   	top:imgHeightBig*2,     left:imgWidth*1 });	
						$('.gallery').eq(11).show().stop().animate({ width:imgWidth, height:imgHeightBig,   	top:smallBigH,       	left:imgWidth*2 });	

						$('.gallery>div').addClass('addScale');
					}
					else if( index == 3 ){ //WILDLIFE
						
						$('.gallery>div').removeClass('addScale');
						
						$('.gallery').eq(1).hide();
						$('.gallery').eq(2).hide();
						$('.gallery').eq(5).hide();
						$('.gallery').eq(8).hide();

						
						$('.gallery').eq(0) .show().stop().animate({ width:imgWidth, height:imgHeightSmall, 		top:0, 					left:imgWidth*0 });	
						$('.gallery').eq(3) .show().stop().animate({ width:imgWidth, height:imgHeightBig, 			top:0, 					left:imgWidth*1 });	
						$('.gallery').eq(4) .show().stop().animate({ width:imgWidth, height:imgHeightSmall, 		top:0,					left:imgWidth*2 });
						
						$('.gallery').eq(6) .show().stop().animate({ width:imgWidth, height:imgHeightSmall,   		top:imgHeightSmall,   	left:imgWidth*0 });	
						$('.gallery').eq(9) .show().stop().animate({ width:imgWidth, height:imgHeightBig,   		top:imgHeightBig,   	left:imgWidth*1 });	
						$('.gallery').eq(7) .show().stop().animate({ width:imgWidth, height:imgHeightBig, 			top:imgHeightSmall,   	left:imgWidth*2 });	
						
						$('.gallery').eq(11).show().stop().animate({ width:imgWidth, height:imgHeightBig,   		top:imgHeightSmall*2,   left:imgWidth*0 });	
						
						$('.gallery').eq(10).show().stop().animate({ width:imgWidth, height:imgHeightSmall,   		top:smallBigH,     		left:imgWidth*2 });	

						$('.gallery>div').addClass('addScale');
					}
					else if( index == 4 ){ //OBJECTS 
						$('.gallery>div').removeClass('addScale');
						
						$('.gallery').eq(0).hide();
						$('.gallery').eq(3).hide();
						$('.gallery').eq(4).hide();
						$('.gallery').eq(9).hide();
						$('.gallery').eq(10).hide();

						
						$('.gallery').eq(1) .show().stop().animate({ width:imgWidth, height:imgHeightBig, 		top:0, 					left:imgWidth*0 });	
						$('.gallery').eq(2) .show().stop().animate({ width:imgWidth, height:imgHeightSmall, 	top:0, 					left:imgWidth*1 });	
						$('.gallery').eq(5) .show().stop().animate({ width:imgWidth, height:imgHeightBig, 		top:0,					left:imgWidth*2 });
						
						$('.gallery').eq(7) .show().stop().animate({ width:imgWidth, height:imgHeightBig,   	top:imgHeightBig,   	left:imgWidth*0 });	
						$('.gallery').eq(6) .show().stop().animate({ width:imgWidth, height:imgHeightSmall,   	top:imgHeightSmall,   	left:imgWidth*1 });	
						$('.gallery').eq(8) .show().stop().animate({ width:imgWidth, height:imgHeightSmall, 	top:imgHeightBig,   	left:imgWidth*2 });	
						
						$('.gallery').eq(11).show().stop().animate({ width:imgWidth, height:imgHeightBig,   	top:imgHeightSmall*2,   left:imgWidth*1 });	
					
						$('.gallery>div').addClass('addScale');
					} //if end 
					
					
				}
			});
		});
		
		
		
		
		
		
	
});//brandoGalleryEvent.js