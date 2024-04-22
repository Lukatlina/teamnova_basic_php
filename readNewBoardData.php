<?php
/*
    1. 전체 데이터 수 집계
    2. 전체 데이터 수 / 보여줄 데이터 수 = 올림(결과) -> 올림한 결과값 만큼 스크롤 했을 때 보여야 한다.
    3. 먼저 for 문으로 반복해서 보여줄 수 있는지 확인할 것
    4. for문으로 보여줄 수 있다면 스크롤 예제를 찾은 후 예제를 맞게 고친다.
    */

    if (!session_id()) {
        session_start();
    }
    include 'server_connect.php';

$user_number = $_SESSION['user_number'];
$lastItemNumber = $_POST['lastItemNumber'];
$scrollCount = $_POST['scrollCount'];

$one_page_rows = 20;

if ($scrollCount !== '') {

    $board_join_sql = "SELECT board_number, board.user_number, contents, contents_save_time, cheering, nickname
                       FROM board LEFT JOIN user ON board.user_number=user.user_number
                       WHERE board.board_number < $lastItemNumber
                       ORDER BY board.board_number DESC LIMIT $one_page_rows;";
    $join_result = mysqli_query( $conn, $board_join_sql );

    $posts = array();

    for ($i = 0; $i < mysqli_num_rows($join_result); $i++) {
        $board_row = mysqli_fetch_array($join_result);
        $board_number = $board_row['board_number'];
        $board_user_number = $board_row['user_number'];
        $contents = $board_row['contents'];
        $contents_save_time = $board_row['contents_save_time'];
        $cheering = $board_row['cheering'];
        $write_user_nickname = $board_row['nickname'];
        


    // $contents와 $board_number를 선언해야 find_image.php 파일 안에서 sql 조회가 가능하다.
    // 이미지를 텍스트와 합친 후에 결과값을 json에 추가한다.

    include 'find_image.php';

    // 날짜 포맷 변경을 위한 DateTime 함수 선언. 
    $dateTime = new DateTime($contents_save_time);
    // 현재 시간과 년도가 같다면 년도 생략, 다르다면 작성된 년도 출력
    if ($dateTime->format('Y')===date('Y')) {
        $formattedDateTime = $dateTime->format('m. d. H:i');
    }else{
        $formattedDateTime  = $dateTime->format('Y. m. d. H:i');
    }

    // 좋아요 값이 있는지 확인
    include 'count_likes.php';

    $posts[] = array(
        'user_number' => $user_number,
        'id' => $board_number,
        'write_user_number' => $board_user_number,
        'write_user_nickname' =>  $write_user_nickname,
        'date_time' => $formattedDateTime,
        'contents' => $contents,
        'cheering' => $cheering,
        'likes_row_count' => $likes_row_count);
    }

    echo json_encode($posts);

} else {
    echo 0;
}


?>