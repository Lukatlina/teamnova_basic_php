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
$board_number = $_POST['board_number'];
$number_of_reply = $POST['number_of_reply'];
$parent_number = $_POST['parent_number'];

// $user_number = 1;
// $lastItemNumber = 0;
// $board_number = 20308;
// $number_of_reply = 1;
// $parent_number = 10104;

$one_page_rows = 20;

if ($lastItemNumber === '') {
    $reply_join_sql = "SELECT comments_number, comments.user_number, comments_text, comments_save_time, comments_cheering, nickname
                         FROM comments LEFT JOIN user ON comments.user_number=user.user_number
                         WHERE comments.board_number = $board_number AND comments.parent_number = $parent_number
                         ORDER BY comments.comments_number LIMIT 10;";
    $reply_sql_result = mysqli_query( $conn, $reply_join_sql );

    
} elseif ($lastItemNumber !== '') {
    $reply_join_sql = "SELECT comments_number, comments.user_number, comments_text, comments_save_time, comments_cheering, nickname
                         FROM comments LEFT JOIN user ON comments.user_number=user.user_number
                         WHERE comments.board_number = $board_number AND comments.parent_number = $parent_number AND comments.comments_number > $lastItemNumber
                         ORDER BY comments.comments_number LIMIT 10;";
    $reply_sql_result = mysqli_query( $conn, $reply_join_sql );

    
} else {
    echo 0;
}

    $replies = array();

    for ($i = 0; $i < mysqli_num_rows($reply_sql_result); $i++) {
        $reply_row = mysqli_fetch_array($reply_sql_result);
        $comments_number = $reply_row['comments_number'];
        $board_user_number = $reply_row['user_number'];
        $comments_text = $reply_row['comments_text'];
        $comments_save_time = $reply_row['comments_save_time'];
        $comments_cheering = $reply_row['comments_cheering'];
        $write_user_nickname = $reply_row['nickname'];

        

    // 날짜 포맷 변경을 위한 DateTime 함수 선언. 
    $dateTime = new DateTime($comments_save_time);
    // 현재 시간과 년도가 같다면 년도 생략, 다르다면 작성된 년도 출력
    if ($dateTime->format('Y')===date('Y')) {
        $formattedDateTime = $dateTime->format('m. d. H:i');
    }else{
        $formattedDateTime  = $dateTime->format('Y. m. d. H:i');
    }

    $comment_number = $comments_number;

    // 좋아요 값이 있는지 확인
    include 'count_likes.php';

    $replies[] = array(
        'user_number' => $user_number,
        'id' => $comments_number,
        'board_number' => $board_number,
        'write_user_number' => $board_user_number,
        'write_user_nickname' =>  $write_user_nickname,
        'date_time' => $formattedDateTime,
        'contents' => $comments_text,
        'cheering' => $comments_cheering,
        'likes_row_count' => $likes_row_count);
    }

echo json_encode($replies);
?>