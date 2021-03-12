(function($){
    var record='';
    var a = [];

    //목록버튼 클릭 이벤트 
    $('.selectBtn').on({
        click:  function(event){
            event.preventDefault();

            $.ajax({
                url:'dot_selectFormXML.php',
                type:'POST',
                success:function(data){
                     //응답메시지 Response
                        console.log(data);

                        $(data).find('record').each(function(index,obj){
                            a[index] = [];
                            a[index][0] = $(obj).find('field').eq(0).text();
                            a[index][1] = $(obj).find('field').eq(1).text();
                            a[index][2] = $(obj).find('field').eq(2).text();
                            a[index][3] = $(obj).find('field').eq(3).text();
                        });
                        
                        console.log(a)
                        $('.output').html(data); //전송정보 확인            

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