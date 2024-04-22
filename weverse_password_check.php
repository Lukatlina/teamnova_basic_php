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
                <h1 class="signin_box_header">새 비밀번호를 설정해 주세요.</h1>
                <form method="POST" Id="checkEmailForm" action="weverse_nickname_check.php">                                                                                             
                    <div class="signin_password">
                        <div class="signin_password">
                            <label class="label">새로운 비밀번호</label>
                            <div class="text_box">
                                <input type="password" aria-required="true" name="password" id="password" placeholder="비밀번호"
                                class="text_box_input" oninput="checkPassword()">
                                <button tabindex="-1" type="button" class="delete_login"></button>
                                <button tabindex="-1" type="button" class="show_login"></button>
                                <hr class="show_btn_img">
                            </div>
                            <div class="password_check">
                                <strong class="join_password_check_text" id="join_password_check_text_length">8 - 32자</strong>
                                <strong class="join_password_check_text" id="join_password_check_text_english">영문 1글자 이상</strong>
                                <strong class="join_password_check_text" id="join_password_check_text_number">1글자 이상 숫자</strong>
                                <strong class="join_password_check_text" id="join_password_check_text_sc">1글자 이상 특수문자</strong>
                                <strong class="join_password_check_text"></strong>
                            </div>
                        </div>
                    </div>
                    <div class="check_password">
                        <div class="check_password">
                            <label class="label">새로운 비밀번호 확인</label>
                            <div class="text_box">
                                <input type="password" aria-required="true" name="check_password" id="check_password" placeholder="비밀번호"
                                class="text_box_input" oninput="checkPassword()">
                                <button tabindex="-1" type="button" class="delete_login"></button>
                                <button tabindex="-1" type="button" class="show_login"></button>
                                <hr class="show_btn_img">
                            </div>
                            <div class="password_check">
                                <strong class="password_check_text" id="password_check_text"></strong>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="email" value="<?php echo $_POST['email']; ?>">
                    <div class="signinscreen_box_btn">
                        <button type="submit" class="continue_login_btn" id="pw_next_btn" value="submit" disabled>
                            <span class="continue_login_text">다음</span>
                        </button>
                        <button type="button" class="return_previous_page" onclick="location.href='weverse_email_check.php'">
                        이전
                    </button>
                    </div>
                </form>
            </div>
        </div>
        <footer></footer>
    </div>
    <script src="weverse_password_check.js"></script>
</body>
</html>