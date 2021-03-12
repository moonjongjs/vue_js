<?php

    include_once('header.php');


    //테이블 만들기 회원테이블 - member
/*
    $sql = 'create table address (
                idx int(11) not null auto_increment,
                name varchar(50) not null,
                tel varchar(13) not null,
                addr varchar(250) not null,
                primary key(idx)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8';

*/

            
    $sql = 'create table member	(
                idx int(11) not null auto_increment,
                id varchar(10) not null,
                pass varchar(12) not null,
                name varchar(50) not null,
                mail varchar(250) not null,
                primary key(idx, id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8';
    

    mysqli_query($conn, $sql);


    include_once('footer.php');


?>

<!-- // dot_createTable.php -->

<!-- localhost/addr/dot_createTable.php -->