$(function(){
	var t=0;
	
	$('.sendBtn').on({
		click:	function(){
			
			if( 
				$('#idirum').val()==''  || 
				$('#idemail').val()=='' || 
				$('#idemail').val().indexOf('@')==-1 || 
				$('#idemail').val().indexOf('.')==-1 || 
				$('#idmessage').val()==''  
			){
				
				if( $('#idirum').val()=='' ){
					$('#idirum').css({border:'2px solid #c00'});
				}
				else{
					$('#idirum').css({border:'2px solid #e8e8e8'});
				}
				
				if( $('#idemail').val()=='' || $('#idemail').val().indexOf('@')==-1 || $('#idemail').val().indexOf('.')==-1 ){
					$('#idemail').css({border:'2px solid #c00'});
				}
				else{
					$('#idemail').css({border:'2px solid #e8e8e8'});
				}
				
				if( $('#idmessage').val()=='' ){
					$('#idmessage').css({border:'2px solid #c00'});
				}
				else{
					$('#idmessage').css({border:'2px solid #e8e8e8'});
				}
				
				
				if( t==0 ){
					$('.form').append('<li style="background:#fdd947; border:1px solid #fdd947; padding:15px 0; text-align:center; color:#000; font-size:11px; margin:20px 0;">Validation errors occurred. Please confirm the fields and submit it again.</li>')	
					t=1;
				}
				
				return false;
			}
			else{
				
				contactForm.submit();  //정보전송
				alert('정보전송 확인');
				t=0;
				$('#idirum').val()='';
				$('#idemail').val()='';
				$('#idmessage').val()='';
								
			}
			
		}
	});
	
}); //form.js

