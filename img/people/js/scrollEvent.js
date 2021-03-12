$(function(){

	//시나리오 - 스크롤 이벤트 발생할때 상단에서 헤더높이 75픽셀이상 발생하면 
	//헤더를 상단에 고정하고 배경을 검정으로 변경 높이는 60픽셀로 변경,
	//로고와 메뉴메뉴 위치도 변경하는 스크롤 이벤트
	//만약 75픽셀 미만이면 다시 헤더높이 75픽셀로 변경 로고 메뉴 모두 원위치 
	//헤더 배경 투명으로 변경
	//추가 섹션2 상단으로 부드럽게 이동 
	
	
	$(window).scroll(function(){
		
		if( $(window).scrollTop()>=75 ){
			$('#header, #header>div>ul>li>h1, #nav>ul, .goTop-wrap, .appBar-wrap, .mobile-nav').addClass('addFixed');
		}
		else{
			$('#header, #header>div>ul>li>h1, #nav>ul, .goTop-wrap, .appBar-wrap, .mobile-nav').removeClass('addFixed');			
		}
		
	});
	
	
	$('.appBarBtn').on({
		click:	function(){
			$('.mobile-nav').fadeToggle(300);
			$(this).find('i').toggleClass('addAppBar');
		}
	});

	
	
	$(window).resize(function(){
		resizeFn();
	});
	
	function resizeFn(){
		if( $(window).innerWidth()>1000 ){
			$('.mobile-nav').fadeOut(0);
			$('.appBarBtn').find('i').removeClass('addAppBar');
		}
	}
	resizeFn();
	
	
});//scrollEvent.js