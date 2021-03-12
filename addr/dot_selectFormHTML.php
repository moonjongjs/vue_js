<?php 

    include_once('header.php');

    //테이블에 데이터 입력
    //외부데이터는 반드시 변수 양쪽에 작은 ''따옴표 표기
    $sql = "select * from  address";
    $result = mysqli_query($conn, $sql); //쿼리실행

    

    $txt='';
    $cnt=0;
    $txt .= "<ul>";
    if( mysqli_num_rows($result) > 0 ){
                // $row = mysqli_fetch_assoc($result)
            while( $row = mysqli_fetch_array($result) ){
                $cnt++;
                $txt .= "<li>";
                $txt .= "<span>".$row['idx']."</span>";
                $txt .= "<span>".$cnt."</span>";
                $txt .= "<span>".$row['name']."</span>";
                $txt .= "<span>".$row['tel']."</span>";
                $txt .= "<span>".$row['addr']."</span>";
                $txt .= "</li>";                
            }
    }
    $txt .= "</ul>";

    echo $txt;


    include_once('footer.php');

?>
<!-- dot_selectFormHTML.php -->

