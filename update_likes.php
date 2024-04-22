<?php

if (!session_id()) {
    session_start();
  }

include 'server_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // POST로 받은 formdata 변수에 저장
    $user_number = $_SESSION['user_number'];
    $board_number = $_POST['board_number'];
    // formData를 POST로 보낸 값은 string형태로 보내진다.
    $is_button = $_POST['is_button'];

    $comment_number = $_POST['comment_number'];

    // comment일 경우 commenet_number가 필요하기 때문에 comment_number 여부에 따라서 코드를 나눈다.
    if (!empty($comment_number)) {
        // is_button 변수가 true냐 false냐에 따라서 다르게 동작하도록 만든다.
        // $is_button이 true일 경우 실행이 된다.
        if ($is_button === 'true') {
            // true일 경우 유저가 좋아요 버튼을 누른 상태이기 때문에 likes DB에 data를 생성한다.
            $sql = "INSERT INTO likes (
                board_number,
                user_number,
                comments_number)
        
                    VALUES (
                        '$board_number',
                        '$user_number',
                        '$comment_number');";

            $result = mysqli_query($conn, $sql);

        }else{
            // true일 경우 유저가 좋아요 버튼을 누른 상태이기 때문에 likes DB에 data를 삭제한다.
            $sql = "DELETE FROM likes 
                    WHERE board_number='$board_number'
                    AND user_number='$user_number'
                    AND comments_number='$comment_number';";

            $result = mysqli_query( $conn, $sql );
        } 

        $result = readlikes($board_number, $user_number, $comment_number);



        
    }else {
        // is_button 변수가 true냐 false냐에 따라서 다르게 동작하도록 만든다.
        // $is_button이 true일 경우 실행이 된다.
        if ($is_button === 'true') {
            // true일 경우 유저가 좋아요 버튼을 누른 상태이기 때문에 likes DB에 data를 생성한다.
            $sql = "INSERT INTO likes (
                board_number,
                user_number)
        
                    VALUES (
                        '$board_number',
                        '$user_number');";

            $result = mysqli_query($conn, $sql);

        }else{
            // true일 경우 유저가 좋아요 버튼을 누른 상태이기 때문에 likes DB에 data를 삭제한다.
            $sql = "DELETE FROM likes 
                    WHERE board_number='$board_number'
                    AND user_number='$user_number';";

            $result = mysqli_query( $conn, $sql );
        }

        $result = readlikes($board_number, $user_number, NULL);


    }
    echo $result;



    
}

function readlikes($board_number, $user_number, $comment_number){

    include 'server_connect.php';

    if (!empty($comment_number)) {
        $read_likes_sql = "SELECT count(likes_number) AS likes_count FROM likes WHERE comments_number='$comment_number';";

        $likes_result = mysqli_query( $conn, $read_likes_sql );
    
        $row = mysqli_fetch_assoc($likes_result);
    
        $cheeringCount = $row['likes_count'];
    
    
        // update된 좋아요 수를 확인하고 저장한다.
        $sql = "UPDATE comments
        SET comments_cheering = '$cheeringCount'
        WHERE comments_number = '$comment_number';";
    
        $result = mysqli_query( $conn, $sql );
    }else{

        $read_likes_sql = "SELECT count(likes_number) AS likes_count FROM likes WHERE board_number='$board_number';";

        $likes_result = mysqli_query( $conn, $read_likes_sql );
    
        $row = mysqli_fetch_assoc($likes_result);
    
        $cheeringCount = $row['likes_count'];
    
    
        // update된 좋아요 수를 확인하고 저장한다.
        $sql = "UPDATE board
        SET cheering = '$cheeringCount'
        WHERE board_number = '$board_number';";
    
        $result = mysqli_query( $conn, $sql );
    }

    return $cheeringCount;
}

?>