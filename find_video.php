<?php
    $image_sql = "SELECT image_path, image_id, video_number, is_thumbnail FROM image WHERE board_number = '$board_number'";
    $image_result = mysqli_query( $conn, $image_sql );

    if ($image_result){
        $images = array();

        for ($m = 0; $m < mysqli_num_rows($image_result); $m++) {
            $image_row = mysqli_fetch_array($image_result);
            $image_path = $image_row['image_path'];
            $image_id = $image_row['image_id'];
            $video_number = $image_row['video_number'];
            $is_thumbnail = $image_row['is_thumbnail'];
            
            $images[] = array(
                'image_path' => $image_path,
                'image_id' => $image_id,
                'video_number' => $video_number,
                'is_thumbnail' => $is_thumbnail
                );
            }
    } else {
        $image_none;
    }

    foreach ($images as $image) :
        // <img> 태그에서 id 값 추출
        // 동영상 여부를 확인하는 변수 1 : 동영상 : 이미지
        $is_thumbnail = $image['is_thumbnail'];

        $imageId = $image['image_id'];
        $pattern = '/<img id="' . preg_quote($imageId) . '">/';
        preg_match($pattern, $contents, $matches);
        $sameimgId = $matches[1];
        
        if ($is_thumbnail == true) {
            $video_number = $image['video_number'];

            $video_sql = "SELECT video_path FROM video WHERE board_number = '$board_number' AND video_number = '$video_number';";
            $video_result = mysqli_query( $conn, $video_sql );
            $result = mysqli_fetch_assoc($video_result);

            // 동적으로 생성된 src 속성으로 바꾸기
            $newSrc = "<source src=\"{$result['video_path']}\" type=\"video/mp4\"";
            $contents = preg_replace($pattern, "<video id=\"$imageId\" controls $newSrc></video>", $contents);


        }elseif ($is_thumbnail != true) {
            // 동적으로 생성된 src 속성으로 바꾸기
            $newSrc = "src=\"{$image['image_path']}\"";
            $contents = preg_replace($pattern, "<img id=\"$imageId\" $newSrc>", $contents);
        }else {
            echo '동영상과 이미지 둘 다 아님 오류';
        }
    endforeach;
?>
