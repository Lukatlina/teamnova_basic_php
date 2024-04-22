<?php

session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // AJAX 요청이 POST 방식으로 전송된 경우

    $user_number = $_SESSION['user_number'];
    $board_number = $_POST['board_number'];
    $comments_text = $_POST['textarea'];
    

    $serverName = "192.168.56.102";
    $userName = "lunamoon";
    $server_pw = "digda1210";

    
    $conn = mysqli_connect( $serverName , $userName , $server_pw , "weverse" );

    if (!$conn) {
      $error = "" .mysqli_connect_error();
      die("Database connection failed: " . mysqli_connect_error());
  }

  // 댓글이라면 parent_number를 따로 지정하지 않는다.
  // 대댓글이라면 parent_number를 꼭 넣어줘야 한다.
  if (empty($_POST['reply_number'])) {
    $sql = "INSERT INTO comments (
      board_number,
      user_number,
      comments_text,
      comments_save_time)
  
       VALUES (
          '$board_number',
          '$user_number',
          '$comments_text',
          NOW() );";

    $save_comments_result = mysqli_query( $conn, $sql );
    

  }elseif (!empty($_POST['reply_number'])) {
    
    $reply_number = $_POST['reply_number'];

    $sql = "INSERT INTO comments (
      board_number,
      user_number,
      parent_number,
      comments_text,
      comments_save_time)
  
       VALUES (
          '$board_number',
          '$user_number',
          '$reply_number',
          '$comments_text',
          NOW() );";

    $save_comments_result = mysqli_query( $conn, $sql );
  }else{
      
  }

    if (!$save_comments_result) {
      die("Query execution failed: " . mysqli_error($conn));
  }

  echo $save_comments_result;

  mysqli_close($conn);

}


?>