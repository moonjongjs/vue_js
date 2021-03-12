(function($){

    //목록버튼 클릭 이벤트 
    $('.selectBtn').on({
        click:  function(event){
            event.preventDefault();
            var a = [];
        
            $.ajax({
                url:'dot_selectForm.php',
                type:'POST',
                success:function(data){
                     //응답메시지 Response
                    

                        $(data).find('tr').each(function(index,obj){
                            a[index] = [];
                            a[index][0] = $(obj).find('td').eq(0).text();
                            a[index][1] = $(obj).find('td').eq(1).text();
                            a[index][2] = $(obj).find('td').eq(2).text();
                            a[index][3] = $(obj).find('td').eq(3).text();
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
//ajaxHTMLSelectPHP.js
// localhost/addr/