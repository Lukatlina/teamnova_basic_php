<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

$data = array(
    'key1' => 'true',
    'key2' => 'value2'
  );
  $response = json_encode($data);
  
  // JSON 응답 반환
  echo $response;
?>