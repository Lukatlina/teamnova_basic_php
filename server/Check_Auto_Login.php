<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
    
    include 'server_connect.php';

    if (!session_id()) {
        session_start();
      }

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
        $_SESSION['loggedin'] = false;
    }

    $user = array(
        'user_number' => $_SESSION['user_number'],
        'email' => $_SESSION['email'],
        'loggedin' => $_SESSION['loggedin']
      );

      echo json_encode($user);

?>