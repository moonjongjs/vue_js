<?php 
    include_once('header.php');


    $name    = $_POST['name'];
    $tel     = $_POST['tel'];
    $addr    = $_POST['addr'];

    //테이블에 데이터 입력
    //외부데이터는 반드시 변수 양쪽에 작은 ''따옴표 표기
    $sql = "insert into address (name, tel, addr) values ('$name', '$tel', '$addr' )";
    mysqli_multi_query($conn, $sql); //쿼리실행

    echo '축하합니다. 회원 가입이 완료 되었습다.' . $name . ', ' .  $tel . ', ' . $addr; 
    

    include_once('footer.php');
?>
<!-- inputForm.php -->

