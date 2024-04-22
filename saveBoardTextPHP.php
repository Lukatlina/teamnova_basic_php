<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // AJAX 요청이 POST 방식으로 전송된 경우
    $user_number = $_SESSION['user_number'];
    $divContent = $_POST['divContent'];

    function saveDivContent($user_number, $divContent)
    {
        include 'server_connect.php';

        if ($_POST['confirmText'] < 10000) {
            $text_sql = "INSERT INTO board (
                    user_number,
                    contents,
                    contents_save_time)
    
                    VALUES (
                        '$user_number',
                        '$divContent',
                        NOW() );";

            $jb_result = mysqli_query($conn, $text_sql);
            
            return $jb_result;

        } else {
            return 0;
        }
    }


    // 1. 이미지가 있는지 먼저 확인한다. 이미지가 없다면 원래 코드대로 저장한다.
    if (!empty($_POST['images'])) {
        // 2. 이미지가 있다면 텍스트를 먼저 저장한 후 생성된 board_number를 조회해온다.
        $TextResult = saveDivContent($user_number, $divContent);

        // 텍스트 저장이 성공하면 가장 최신 board_number 조회하기
        if ($TextResult == 1) {

            include 'server_connect.php';

            $find_boardnumber_sql = "SELECT board_number FROM board ORDER BY board_number DESC limit 1;";
            $board_number_result = mysqli_query($conn, $find_boardnumber_sql);

            $row = mysqli_fetch_assoc($board_number_result);

            $new_board_number = $row['board_number'];

            // 3. 가져온 board_number로 폴더를 만든 후에 안에 이미지 파일을 저장한다.
            $images = $_POST['images'];
            $idArray = $_POST['id'];
            $types = $_POST['widget-type'];

            // uploads_images/board_number 폴더가 없다면 새로 생성
            if (!is_dir("upload_images")) {
                mkdir("upload_images");
            }
        
            if (!is_dir("upload_images/{$new_board_number}")) {
                mkdir("upload_images/{$new_board_number}");
            }

            for ($i = 0; $i < count($images); $i++) {
                $image_path = json_decode($images[$i], true);

                $tempFilePath = $image_path['destinationPath'];
                $fileName = $image_path['fileName']; // 파일 이름
                
                // 동영상 or 이미지 여부 확인
                $type =  $types[$i];
                $numericId = preg_replace("/[^0-9]/", "", $idArray[$i]);
                
                // 저장할 파일 경로
                $destinationPath = "upload_images/{$new_board_number}/" . $fileName;

                // move_uploaded_file()은 클라이언트로부터 직접 업로드된 것만 옮길 수 있기 때문에 copy를 사용해 복사 후 원본 삭제
                // 4. 이미지 테이블에 board_number, image_id값, 이미지 주소를 저장한다.
                if (copy($tempFilePath, $destinationPath)) {
                    if ($type === 'video') {
                        // 영상 타입일 때 영상 주소와 영상 파일을 먼저 변수에 선언한다.
                        $videodestinationPath = $image_path['videodestinationPath'];
                        $videofileName = $image_path['videofileName'];
                        $encodedDestinationPath = "upload_images/{$new_board_number}/" . $videofileName;

                        // // 영상을 영상 위치를 옮긴 후 인코딩한다.
                        // // 동영상 인코딩. 같은 주소로 옮긴다.
                        
                        if (copy($videodestinationPath, $encodedDestinationPath)) {
                            // 영상의 위치를 DB에 저장한다.
                            $video_sql = "INSERT INTO video (
                                board_number,
                                video_path,
                                video_id)
                    
                                    VALUES (
                                        '$new_board_number',
                                        '$encodedDestinationPath',
                                        '$numericId');";
        
                            $save_video_result = mysqli_query($conn, $video_sql);

                            $search_video_sql = "SELECT video_number FROM video WHERE board_number = '$new_board_number' ORDER BY video_number DESC limit 1;";
                            $video_number_result = mysqli_query($conn, $search_video_sql);
                            $row = mysqli_fetch_assoc($video_number_result);
                            $new_video_number = $row['video_number'];

                            $image_sql = "INSERT INTO image (
                                board_number,
                                image_path,
                                image_id,
                                video_number,
                                is_thumbnail)
                    
                                    VALUES (
                                        '$new_board_number',
                                        '$destinationPath',
                                        '$numericId',
                                        '$new_video_number',
                                        1);";
        
                            $save_image_result = mysqli_query($conn, $image_sql);

                        }else {
                            echo '인코딩 동영상 이동 오류';
                        }
                    
                    }else if ($type === 'photo') {
                        // 타입이 이미지일 때
                        $image_sql = "INSERT INTO image (
                            board_number,
                            image_path,
                            image_id,
                            is_thumbnail)
                
                                VALUES (
                                    '$new_board_number',
                                    '$destinationPath',
                                    '$numericId',
                                    0);";
    
                        $save_image_result = mysqli_query($conn, $image_sql);
                    }else {
                        
                    }
                   
    
                } else {
                    echo 'Failed to move the uploaded file ' . $fileName . '.';
                }
            }

            mysqli_close($conn);

            // 임시 폴더 안의 모든 파일 삭제
            $directory = 'uploads/';

            // 디렉토리 안의 파일을 가져오기
            $files = glob($directory . '*');

            // for문으로 이용해서 삭제
            foreach ($files as $file) {
                if (is_file($file)) {
                    unlink($file);
                }
            }

            echo 1;

        } else {
            echo '텍스트 파일 업로드 실패';
        }

    } elseif (empty($_POST['images'])) {
        // 이미지가 없을 경우 기존과 똑같이 저장
        $result = saveDivContent($user_number, $divContent);
        echo $result;

    } else {
        echo 'No files were uploaded.';
    }

}

    
?>