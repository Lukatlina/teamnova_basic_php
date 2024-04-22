<?php
// id가 없을 경우 세션 시작
if(!session_id()) {
// 이 함수가 실행된 페이지에서만 Session 사용 가능
    session_start();
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $email = $_SESSION['email'];
  
    // 전달된 데이터 확인
    // $email = isset($_POST['email']) ? $_POST['email'] : '';  // 전달된 데이터에 접근

    // 필요한 함수 호출
    $result = write_withdraw_text_func($email);
  
    // 응답 데이터 반환
    echo $result;
}
  

function write_withdraw_text_func($email){
    $serverName = "192.168.56.102";
    $userName = "lunamoon";
    $serverPW = "digda1210";

    
    $conn = mysqli_connect( $serverName , $userName , $serverPW , "weverse" );
    $sql = "UPDATE user SET withdraw_time = NOW() WHERE email = '$email';";

    mysqli_connect_error();

    $jb_result = mysqli_query( $conn, $sql );

    return $jb_result;
}
?>