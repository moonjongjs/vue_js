(function($){
    var record='';
    var a = [];

    //목록버튼 클릭 이벤트 
    $('.selectBtn').on({
        click:  function(event){
            event.preventDefault();

            $.ajax({
                url:'dot_selectFormArray.php',
                type:'POST',
                success:function(data){
                     //응답메시지 Response
                    
                        $(data).each(function(index, obj){
                             console.log(index, obj);   
                        });

                        
                        console.log(data)
                        //$('.output').html(data); //전송정보 확인            

                },
                error:function(){
                     alert('AJAX Error!!!');
                }
            });
            
        }
    });


})(jQuery);
//ajaxARRAYSelectPHP.js
// localhost/addr/