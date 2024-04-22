<?php include 'login_check.php';?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weverse Account</title>
    <link rel="stylesheet" type="text/css" href="weverse_userdata.css">
    <link rel="stylesheet" type="text/css" href="login_style.css">
    <link rel="stylesheet" type="text/css" href="weverse.css">

    <style>
        html{font-size: 10px;}
    </style>
    <script src="weverse_member_withdraw.js"></script>
</head>
<body style="overflow: auto;">
    <div id="next">
        <header class="userdata_header">
                <a href="/ko" class="userdata_img">
                    <div class="main_img">
                        <img src="image/weverse_account.png" width="201" height="18" alt="weverse account" class="click_main_img">
                    </div>
                </a>
        </header>
        
        <div class="fullscreen_box" style="--display: flex; --flex-direction: column; --justify-content: space-between;">
        <?php
            $serverName = "192.168.56.102";
            $userName = "lunamoon";
            $server_pw = "digda1210";
            $email = $_SESSION['email'];
            
            $conn = mysqli_connect( $serverName , $userName , $server_pw , "weverse" );
            $sql = "SELECT nickname, first_name, last_name, password FROM user WHERE email='$email';";
            $result = mysqli_query( $conn, $sql );
            
            while( $row = mysqli_fetch_array( $result ) ) {
                $nickname =  $row[ 'nickname' ];
                $first_name = $row[ 'first_name' ];
                $last_name = $row[ 'last_name' ];
                $password = $row[ 'password' ];
             
                } 
        ?>
            <header class="withdraw_header">
                <h1 class="withdraw_header_text">Weverse 탈퇴</h1>
                <div class="withdraw_textbox">
                    <strong>유의 사항</strong>
                    <ul>
                        <li>
                            위버스 서비스 탈퇴 시, 계정 정보 복구는 불가하며, 90일 이후 동일 계정으로 재가입 가능합니다. 90일 이후 동일 계정으로 재가입 시, 탈퇴 전 계정 정보 복구는 불가합니다.
                        </li>
                        <li>
                            위버스 서비스 탈퇴 시, 가입한 위버스 이력, 위버스 닉네임, 서비스 활동 이력은 삭제되며 복구가 불가합니다.
                        </li>
                        <li>
                            위버스 서비스 탈퇴 시, 후에도 작성한 포스트와 댓글은 삭제되지 않으며, Unknown 의 게시물로 유지됩니다.
                        </li>
                    </ul>
                </div>
            </header>
            <form id="form_withdraw" class="form_withdraw" method="POST">
                <!-- <input type="hidden" name="withdraw_email" value="<?php echo $_POST['email'];?>"> -->
                <header>
                    <p>유의 사항을 충분히 숙지하고 동의하신다면, 아래 문구를 직접 입력해주세요.</p>
                    <p>Weverse 탈퇴</p>
                </header>
                <div class="form_withdraw_input_box">
                    <div class="form_withdraw_input">
                        <input type="text" name="confirmText" placeholder="위의 메시지를 똑같이 입력해주세요." class="withdraw_confirmtext" id="withdraw_confirmtext" oninput="compareWithdrawText()">
                        <button tabindex="-1" type="button" class="delete_login"></button>
                        <hr class="form_withdraw_hr">
                    </div>
                </div>
                <div class="form_withdraw_button_box">
                    <button type="button" disabled class="form_draw_btn" id="form_draw_btn" onclick="writeWithdrawText()">
                        <span class="withdraw_btn">Weverse 탈퇴</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>