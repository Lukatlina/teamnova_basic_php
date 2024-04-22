<?php
// TODO:
/*



4. 1초 부분의 이미지를 추출하고 기존과 같이 저장한다.
5. submit을 눌렀을 때 uploads/board_number/로 폴더가 생성되고 모든 관련 파일을 옮긴다.
6. DB에 이미지와 영상이 저장된다.
*/

// 1. 파일을 임시폴더로 일단 옮긴다
if (!empty($_FILES['files']['name'][0])) {
  $files = $_FILES['files'];

  $array = array();

  // for문을 돌려서 file들을 하나씩 옮긴다.
  for ($i = 0; $i < count($files['name']); $i++) {
    $tempFilePath = $files['tmp_name'][$i]; // 임시 파일 경로
    $fileType = $files["type"][$i]; // 파일 타입

    // uploads 파일이 없다면 새로 생성
    if (!is_dir('uploads/')) {
        mkdir('uploads/');
    }
  

    // 2. 파일 타입에 따라서 이미지로 처리할지 여부를 결정한다. strpos(검사할 텍스트, 키워드)로 검사가능. 이미지라면 현재 코드를 그대로 사용한다.
    // strpos()는 주어진 단어를 찾지 못했을 때 false를 반환하기 때문에 false여부를 확인하는 조건문을 넣어주어야 한다.
    if (strpos($fileType, 'video') !== false) {
      // 3. 영상이라면 임시 저장을 한 후에 인코딩 처리를 한다.
      $fileName = $files['name'][$i]; // 파일 이름
      $destinationPath = 'uploads/' . $fileName; // 저장할 파일 경로
  
      if (move_uploaded_file($tempFilePath, $destinationPath)) {

        // 썸네일 추출시 들어갈 동영상
        $thumbnailTime = "00:00:01";
        $thumbnailFile = pathinfo($fileName, PATHINFO_FILENAME) .'_thumbnail.jpg';
        $thumbnailPath = 'uploads/' . $thumbnailFile;

        // 이미지 썸네일 추출
        // ffmpeg : ffmpeg 실행명령어
        // -i : 입력파일 지정 옵션, -ss : 입력 파일에서 지정된 시간 위치로 이동하는 옵션, -vf : 비디오 필터 그래프 지정, -vframes : 썸네일 이미지로 추출할 프레임 수를 지정
        // -vf  \"scale=200:100:force_original_aspect_ratio=increase\"
        $ffmpegCommand = "ffmpeg -i $destinationPath -ss $thumbnailTime  -vframes 1 $thumbnailPath";
        exec($ffmpegCommand);

        // 등록시 로딩되는 시간을 줄이기 위해서 미리 동영상을 인코딩한다.
        $encodedFileName = pathinfo($destinationPath, PATHINFO_FILENAME) . '_encoded.mp4';
        $encodedFilePath = 'uploads/' . $encodedFileName;
        $command = "ffmpeg -i $destinationPath -c:v libx264 -c:a aac $encodedFilePath";
        exec($command, $output, $status);

        $item = array(
            "videodestinationPath" => $encodedFilePath,
            "videofileName" => $encodedFileName,
            "destinationPath" => $thumbnailPath,
            "fileName" => $thumbnailFile
        );
        $array[] = $item;

      } else {
        echo 'Failed to move the uploaded file ' . $fileName . '.';
      }

    }elseif (strpos($fileType, 'video') === false) {
      $fileName = $files['name'][$i]; // 파일 이름

      $destinationPath = 'uploads/' . $fileName; // 저장할 파일 경로
  
      if (move_uploaded_file($tempFilePath, $destinationPath)) {
        $item = array(
            "destinationPath" => $destinationPath,
            "fileName" => $fileName
        );
        $array[] = $item;

      } else {
        echo 'Failed to move the uploaded file ' . $fileName . '.';
      }

    }else {
      # code...
    }
    }

    $temp_imp = json_encode($array, JSON_UNESCAPED_UNICODE);
    echo $temp_imp;

    
  } else {
    echo 'No files were uploaded.';
  }

?>