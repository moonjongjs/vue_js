<?php 

    include_once('header.php');


    //입력전 데이터베이스 인증 
    //ajax 로 전송된 데이터
    //변수에 저장
    $name    = $_POST['name'];
    $tel     = $_POST['tel'];
    $addr    = $_POST['addr'];

    //테이블에 데이터 입력
    //외부데이터는 반드시 변수 양쪽에 작은 ''따옴표 표기
    $sql = "insert into address (name, tel, addr) values ('$name', '$tel', '$addr')";
    mysqli_multi_query($conn, $sql); //쿼리실행

    
    include_once('footer.php');

?>
<!-- dot_createTable.php -->

