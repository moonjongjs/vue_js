<?php

    //닷홈 서버에 데이터 테이블 만들어서(sql) 올리기	
/* 

    $servername = 'localhost';
    $username	= 'root';
    $password	= 'autoset';
    $dbname		= 'ec';
  
 */

    $servername = 'localhost';
    $username	= 'moonjong2';
    $password	= 'anstjswhd0105';
    $dbname		= 'moonjong2'; 

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    mysqli_set_charset($conn, 'utf8');
        
    if( !$conn ){
        die('데이베이스 서버 Localhost에 접속 실패');
    }
    else{
        // echo '데이베이스 서버 Localhost에 접속 성공';
    }
	

?>
    <!-- header.php -->