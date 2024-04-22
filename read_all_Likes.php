<?php
if (!session_id()) {
    session_start();
    }

include 'server_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // POST로 받은 formdata 변수에 저장
    $user_number = $_SESSION['user_number'];
    $board_number = $_POST['board_number'];

    $read_likes_sql = "SELECT count(likes_number) AS likes_count FROM likes WHERE board_number='$board_number';";

    $likes_result = mysqli_query( $conn, $read_likes_sql );

    $row = mysqli_fetch_assoc($likes_result);

    $cheeringCount = $row['likes_count'];


    // update된 좋아요 수를 확인하고 저장한다.
    $sql = "UPDATE board
    SET cheering = '$cheeringCount'
    WHERE board_number = '$board_number';";

    $result = mysqli_query( $conn, $sql );

    echo $cheeringCount;
}
?>