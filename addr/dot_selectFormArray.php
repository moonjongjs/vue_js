<?php 

include_once('header.php');

    //테이블에 데이터 입력
    //외부데이터는 반드시 변수 양쪽에 작은 ''따옴표 표기
    $sql = "select * from  address";
    $result = mysqli_query($conn, $sql); //쿼리실행

    $txt='';
    $cnt=0;
    if( mysqli_num_rows($result) > 0 ){
                // $row = mysqli_fetch_assoc($result)
            while( $row = mysqli_fetch_array($result) ){
                $cnt++;
                $txt .= $row['idx'];
                $txt .= $cnt;
                $txt .= $row['name'];
                $txt .= $row['tel'];
                $txt .= $row['addr'];
            }
    }

    echo $txt;
    

    include_once('footer.php');

?>
<!-- dot_selectFormArray.php -->

