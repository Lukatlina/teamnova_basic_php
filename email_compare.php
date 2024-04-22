<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // AJAX 요청이 POST 방식으로 전송된 경우

    $email = $_POST['email'];
  
    // 전달된 데이터 확인
    // $email = isset($_POST['email']) ? $_POST['email'] : '';  // 전달된 데이터에 접근

    // 필요한 함수 호출
    $result = email_compare_func($email);

    echo $result;
    
  }

function email_compare_func($email){
    $serverName = "192.168.56.102";
    $userName = "lunamoon";
    $password = "digda1210";

    
    $conn = mysqli_connect( $serverName , $userName , $password , "weverse" );
    $sql = "SELECT email, withdraw_time FROM user WHERE email = '$email';";

    mysqli_connect_error();

    $jb_result = mysqli_query( $conn, $sql );

    // 만약 반환값이 있다면
    if ($jb_result !==false) {
      // email 데이터가 있을 때 탈퇴 시간 유무를 확인해야 한다
      // 없다면 0을 반환해서 회원가입 페이지로 이동하도록 만든다
      if($jb_result->num_rows > 0) {
        // mysqli_fetch_assoc : 컬럼명으로 데이터를 불러올 수 있음.
          $row = mysqli_fetch_assoc( $jb_result );
          // heidi SQL에서 timestamp로 지정했으나 불러올 때 여전히 string값으로 되어 있음
          $withdraw_time =  strtotime($row[ 'withdraw_time' ]);

          if(is_null($withdraw_time)) {
            // null일 경우 true반환. 가입가능하며 1을 반환하게 될 것
            return 1;
          }else {
            // 90일의 시간을 초단위로 계산해서 탈퇴시의 timestamp값과 더해준다.
            $after90daysTime = strtotime('+90days', $withdraw_time);
            $currentTime = time();
            

            if ($after90daysTime <= $currentTime) {
              // 현재시간이 탈퇴시간 +90일 보다 크거나 같으면 가입 가능
              return 1;
            }else{
              // 아니라면 가입 불가능
              return 2;
            }
          }
      }else{
        // email값이 없기 때문에 무조건 0을 반환하게 될 것
        return 0;
      }
    }else{
      return -1;
    }
}
?>