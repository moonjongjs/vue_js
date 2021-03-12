(function($){
    var txtName = '';
    var txtTel  = '';
    var txtaddr = '';

    //전송버튼 클릭 이벤트 
    $('.submitBtn').on({
        click:  function(event){
            event.preventDefault();


            txtName = $('#name').val();
            txtTel  = $('#tel').val();
            txtaddr = $('#addr').val();
            
            //정규표현식
            //입력정보 유효성검사
            //이상정보 없을 때 
            //전송

            if( txtName == '' || txtTel == '' || txtaddr == ''  ){
                return false;
            }
            
            $.ajax({
                url:'dot_inputForm.php',
                type:'POST',
                data:{
                    name:    txtName,
                    tel:     txtTel,
                    addr:    txtaddr
                },
                success:function(data){
                    $('#name').val('');
                    $('#tel').val('');
                    $('#addr').val('');
                    $('.output').html(data);
                    $('#name').focus();
                },
                error:function(){
                    alert('AJAX Error!!!');
                }
            });
        }
    });


})(jQuery);
//ajaxDeletePHP.js
// localhost/addr/