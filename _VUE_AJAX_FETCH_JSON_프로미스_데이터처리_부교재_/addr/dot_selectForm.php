<?php 

include_once('header.php');

    //테이블에 데이터 입력
    //외부데이터는 반드시 변수 양쪽에 작은 ''따옴표 표기
    $sql = "select * from  address";
    $result = mysqli_query($conn, $sql); //쿼리실행

    $txt='';
    $cnt=0;
    if( mysqli_num_rows($result) > 0 ){
        $txt.='<table>';
            $txt .= '<tr>';
            $txt .= '<td>No.</td>';
            $txt .= '<td>Name</td>';
            $txt .= '<td>Telephone</td>';
            $txt .= '<td>Address</td>';
            $txt .= '<td>Update</td>';
            $txt .= '<td>Delete</td>';
            $txt .= '</tr>';

                // $row = mysqli_fetch_assoc($result)
            while( $row = mysqli_fetch_array($result) ){
                $cnt++;
                $txt .= '<tr>';
                $txt .= '<td>'. $cnt .'</td>';
                $txt .= '<td>'. $row['name'] .'</td>';
                $txt .= '<td>'. $row['tel']  .'</td>';
                $txt .= '<td>'. $row['addr'] .'</td>';
                $txt .= "<td><input type='checkbox' name='update' id='update' value='".$row['idx']."'></td>";
                $txt .= "<td><input type='checkbox' name='delete' id='delete' value='".$row['idx']."'></td>";
                $txt .= '</tr>';
            }
        $txt.='</table>';
    }




    echo $txt;
    

    include_once('footer.php');

?>
<!-- dot_selectForm.php -->
<!-- dot_selectFormXML.php -->

