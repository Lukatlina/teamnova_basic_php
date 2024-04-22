<?php
/*
    1. board_number가 같으면서 부모댓글이 0인 댓글들을 comment_number의 역순으로 보여준다.
    */

    if (!session_id()) {
        session_start();
    }
    include 'server_connect.php';

$user_number = $_SESSION['user_number'];
$lastItemNumber = $_POST['lastItemNumber'];
$scrollCount = $_POST['scrollCount'];
$board_number = $_POST['board_number'];

$one_page_rows = 20;

if ($scrollCount !== '') {
    $comment_join_sql = "SELECT comments_number, comments.user_number, comments_text, comments_save_time, comments_cheering, nickname
                         FROM comments LEFT JOIN user ON comments.user_number=user.user_number
                         WHERE comments.comments_number > $lastItemNumber AND comments.board_number = $board_number AND comments.parent_number = 0
                         ORDER BY comments.comments_number LIMIT $one_page_rows;";
    $comment_sql_result = mysqli_query( $conn, $comment_join_sql );

    $comments = array();

    for ($i = 0; $i < mysqli_num_rows($comment_sql_result); $i++) {
        $comment_row = mysqli_fetch_array($comment_sql_result);
        $comments_number = $comment_row['comments_number'];
        $board_user_number = $comment_row['user_number'];
        $comments_text = $comment_row['comments_text'];
        $comments_save_time = $comment_row['comments_save_time'];
        $comments_cheering = $comment_row['comments_cheering'];
        $write_user_nickname = $comment_row['nickname'];

        

    // 날짜 포맷 변경을 위한 DateTime 함수 선언. 
    $dateTime = new DateTime($comments_save_time);
    // 현재 시간과 년도가 같다면 년도 생략, 다르다면 작성된 년도 출력
    if ($dateTime->format('Y')===date('Y')) {
        $formattedDateTime = $dateTime->format('m. d. H:i');
    }else{
        $formattedDateTime  = $dateTime->format('Y. m. d. H:i');
    }

    $reply_sql = "SELECT *
                  FROM comments
                  WHERE board_number='$board_number' AND parent_number='$comments_number';";

                  $reply_result = mysqli_query( $conn, $reply_sql );
                  $number_of_reply = mysqli_num_rows($reply_result);

    $comment_number = $comments_number;

    // 좋아요 값이 있는지 확인
    include 'count_likes.php';

    $comments[] = array(
        'user_number' => $user_number,
        'id' => $comments_number,
        'board_number' => $board_number,
        'write_user_number' => $board_user_number,
        'write_user_nickname' =>  $write_user_nickname,
        'date_time' => $formattedDateTime,
        'contents' => $comments_text,
        'cheering' => $comments_cheering,
        'likes_row_count' => $likes_row_count,
        'number_of_reply' => $number_of_reply);
    }

    echo json_encode($comments);

} else {
    echo 0;
}

?>