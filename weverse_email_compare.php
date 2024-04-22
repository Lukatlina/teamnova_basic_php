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
        <script src="weverse_email_compare.js"></script>
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
                    <h1 class="signin_box_header">위버스 계정으로 로그인이나 회원가입해주세요.</h1>
                    <form name="checkEmail" method="POST" id="checkEmail">
                        <div class="form_box">
                            <label class="label">이메일</label>
                            <div class="text_box">
                                <input
                                    type="text"
                                    aria-required="true"
                                    id="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    class="text_box_input"
                                    oninput="printEmail()"
                                    value>

                                <button tabindex="-1" type="button" class="delete_login"></button>
                                <hr class="delete_button_img">
                            </div>
                            <div class="email_check">
                                <strong class="email_check_text" id="email_check"></strong>
                            </div>
                        </div>
                        <div class="signinscreen_box_btn">
                            <button
                                type="submit"
                                class="continue_login_btn"
                                id="continue_login_btn"
                                onclick="loadData()"
                                disabled="disabled">
                                <span class="continue_login_text">이메일로 계속하기</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <footer></footer>
        </div>
    </body>
</html>