<?php 

    include_once('header.php');

    //배열 가져오기
    $chkARR =  $_REQUEST['chk'];


    //성공 배열 전체 가져오기
    //다중 삭제
    //배열전체 카운트함수 count(배열)
    for($i=0; $i<count($chkARR); $i++){
        $sqldel = "delete from address where idx = '$chkARR[$i]'" ;
        mysqli_query($conn, $sqldel); //쿼리실행    
    }
  
/* 
    //성공
    for($i=0; $i<count($chkARR); $i++){
        $sqldel = "delete from address where idx in ( '$chkARR[$i]' )" ;
        mysqli_query($conn, $sqldel); //쿼리실행    
    }

 */

    $sql = "select * from  address";
    $result = mysqli_query($conn, $sql); //쿼리실행
   
    $txt='';
    $cnt=0;
    $txt .= "<ul>";
    if( mysqli_num_rows($result) > 0 ){
                // $row = mysqli_fetch_array($result) 
            while( $row = mysqli_fetch_assoc($result)){
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
<!-- dot_updateForm.php -->

