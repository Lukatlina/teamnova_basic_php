<?php
    
    if (!empty($comment_number)) {
        $sql = "SELECT likes_number FROM likes WHERE user_number='$user_number' AND comments_number='$comment_number';";
        $result = mysqli_query( $conn, $sql );
        $likes_row_count = mysqli_num_rows($result);

    }else{
        $sql = "SELECT likes_number FROM likes WHERE board_number='$board_number' AND user_number='$user_number' AND comments_number IS NULL;";
        $result = mysqli_query( $conn, $sql );
        $likes_row_count = mysqli_num_rows($result);
    }
    
?>