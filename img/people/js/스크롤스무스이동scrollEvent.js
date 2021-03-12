$(function(){
	var t=0;
	
	//시나리오 - 스크롤 이벤트 발생할때 상단에서 헤더높이 75픽셀이상 발생하면 
	//헤더를 상단에 고정하고 배경을 검정으로 변경 높이는 60픽셀로 변경,
	//로고와 메뉴메뉴 위치도 변경하는 스크롤 이벤트
	//만약 75픽셀 미만이면 다시 헤더높이 75픽셀로 변경 로고 메뉴 모두 원위치 
	//헤더 배경 투명으로 변경
	//추가 섹션2 상단으로 부드럽게 이동 
	
	
	$(window).scroll(function(){
		
		if( $(window).scrollTop()>=75 ){
			if(t==0){
				$('#header, #header>div>ul>li>h1, #nav>ul, .goTop-wrap').addClass('addFixed');
				$('html, body').stop().animate({scrollTop: $('#section2').offset().top },1000,'easeOutExpo');
				t=1; //딱 한번만 스크롤 수행하게 함.
			}				
		}
		else{
			$('#header, #header>div>ul>li>h1, #nav>ul, .goTop-wrap').removeClass('addFixed');			
			t=0;
		}
		
	});
	
	
});//scrollEvent.js