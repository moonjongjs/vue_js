$(function(){

	modalObj.init();

}); //modal.js

var imgNum=0;
var modalObj = {  
	init:	function(){
		
		$('.modal-window').hide();
		
		modalObj.modalClose();
		modalObj.modalOpen();
		modalObj.modalNextArrowBtnFn();
		modalObj.modalPrevArrowBtnFn();
		
	},
	modalClose:	function(){
		
		$('.modalCloseBtn').on({
			click:	function(){
				$('.modal-window').hide();
				$('html').removeClass('addScroll');
			}
		});		
		
	},
	modalOpen:	function(){

		$('.gallery').on({
			click:	function(){
				$('.modal-window').show();
				$('html').addClass('addScroll');
				
				//클릭한 갤러리 이미지가 모달창 이미로 변경하기
				
				imgNum = $(this).find('img').attr('src').slice(19,21);
				
				winH = $(window).innerHeight()-40;
				$('.modal-window img').css({height:winH,paddingTop:20,width:'auto'});		

				modalObj.aniFn( imgNum );
				
			}
		});
		
	},
	aniFn: 	function(z){
		$('.modal-window img')	.stop().animate({opacity:0},0)
								.attr('src','img/photography-img' + z + '.jpg')
								.animate({opacity:1},1000);		
	},
	modalNextArrowBtnFn:	function(){
		
		$('.modalRightArrowBtn').on({ //다음이미지
			click:	function(){
				imgNum++;
				if(imgNum > 24){
					imgNum=13; //끝에서 처음으로 롤링 이미지
				}
				modalObj.aniFn( imgNum );
			}
		});
	},
	modalPrevArrowBtnFn:	function(){
	
		$('.modalLeftArrowBtn').on({  //이전이미지
			click:	function(){
				imgNum--;
				if(imgNum < 13){
					imgNum=24; //처음에서 끝으로 롤링 이미지
				}			
				modalObj.aniFn( imgNum );
			}
		});
		
	}
		
};







