<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();


// AJAX 요청이 POST 방식으로 전송된 경우
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // 보낸 변수 모두 저장 : id, images, board_number, divContent, confirmText
    $user_number = $_SESSION['user_number'];
    $board_number = $_POST['board_number'];
    $divContent = $_POST['divContent'];
    $idArray = $_POST['id'];
    $images = $_POST['images'];
    $types = $_POST['widget-type'];

    include 'server_connect.php';

    // 1. 이미지 유무를 먼저 확인한다. 이미지가 없다면 텍스트만 업데이트 한 후 끝, 있다면 텍스트를 업데이트 한 후 이미지 저장.
    if (!empty($_POST['images'])) {
      // 텍스트 먼저 업데이트 하기
      updateDivContent($board_number, $user_number, $divContent);

      // 2. 이미지 파일 유무를 체크한 후 폴더가 없다면 폴더를 생성한다.
      if (!is_dir("upload_images/{$board_number}")) {
        mkdir("upload_images/{$board_number}");
      }

      // 3. 이미지 파일명과 같은 이름이 파일이 있는지 유무를 먼저 확인 후 없다면 이동한다.
      for ($i = 0; $i < count($images); $i++) {
        // JSON 디코딩
        $image_path = json_decode($images[$i], true);

        $tempFilePath = $image_path['destinationPath'];
        $fileName = $image_path['fileName']; // 파일 이름

        // 동영상 or 이미지 여부 확인
        $type =  $types[$i];
        $id = preg_replace("/[^0-9]/", "", $idArray[$i]);


        
        // 4. 이미지 DB에 같은 id를 가진 데이터가 있는지 확인한다. 있다면 update, 없다면 insert를 해야한다.

        // 저장할 파일 경로
        $destinationPath = "upload_images/{$board_number}/" . $fileName;
       

        // 이름이 같은 파일이 존재할 수 있기 때문에 한번 확인해준다.
        // 이미지 파일이 존재하지 않는 경우의 처리
        if (!file_exists($destinationPath)) {
          // 4. 이미지 테이블에 board_number, image_id값, 이미지 주소를 저장한다.
          if (copy($tempFilePath, $destinationPath)) {
            
            if ($type === 'video') {
              // 영상 타입일 때 영상 주소와 영상 파일을 먼저 변수에 선언한다.
              $videodestinationPath = $image_path['videodestinationPath'];
              $videofileName = $image_path['videofileName'];
              // 영상을 영상 위치를 옮긴다.
              $encodedDestinationPath = "upload_images/{$board_number}/" . $videofileName;

              // // 영상을 영상 위치를 옮긴 후 인코딩한다.
              // // 동영상 인코딩. 같은 주소로 옮긴다.
              // $encodedFileName = pathinfo($videodestinationPath, PATHINFO_FILENAME) . '_encoded.mp4';
              // $encodedFilePath = 'uploads/' . $encodedFileName;
              // $encodedDestinationPath = "upload_images/{$board_number}/" . $encodedFileName;


            
              // 인코딩된 동영상 유무 확인
              if (!file_exists($encodedDestinationPath)) {
                // 없다면 동영상을 인코딩한 후 옮긴다.
                // $command = "ffmpeg -i $videodestinationPath -c:v libx264 -c:a aac $encodedFilePath";
                // exec($command, $output, $status);
            
                  if (copy($videodestinationPath, $encodedDestinationPath)) {
            
                    include 'server_connect.php';
   
                  
                    // 영상의 위치를 DB에 저장한다.
                    $video_sql = "INSERT INTO video (
                        board_number,
                        video_path,
                        video_id)
            
                            VALUES (
                                '$board_number',
                                '$encodedDestinationPath',
                                '$id');";
            
                    $save_video_result = mysqli_query($conn, $video_sql);
            
                    $search_video_sql = "SELECT video_number FROM video WHERE board_number = '$board_number' ORDER BY video_number DESC limit 1;";
                    $video_number_result = mysqli_query($conn, $search_video_sql);
                    $row = mysqli_fetch_assoc($video_number_result);
                    $new_video_number = $row['video_number'];

                    $result = updateImage ($board_number, $id, $destinationPath, $new_video_number);
            
                  } else {
                    echo '인코딩 동영상 이동 오류';
                  }
            
              }else {
                echo '동영상 파일 존재함';
              }
            
            } else if ($type === 'photo') {
              if (findSavedImage ($board_number, $id) === 0) {
                $image_sql = "INSERT INTO image (
                  board_number,
                  image_path,
                  image_id,
                  video_number,
                  is_thumbnail)
            
                      VALUES (
                          '$board_number',
                          '$destinationPath',
                          '$id',
                          NULL,
                          0);";
            
                $result = mysqli_query($conn, $image_sql);
                
                
            
            
              } elseif (findSavedImage ($board_number, $id) === 1) {
                $sql = "UPDATE image SET image_path = '$destinationPath',
                                         image_id = '$id',
                                         video_number = NULL,
                                         is_thumbnail = 0;
                                     WHERE board_number = '$board_number' AND image_id = '$id';";
                $result = mysqli_query( $conn, $sql );
                
              }else{

              }

            } else {
            
            }


          } else {
              echo 'Failed to move the uploaded file ' . $fileName . '.';
          }
        } else {
          // 이미지 파일이 존재하는 경우의 처리
          
          if ($type === 'video') {

            // 영상 타입일 때 영상 주소와 영상 파일을 먼저 변수에 선언한다.
            $videodestinationPath = $image_path['videodestinationPath'];
            $videofileName = $image_path['videofileName'];
            // 영상을 영상 위치를 옮긴 후 인코딩한다.
            // 동영상 인코딩. 같은 주소로 옮긴다.
            // $encodedFileName = pathinfo($videodestinationPath, PATHINFO_FILENAME) . '_encoded.mp4';
            // $encodedFilePath = 'uploads/' . $encodedFileName;
            $encodedDestinationPath = "upload_images/{$board_number}/" . $videofileName;

            include 'server_connect.php';

            // 영상의 위치를 DB에 저장한다.
            $video_sql = "INSERT INTO video (
                board_number,
                video_path,
                video_id)
    
                    VALUES (
                        '$board_number',
                        '$encodedDestinationPath',
                        '$id');";
    
            $save_video_result = mysqli_query($conn, $video_sql);
    
            $search_video_sql = "SELECT video_number FROM video WHERE board_number = '$board_number' ORDER BY video_number DESC limit 1;";
            $video_number_result = mysqli_query($conn, $search_video_sql);
            $row = mysqli_fetch_assoc($video_number_result);
            $new_video_number = $row['video_number'];

            $result = updateImage ($board_number, $id, $destinationPath, $new_video_number);
          
          
            
          
          } else if ($type === 'photo') {
            if (findSavedImage ($board_number, $id) === 0) {
              $image_sql = "INSERT INTO image (
                board_number,
                image_path,
                image_id,
                video_number,
                is_thumbnail)
          
                    VALUES (
                        '$board_number',
                        '$destinationPath',
                        '$id',
                        NULL,
                        0);";
          
              $result = mysqli_query($conn, $image_sql);
          
            } elseif (findSavedImage ($board_number, $id) === 1) {
              $sql = "UPDATE image SET image_path = '$destinationPath',
                                       image_id = '$id',
                                       video_number = NULL,
                                       is_thumbnail = 0;
                                   WHERE board_number = '$board_number' AND image_id = '$id';";
              $result = mysqli_query( $conn, $sql );
              
            }else{

            }
          } else {
          
          }
        }
      }

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

      echo $result;

    } else if (empty($_POST['images'])) {
      // 이미지가 없다면 기존과 똑같이 저장할 것
      $result = updateDivContent($board_number, $user_number, $divContent);
      echo $result;
      mysqli_close($conn);
    } else {
      echo 'No data were uploaded.';
    }
}
    

function updateDivContent ($board_number, $user_number, $divContent) {
  include 'server_connect.php';
  if ($_POST['confirmText'] < 10000) {
    $sql = "UPDATE board
    SET contents = '$divContent',
    contents_update_time = now()
    WHERE board_number = '$board_number' AND user_number = '$user_number';";


    $result = mysqli_query( $conn, $sql );
    return $result;
  }else{
    return 0;
  }
}

function findSavedImage ($board_number, $id) {
  include 'server_connect.php';
  $sql = "SELECT board_number, image_id, video_number, is_thumbnail FROM image WHERE board_number = '$board_number' AND image_id = '$id';";
  $rows = mysqli_query( $conn, $sql );
  $result = $rows->num_rows;
  return $result;
}

function updateImage ($board_number, $id, $destinationPath, $new_video_number) {
  include 'server_connect.php';
  // 1. 이미지 유무 확인-> 없으면 그대로 저장
  if (findSavedImage ($board_number, $id) === 0) {
    $image_sql = "INSERT INTO image (
      board_number,
      image_path,
      image_id,
      video_number,
      is_thumbnail)

          VALUES (
              '$board_number',
              '$destinationPath',
              '$id',
              '$new_video_number',
              1);";

    $result = mysqli_query($conn, $image_sql);
    return $result;


  } elseif (findSavedImage ($board_number, $id) === 1) {
    $sql = "UPDATE image SET image_path = '$destinationPath',
                             image_id = '$id',
                             video_number = $new_video_number,
                             is_thumbnail = 1;
                         WHERE board_number = '$board_number' AND image_id = '$id';";
    $result = mysqli_query( $conn, $sql );
    return $result;
  }else {
    return 0;
  }
}

?>