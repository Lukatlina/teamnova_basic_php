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
        $imageId = $image['image_id'];
        $pattern = '/<img id="' . preg_quote($imageId) . '">/';
        preg_match($pattern, $contents, $matches);
        $sameimgId = $matches[1];

        // 동적으로 생성된 src 속성으로 바꾸기
        $newSrc = "src=\"{$image['image_path']}\"";
        $contents = preg_replace($pattern, "<img id=\"$imageId\" $newSrc>", $contents);
    endforeach;
?>


