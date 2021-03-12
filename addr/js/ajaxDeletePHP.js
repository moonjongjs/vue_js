(function($){


    $('.deleteBtn').on({
        click:  function(event){
            event.preventDefault();

            var txtCheck = [];
            var a = [];
            var pages=5;
            var pageBtn=1;
            var startRecord = (pageBtn-1) * pages;
            var endRecord   = startRecord + pages;
            var txt = '';
            var cnt=-1;

            for(i=0; i<$('.chknum').length; i++){
                if(  $('.chknum').eq(i).prop('checked') === true ){
                    cnt++;
                    txtCheck[cnt] = $('.chknum').eq(i).val();
                }                   
            }

            var confirmResult = confirm('정말로 삭제하시겠습니까?');

                if(confirmResult===false){
                    return false;
                }
                else{
                    txt = '';
                    $.ajax({
                        url:'dot_deleteForm.php',
                        type:'POST',
                        data:{
                                //PHP로 배열보내기 
                                //반드시 'chk[]' 인용부호 작은 따옴표로 감싸준다.
                                'chk[]' : txtCheck 
                        },
                        success:function(data){
            
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
                    }); //ajax
                }
        }
    });

})(jQuery);
//ajaxDeletePHP.js
// localhost/addr/