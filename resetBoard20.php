<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // AJAX 요청이 POST 방식으로 전송된 경우

    $serverName = "192.168.56.102";
    $userName = "lunamoon";
    $server_pw = "digda1210";

    
    $conn = mysqli_connect( $serverName , $userName , $server_pw , "weverse" );

  //   if (!$conn) {
  //     die("Database connection failed: " . mysqli_connect_에러());
  // }

  $sql = "SELECT board_number, board.user_number, contents, contents_save_time, cheering, nickname FROM board LEFT JOIN user ON board.user_number=user.user_number ORDER BY board.board_number DESC LIMIT 20;";
  $join_result = mysqli_query( $conn, $sql );

  $posts = array();

  for ($i = 0; $i < mysqli_num_rows($join_result); $i++) {
      $board_row = mysqli_fetch_array($join_result);
      $board_number = $board_row['board_number'];
      $board_user_number = $board_row['user_number'];
      $contents = $board_row['contents'];
      $contents_save_time = $board_row['contents_save_time'];
      $cheering = $board_row['cheering'];
      $write_user_nickname = $board_row['nickname'];
      
      // 날짜 포맷 변경을 위한 DateTime 함수 선언. 
      $dateTime = new DateTime($contents_save_time);

      $posts[] = array(
          'id' => $board_number,
          'write_user_number' => $board_user_number,
          'write_user_nickname' =>  $write_user_nickname,
          'date_time' => $dateTime,
          'contents' => $contents,
          'cheering' => $cheering);
      }

      $jsonData = json_encode($posts);
    //   header('Content-Type: application/json');
      echo $jsonData;

    }
                                            
    

  //   if (!$jb_result) {
  //     die("Query execution failed: " . mysqli_에러($conn));
  // }

  // $array = array();
  // $array["user_number"]= $user_number;
  // //배열안에 배열선언
  // $array["contents"]= $divContent;
  
  // //배열을 json으로 변환
  // $rst = json_encode($array, JSON_UNESCAPED_UNICODE);

  // return $rst;
  
?>