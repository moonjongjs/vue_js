(function($){

    var col = [];
    var currentIdx = '';
    //updateBtn
    $('.updateBtn').on({
        click:  function(event){
            event.preventDefault();  
            $('#modal').show(); 
            $('.chknum').each(function(index){
                if( $('.chknum').eq(index).prop('checked') === true ){
                    currentIdx = $('.chknum').eq(index).val();
                    col[0]=$(this).parent().parent().find('td').eq(2).text();
                    col[1]=$(this).parent().parent().find('td').eq(3).text();
                    col[2]=$(this).parent().parent().find('td').eq(4).text();

                    $('#modal #name').val(col[0]);
                    $('#modal #tel') .val(col[1]);
                    $('#modal #addr').val(col[2]);
                }
            });            
        }
    });

    //수정완료버튼 클릭 이벤트 
    $('.updateCompleteBtn').on({
        click:  function(event){
            event.preventDefault();

            var txtName = $('#modal #name').val();
            var txtTel =  $('#modal #tel') .val();
            var txtAddr =  $('#modal #addr').val();   

            var a = [];
            var pages=5;
            var pageBtn=1;
            var startRecord = (pageBtn-1) * pages;
            var endRecord   = startRecord + pages;
            var txt = '';

            var confirmResult = confirm('정말로 수정하시겠습니까?');

                if(confirmResult===false){
                    return false;
                }
                else{

                    $.ajax({
                        url:'dot_updateForm.php',
                        type:'POST',
                        data:{
                            idx     : currentIdx,
                            name    : txtName,  
                            tel     : txtTel,
                            addr    : txtAddr
                        },
                        success:function(data){
                            //응답메시지 Response
                            
        
                            $(data).find('li').each(function(index,obj){
                                a[index] = [];
                                a[index][0] = $(obj).find('span').eq(0).text();
                                a[index][1] = $(obj).find('span').eq(1).text();
                                a[index][2] = $(obj).find('span').eq(2).text();
                                a[index][3] = $(obj).find('span').eq(3).text();
                                a[index][4] = $(obj).find('span').eq(4).text();
                            });
                            
                            a.reverse();

                            function bindingFn(){
                                startRecord = (pageBtn-1) * pages;
                                endRecord   = startRecord + pages;
                                if( endRecord > a.length ){
                                    endRecord = a.length;
                                }
                                txt +='<table>';
                                for(i=startRecord; i<endRecord; i++){
                                    txt +='<tr>';
                                        txt += '<td><input type="checkbox" name="chknum" class="chknum" value=' + a[i][0] + '></td>';
                                        txt += '<td>' + a[i][1] + '</td>';
                                        txt += '<td>' + a[i][2] + '</td>';
                                        txt += '<td>' + a[i][3] + '</td>';
                                        txt += '<td>' + a[i][4] + '</td>';
                                    txt +='</tr>';
                                }
                                txt +='</table>';


                                $('.output').html(txt); //전송정보 확인            
                                txt='';
                                $('#modal').hide();
                            }
                            bindingFn();

                            for(i=0; i<a.length/pages; i++){
                                txt +=  '<a href="javascript:" class="pageBtn">' + (i+1) + '</a>';
                            }
                            $('.pageNum').html(txt);
                            txt='';


                            $('.pageBtn').on({
                                click:  function(){
                                    pageBtn = Number($(this).text());
                                    bindingFn();
                                }
                            });

                    },
                        error:function(){
                            alert('AJAX Error!!!');
                        }
                    });
                }    
        }
    });


    //수정완료버튼 클릭 이벤트 
    $('.updateCancelBtn').on({
        click:  function(event){
            event.preventDefault();  
            $('#modal').hide();          
        }
    });


})(jQuery);
//ajaxUpdatePHP.js