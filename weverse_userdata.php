<?php 
// header("Pragma: no-cache");
// header("Cache-Control: no-cache, must-revalidate");

include 'check_auto_login.php';

    if (!session_id()) {
        session_start();
    }

?>

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
    <script src="weverse_userdata.js"></script>
    <script src="weverse_password_check.js"></script>
    <script src="weverse_nickname_check.js"></script>
</head>
<body style="overflow: auto;">
    <div id="next">
        <header class="userdata_header">
                <a class="userdata_img" onclick="location.href='weverse_userdata.php'">
                    <div class="main_img">
                        <img src="image/weverse_account.png" width="201" height="18" alt="weverse account" class="click_main_img">
                    </div>
                </a>
                <button class="user_logout_btn" onclick="logoutUser()">로그아웃</button>
        </header>
        
        <div class="fullscreen_box">
        <?php
            
            include 'server_connect.php';

            $email = $_SESSION['email'];
            
            $sql = "SELECT nickname, first_name, last_name, password FROM user WHERE email='$email';";
            $result = mysqli_query( $conn, $sql );
            
            while( $row = mysqli_fetch_array( $result ) ) {
                $nickname =  $row[ 'nickname' ];
                $first_name = $row[ 'first_name' ];
                $last_name = $row[ 'last_name' ];
                $password = $row[ 'password' ];
             
                }

        ?>
            <div class="screen_box">
                <section class="box_section">
                    <h3 class="box_header">내 정보</h3>
                <dl class="userdata_box">
                    <div class="userdata_box_s">
                        <dt class="user_label">이메일</dt>
                        <dd class="now_user_data"><?php echo $_SESSION['email'];?></dd>
                    </div>
                    <div class="userdata_box_s">
                        <dt class="user_label">닉네임</dt>
                        <dd class="now_user_data">
                            <span id="modified_nickname_text"><?php echo $nickname; ?></span>
                            <button type="button" class="mypage_change_btn" Id="mypage_change_nickname" onclick="openNicknameDialog()">변경</button>
                        </dd>
                    </div>
                    <div class="userdata_box_s">
                        <dt class="user_label">이름</dt>
                        <dd class="now_user_data">
                            <span id="modified_name_text"><?php echo $last_name . $first_name;?></span>
                            <button type="button" class="mypage_change_btn" id="mypage_change_name" onclick="openNameDialog()">변경</button>
                        </dd>
                    </div>
                    <div class="userdata_box_s">
                        <dt class="user_label">비밀번호</dt>
                        <dd class="now_user_data">
                            <span>
                                <div class="encoding_password">
                                    <span class="circle_password"></span>
                                    <span class="circle_password"></span>
                                    <span class="circle_password"></span>
                                    <span class="circle_password"></span>
                                    <span class="circle_password"></span>
                                    <span class="circle_password"></span>
                                    <span class="circle_password"></span>
                                    <span class="circle_password"></span>
                                </div>
                            </span>
                            <button type="button" class="mypage_change_btn" id="mypage_change_password" onclick="openPasswordDialog()">변경</button>
                        </dd>
                    </div>
                </dl>
                </section>
                <section class="box_section" style="margin-bottom: 0px; text-align: center;">
                    <button type="submit" class="member_withdraw" onclick="location.href='weverse_member_withdraw.php'">위버스 계정 탈퇴하기</button>
                </section>
            </div>
        </div> 
    </div>
    <div role="dialog" class="dialog_popup" id="dialog_nickname">
        <div class="dialog_box">
            <header class="dialog_header">
                <h2 class="dialog_header_text">닉네임 변경</h2>
            </header>
            <section class="dialog_section">
                <div class="dialog_inner">
                    <header>
                        <h3>닉네임을 입력해주세요.</h3>
                        <p>1–32자 길이로 숫자, 특수문자 조합의 공통 닉네임이며, 나중에 계정 설정에서 변경할 수 있습니다.</p>
                    </header>
                    <form name="form_nickname" method="POST" id="form_nickname">
                        <div class="change_form_box">
                            <label for="modifyNickname" class="label">닉네임</label>
                            <div class="text_box">
                            <input type="hidden" name="email" value="<?php echo $_SESSION['email'];?>">
                                <input
                                    type="text"
                                    aria-required="true"
                                    id="modifyNickname"
                                    name="modifyNickname"
                                    placeholder="nickname"
                                    class="text_box_input"
                                    value="<?php echo $nickname; ?>"
                                    oninput="checkmodifyNickname()">
                                <button tabindex="-1" type="button" class="delete_login"></button>
                                <hr class="delete_button_img">
                            </div>    
                            <div class="email_check">
                                <strong class="email_check_text" id="modifyNickname_check">유효한 닉네임을 입력해주세요.</strong>
                            </div>
                        </div>
                        <footer>
                            <button type="button" class="nickname_change_cancel" id="nickname_change_cancel" onclick="closeNicknameDialog()">
                                <span class="change_btn_text">취소</span>
                            </button>
                            <button type="submit" class="nickname_change_complete" id="nickname_change_complete" onclick="saveNicknameDialog()" disabled>
                                <span class="change_btn_text">저장</span>
                            </button>
                        </footer>
                    </form>
                </div>
            </section>
        </div>
    </div>
    <div role="dialog" class="dialog_popup" id="dialog_name">
        <div class="dialog_box">
            <header class="dialog_header">
                <h2 class="dialog_header_text">이름 변경</h2>
            </header>
            <section class="dialog_section">
                <div class="dialog_inner">
                    <header>
                        <h3>이름을 입력해주세요.</h3>
                    </header>
                    <form name="form_name" method="POST" id="form_name">
                    <input type="hidden" name="email" value="<?php echo $_SESSION['email'];?>">
                        <div class="change_form_box">
                            <label for="lastname" class="label">성</label>
                            <div class="text_box">
                                <input
                                    type="text"
                                    aria-required="true"
                                    id="lastname"
                                    name="lastname"
                                    placeholder="last name"
                                    class="text_box_input"
                                    value="<?php echo $last_name; ?>"
                                    oninput="checkmodifyName()">
                                <button tabindex="-1" type="button" class="delete_login"></button>
                                <hr class="delete_button_img">
                            </div>    
                            <div class="email_check">
                                <strong class="email_check_text" id="modify_lastname_check"></strong>
                            </div>
                        </div>
                        <div class="change_form_box">
                            <label for="firstname" class="label">이름</label>
                            <div class="text_box">
                                <input
                                    type="text"
                                    aria-required="true"
                                    id="firstname"
                                    name="firstname"
                                    placeholder="first name"
                                    class="text_box_input"
                                    value="<?php echo $first_name; ?>"
                                    oninput="checkmodifyName()">
                                <button tabindex="-1" type="button" class="delete_login"></button>
                                <hr class="delete_button_img">
                            </div>    
                            <div class="email_check">
                                <strong class="email_check_text" id="modify_firstname_check"></strong>
                            </div>
                        </div>
                        <footer>
                            <button type="button" class="nickname_change_cancel" id="name_change_cancel" onclick="closeNameDialog()">
                                <span class="change_btn_text">취소</span>
                            </button>
                            <button type="submit" class="nickname_change_complete" id="name_change_complete" onclick="saveNameDialog()" disabled>
                                <span class="change_btn_text">저장</span>
                            </button>
                        </footer>
                    </form>
                </div>
            </section>
        </div>
    </div>
    <div role="dialog" class="dialog_popup" id="dialog_password">
        <div class="password_dialog_box">
            <header class="dialog_header">
                <h2 class="dialog_header_text">비밀번호 변경</h2>
            </header>
            <section class="dialog_section">
                <div class="dialog_inner">
                    <header>
                        <h3>새 비밀번호를 설정해 주세요.</h3>
                    </header>
                    <form method="POST" Id="form_password">
                        <div class="signin_password">
                            <div class="signin_password">
                                <label for="current_password" class="label">현재 비밀번호</label>
                                <div class="text_box">
                                <input type="hidden" name="email" value="<?php echo $_SESSION['email'];?>">
                                    <input type="password" aria-required="true" name="current_password" id="current_password" placeholder="현재 비밀번호"
                                    class="text_box_input" oninput="checkmodifyPassword()" autocomplete="current-password">
                                    <button tabindex="-1" type="button" class="delete_login"></button>
                                    <button tabindex="-1" type="button" class="show_login"></button>
                                    <hr class="show_btn_img">
                                </div>
                                <div class="current_password_check">
                                    <strong class="current_password_check_text" id="current_password_check_text">기존 비밀번호를 잘못 입력했습니다.</strong>
                                </div>
                            </div>
                        </div>
                        <div class="signin_password">
                            <div class="signin_password">
                                 <label for="modify_password"class="label">새로운 비밀번호</label>
                                <div class="text_box">
                                    <input type="password" aria-required="true" name="modify_password" id="modify_password" placeholder="새로운 비밀번호"
                                    class="text_box_input" oninput="checkmodifyPassword()" autocomplete="new-password">
                                    <button tabindex="-1" type="button" class="delete_login"></button>
                                    <button tabindex="-1" type="button" class="show_login"></button>
                                    <hr class="show_btn_img">
                                </div>
                                <div class="password_check">
                                    <strong class="join_password_check_text" id="modify_password_check_text_length">8 - 32자</strong>
                                    <strong class="join_password_check_text" id="modify_password_check_text_english">영문 1글자 이상</strong>
                                    <strong class="join_password_check_text" id="modify_password_check_text_number">1글자 이상 숫자</strong>
                                    <strong class="join_password_check_text" id="modify_password_check_text_sc">1글자 이상 특수문자</strong>
                                    <strong class="join_password_check_text"></strong>
                                </div>
                            </div>
                        </div>
                        <div class="check_password">
                            <div class="check_password">
                                <label for="modify_check_password" class="label">새로운 비밀번호 확인</label>
                                <div class="text_box">
                                    <input type="password" aria-required="true" name="modify_check_password" id="modify_check_password" placeholder="새로운 비밀번호 확인"
                                    class="text_box_input" oninput="checkmodifyPassword()" autocomplete="new-password">
                                    <button tabindex="-1" type="button" class="delete_login"></button>
                                    <button tabindex="-1" type="button" class="show_login"></button>
                                    <hr class="show_btn_img">
                                </div>
                                <div class="password_check">
                                    <strong class="password_check_text" id="modify_password_check_text"></strong>
                                </div>
                            </div>
                        </div>
                        <footer>
                            <button type="button" class="nickname_change_cancel" id="password_change_cancel" onclick="closePasswordDialog()">
                                <span class="change_btn_text">취소</span>
                            </button>
                            <button type="submit" class="nickname_change_complete" id="password_change_complete" onclick="checkCurrentPassword()">
                                <span class="change_btn_text">저장</span>
                            </button>
                        </footer>
                    </form>
                </div>
            </section>
        </div>
    </div>
</body>
</html>