<?php
    session_start();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // AJAX 요청이 POST 방식으로 전송된 경우
        $email = $_SESSION['email'];
        $password = $_POST[ 'current_password' ];

        $result = password_compare_func($email, $password);

        echo $result;
    }

    function password_compare_func($email, $password){
        $servername = "192.168.56.102";
        $username = "lunamoon";
        $server_pw = "digda1210";

        $jb_conn = mysqli_connect( $servername , $username , $server_pw , "weverse" );
        
        $jb_sql = "SELECT password FROM user WHERE email = '$email';";
        $jb_result = mysqli_query( $jb_conn, $jb_sql );

        $result_password = mysqli_fetch_assoc($jb_result);

        $encrypted_password = $result_password['password'];

        // 응답 데이터 반환 True면 1, False면 0
        if ( password_verify( $password, $encrypted_password ) ) {
            return "1";
        } else {
            return "0";
        }
    }
?>