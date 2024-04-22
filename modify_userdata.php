<?php

    session_start();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // AJAX 요청이 POST 방식으로 전송된 경우
        
        include 'server_connect.php';

        $email = $_SESSION['email'];

        if (!empty($_POST[ 'modifyNickname' ])) {
            $nickname = $_POST[ 'modifyNickname' ];
            $jb_sql = "UPDATE user SET nickname = '$nickname', update_time = now() WHERE email = '$email';";
            $result = mysqli_query( $conn, $jb_sql );
            
        
        }elseif (!empty($_POST[ 'lastname' ]) && !empty($_POST[ 'firstname' ])) {
            $last_name = $_POST[ 'lastname' ];
            $first_name = $_POST[ 'firstname' ];
            $jb_sql = "UPDATE user SET first_name = '$first_name', last_name = '$last_name', update_time = now() WHERE email = '$email';";
            $result = mysqli_query( $conn, $jb_sql );
        
        }elseif (!empty($_POST[ 'modify_password' ])) {
            $modify_password = $_POST[ 'modify_password' ];
            $encrypted_modify_password = password_hash( $modify_password, PASSWORD_DEFAULT );
            $jb_sql = "UPDATE user SET password = '$encrypted_modify_password', update_time = now() WHERE email = '$email';";
            $result = mysqli_query( $conn, $jb_sql );
        }else{
            
        }
        
        // 응답 데이터 반환
        echo $result;
    }
    ?>