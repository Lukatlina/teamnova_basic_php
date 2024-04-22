<?php
if (empty($_POST['email'])) {
    // HTTP의 헤더를 전송하는 역할을 하는 함수
    header("Location: weverse_email_compare.php");
    // 스크립트의 실행 중지 및 종료
    exit();
}

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
<body>
    <div id="next">
        <div class="signinscreen">
            <div class="signin_img">
                <img src="image/weverse_account.png" width="201" height="18" alt="weverse account" class="signin_img_1">
            </div>
            <div class="signinscreen_box">
                <h1 class="signin_box_header">위버스 계정으로 로그인해주세요.</h1>
                <form method="POST" id="login_user_data_check">
                    <div class="form_box">
                        <label class="label">이메일</label>
                        <div class="text_box">
                            <input type="text" aria-required="true" name="email"
                            class="text_box_input" value="<?php echo $_POST['email']; ?>" readonly>
                        </div>
                        <div class="email_check">
                            <strong class="email_check_text"></strong>
                        </div>
                    </div>
                    <div class="signin_password">
                        <div class="form_box">
                            <label class="label">비밀번호</label>
                            <div class="text_box">
                                <input type="password" aria-required="true" name="password" placeholder="비밀번호" Id="login_password"
                                class="text_box_input" oninput="passwordCheck()">
                                <button tabindex="-1" type="button" class="delete_login"></button>
                                <button tabindex="-1" type="button" class="show_login"></button>
                                <hr class="show_btn_img">
                            </div>
                            <div class="password_check">
                                <strong class="password_check_text" Id="login_password_check_text">유효한 비밀번호를 입력해주세요.</strong>
                            </div>
                            <div>
                                <input type="checkbox" id="AutoLogin" class="CheckBox_button">
                                <label for="AutoLogin">자동 로그인</label>
                            </div>
                        </div>
                    </div>
                    <div class="signinscreen_box_btn">
                        <button type="submit" class="continue_login_btn" Id="login_btn" onclick="loginData()" disabled>
                            <span class="continue_login_text">로그인</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <footer></footer>
    </div>
    <script src="weverse_login.js"></script>
</body>
</html>