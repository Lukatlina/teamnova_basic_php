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
    <div id="next">
        <div class="signinscreen">
            <div class="signin_img">
                <img src="image/weverse_account.png" width="201" height="18" alt="weverse account" class="signin_img_1">
            </div>
            <div class="signinscreen_box">

            <form method="POST" action="weverse_password_check.php">
            <h1 class="signin_box_header"><?php echo $_POST['email'];?></h1>
                <h1 class="signin_box_header_sub">이 이메일은 새로 가입할 수 있는 이메일입니다. 계속하시겠습니까?</h1>
                <div class="signinscreen_box_btn">
                <input type="hidden" name="email" value="<?php echo $_POST['email']; ?>">
                    <Button type="submit" class="continue_login_btn" Id="continue_login_btn" onclick="location.href='weverse_password_check.php'">
                        <span class="continue_login_text">가입하기</span>
                    </Button>
            </form>
                
                    <button type="button" class="return_previous_page" onclick="location.href='weverse_email_compare.php'">
                        이전
                    </button>
                </div>
            </div>
        </div>
        <footer></footer>
    </div>
</body>
</html>