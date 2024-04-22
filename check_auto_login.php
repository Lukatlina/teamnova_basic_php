<?php
    if (!session_id()) {
        session_start();
      }
    
    include 'server_connect.php';

    if ($_COOKIE["UserToken"]) {
        $uniq_id = $_COOKIE["UserToken"];
        $sql = "SELECT user_number, email FROM user WHERE uniq_id='$uniq_id';";
        $result = mysqli_query( $conn, $sql );

        // 유저 고유번호와 닉네임을 함께 조회해서 가져온다.
        $row = mysqli_fetch_assoc($result);
        $_SESSION['user_number'] = $row['user_number'];
        $_SESSION['email'] = $row['email'];
        $_SESSION['loggedin'] = true;
        }else {
          // 로그인 여부 확인
          // // loggedin이 비어있거나 false이면 weverse_login.php로 이동하게 된다.
          // if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
          //   header("Location: login_notice_popup.php"); // 로그인되지 않은 경우 로그인 페이지로 이동하게 된다
          //   exit();
          // }
        }

        ?>

