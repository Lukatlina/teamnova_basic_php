<?php

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // AJAX 요청이 POST 방식으로 전송된 경우

    $email = $_POST['email'];
    $password = $_POST['password'];
    $autologin = $_POST['autologin'];

    if ($autologin == true) {
      $result = userLoginCheck($email, $password);
      if ($result=="1") {
        $token = uniqid();
        
        $serverName = "192.168.56.102";
        $userName = "lunamoon";
        $server_pw = "digda1210";
        
        $conn = mysqli_connect( $serverName , $userName , $server_pw , "weverse" );
        $sql = "UPDATE user SET uniq_id = '$token', update_time = now() WHERE email = '$email';";
        
        // 쿠키 이름, 값, 만료 시간, 적용될 경로(/ : 는 사이트 전체)
        setcookie("UserToken", $token, time() + (86400 * 30), "/");
        $cookie_result = mysqli_query( $conn, $sql );
        echo $cookie_result;
      }else {
        echo $result;
      }
    }elseif($autologin == false) {
      $result = userLoginCheck($email, $password);
      echo $result;
    }
  
    // 응답 데이터 반환
  }

// 로그인할 유저의 데이터를 받아오는 php
// 일치하는 데이터가 있다면 1, 없다면 0이 뜰 것

function userLoginCheck($email, $password){
  $serverName = "192.168.56.102";
  $userName = "lunamoon";
  $server_pw = "digda1210";
  
  $conn = mysqli_connect( $serverName , $userName , $server_pw , "weverse" );

    $sql = "SELECT user_number, password FROM user WHERE email = '$email';";

    $sql_result = mysqli_query( $conn, $sql );
    
    $result = mysqli_fetch_assoc($sql_result);
    $encrypted_password = $result['password'];

    if ( password_verify( $password, $encrypted_password ) ) {
      $_SESSION['email'] = $email;
      $_SESSION['user_number'] = $result['user_number'];
      $_SESSION['loggedin'] = true;
      return "1";
    } else {
      unset($_SESSION['email']);
      unset($_SESSION['user_number']);
      unset($_SESSION['loggedin']);
      return "0";
    }
}
?>
