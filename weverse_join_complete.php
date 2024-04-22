<?php
    error_reporting(E_ALL);
    ini_set("display_errors", 1);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weverse Account</title>
    <link rel="stylesheet" type="text/css" href = "login_style.css">
    <link rel="stylesheet" type="text/css" href = "weverse.css">
    <style>
        html{font-size: 10px;}    
    </style>
</head>
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<body>
<?php

    $nickname = $_POST[ 'nickname' ];
    $email = $_POST[ 'email' ];
    $password = $_POST[ 'password' ]; 

    include 'server_connect.php';

        $sql = "INSERT INTO user (
          nickname,
          email,
          join_time,
          password )
      
           VALUES (
              '$nickname',
              '$email',
              NOW(),
              '$password' );";

        mysqli_query( $conn, $sql );

?>
    <div id="next">
        <div class="signinscreen">
            <div class="signin_img">
                <img src="image/weverse_account.png" width="201" height="18" alt="weverse account" class="signin_img_1">
            </div>
            <div class="signinscreen_box">
                <h1 class="signin_box_header">가입이 완료되었습니다.</h1>
                <h1 class="signin_box_header_sub"
                        style="color: rgb(142, 142, 142); font-weight: 400;">위버스 계정으로 weverse 서비스를 모두 이용할 수 있습니다.</h1>
                <div class="signinscreen_box_btn">
                    <Button type="submit" class="continue_login_btn" Id="continue_login_btn" onclick="location.href='weverse_email_compare.php'">
                        <span class="continue_login_text">로그인으로 돌아가기</span>
                    </Button>
                </div>
            </div>
        </div>
        <footer></footer>
    </div>

</body>
</html>