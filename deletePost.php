<?php
    session_start();


    $board_number = $_POST['board_number'];
    $comment_number = $_POST['comment_number'];
    $user_number = $_SESSION['user_number'];
    
    include 'server_connect.php';

    if (!empty($board_number)) {
        $sql = "DELETE FROM board WHERE board_number='$board_number';";
        $result = mysqli_query( $conn, $sql );

        $comment_sql = "DELETE FROM comments WHERE board_number='$board_number';";
        $result_comment = mysqli_query( $conn, $comment_sql );

        $likes_sql = "DELETE FROM likes WHERE board_number='$board_number';";
        $result_likes = mysqli_query( $conn, $likes_sql );

        $folderPath = "upload_images/{$board_number}";

        // 만약 게시판 번호와 같은 이미지 폴더가 있다면
        if (is_dir($folderPath)) {
            // image 테이블에서 board_number로 조회해서 삭제한다.
            $image_sql = "DELETE FROM image WHERE board_number='$board_number';";
            $result_image = mysqli_query( $conn, $image_sql );

            $video_sql = "DELETE FROM video WHERE board_number='$board_number';";
            $result_video = mysqli_query( $conn, $video_sql );

            // 폴더 안에 파일이 있으면 지울 수 없기 때문에 먼저 파일을 지워서 빈 폴더로 만들어준다.
            // 폴더 안의 모든 파일을 가져온다.
            $files = glob($folderPath . "/*");
            
            // 폴더 안의 파일들을 for문을 이용해서 하나씩 삭제한다
            foreach ($files as $file) {
                // 주어진 경로가 파일인지 혹은 존재하는지 여부를 확인하고 true와 false 여부를 반환한다.
                if (is_file($file)) {
                    // 파일을 삭제하는 함수
                    unlink($file);
                }
            }

            // 같은 게시판 번호를 가진 이미지 폴더를 삭제한다
            rmdir($folderPath);

        }

        echo 1;


    }elseif (!empty($comment_number)) {
        $sql = "DELETE FROM comments WHERE comments_number='$comment_number';";
        $result = mysqli_query( $conn, $sql );
        $likes_sql = "DELETE FROM likes WHERE comments_number='$comment_number';";
        $result_likes = mysqli_query( $conn, $likes_sql );
        echo 1;
    }else{
        echo 0;
    }
    
    // DELETE문은 true나 false를 반환한다
    ?>