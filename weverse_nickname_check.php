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
        <link rel="stylesheet" type="text/css" href="login_style.css">
        <link rel="stylesheet" type="text/css" href="weverse.css">
        <style>
            html {
                font-size: 10px;
            }
        </style>
<script src="weverse_nickname_check.js"></script>
    </head>
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <body>
        <div id="next">
            <div class="signinscreen">
                <div class="signin_img">
                    <img
                        src="image/weverse_account.png"
                        width="201"
                        height="18"
                        alt="weverse account"
                        class="signin_img_1">
                </div>
                <div class="signinscreen_box">
                    <h1 class="signin_box_header">닉네임을 입력해주세요.</h1>
                    <h1
                        class="signin_box_header_sub"
                        style="color: rgb(142, 142, 142); font-weight: 400;">1–32자 길이로 숫자, 특수문자 조합의 공통 닉네임이며, 나중에 계정 설정에서 변경할 수 있습니다.</h1>
                    <div class="signin_nickname">
                        <form
                            name="form_nickname"
                            method="POST"
                            id="form_nickname"
                            action="weverse_join_complete.php">
                            <div class="form_box">
                                <label class="label">닉네임</label>
                                <div class="text_box">
                                    <input
                                        type="text"
                                        aria-required="true"
                                        id="nickname"
                                        name="nickname"
                                        placeholder="nickname"
                                        class="text_box_input"
                                        oninput="checkNickname()">
                                    <?php
                                    $encrypted_password = password_hash( $_POST['password'], PASSWORD_DEFAULT );
                                    ?>
                                    <input type="hidden" name="email" value="<?php echo $_POST['email']; ?>">
                                    <input type="hidden" name="password" value="<?php echo $encrypted_password; ?>">
                                    <button tabindex="-1" type="button" class="delete_login"></button>
                                    <hr class="delete_button_img">
                                </div>
                                <div class="email_check">
                                    <strong class="email_check_text" id="nickname_check">유효한 닉네임을 입력해주세요.</strong>
                                </div>
                            </div>
                            <div class="signinscreen_box_btn">
                                <button
                                    type="submit"
                                    class="continue_login_btn"
                                    id="continue_join_btn">
                                    <span class="continue_login_text">회원가입</span>
                                </button>
                                <button
                                    type="button"
                                    class="return_previous_page"
                                    onclick="location.href='weverse_password_check.php'">
                                    이전
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <footer></footer>
    </body>
</html>