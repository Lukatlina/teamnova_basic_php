<?php
    session_start();
?>

<!DOCTYPE html>
<html class="scrollbar-custom use-webfont">
<head>
    <meta charset="UTF-8">
    <meta name="theme-color"content="#fff">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weverse</title>
    <link rel="stylesheet" type="text/css" href="artist_style.css">
    <link rel="stylesheet" type="text/css" href="weverse.css">
</head>
<body>
    <?php

        $serverName = "192.168.56.102";
        $userName = "lunamoon";
        $server_pw = "digda1210";
        $board_number = $_GET['board'];
        
        $conn = mysqli_connect( $serverName , $userName , $server_pw , "weverse" );
        $sql = "SELECT board_number, contents, user_number FROM board WHERE board_number='$board_number';";
        $result = mysqli_query( $conn, $sql );
        
        // 유저 고유번호와 닉네임을 함께 조회해서 가져온다.
        $row = mysqli_fetch_assoc($result);
        $user_number = $row['user_number'];          
        ?>

    <div class="root">
        <div class="Toastify" id="WEV2-TOAST-CONTAINER-ID"></div>
        <div class="App" style>
            <div class="GlobalLayoutView_layout_container" data-is-responsive-mode="false">
                <div class="GlobalLayoutView_header">
                    <header class="header">
                        <div class="HeaderView_content">
                            <div class="HeaderView_service">
                                <img src="image/weverse.png" width="136px" height="20px">
                            </div>
                            <div class="HeaderView_action">
                                <button class="user_data_btn" onclick="location.href='weverse_user_data.php'">
                                    <img src="image/userdata_btn_img.png" width="38px" height="38px">
                                </button>
                            </div>
                        </div>
                    </header>
                </div>
                <div class="body">
                    <div class="CommunityNavigationLayoutView_navigation">
                        <nav class="CommunityHeaderNavigationView_community_header_navigation"
                        style="background-image: linear-gradient(90deg, #07D8E2 54.07%, #35e99d 99.24%);">
                            <a href="newjeansofficial/feed.php" class="CommunityHeaderNavigationView_link" aria-current="false">Feed</a>
                            <a href="newjeansofficial/artist.php" class="CommunityHeaderNavigationView_link" aria-current="false">Artist</a>
                        </nav>
                    </div>
                </div>

                <div class="Modal">
        <div id="ModifyModal" class="Modal__Overlay Modal__Overlay--after-open PostModalView_modal_overlay" style="z-index: 20003;">
            <div id="ModifyeditorWriteModal" class="Modal__Content Modal__Content--after-open BaseModalView_modal" tabindex="-1" role="dialog" aria-label="포스트 쓰기" aria-modal="true">
                <div class="BaseModalViewContent BaseModalView_content" style="width: 767px; border-radius: 20px;">
                    <div class="EditorModalLayoutView_container">
                        
                        <div class="EditorModalLayoutView_title_area">
                            <strong class="title">포스트 수정</strong>
                            <em class="EditorWriteModalView_artist">NewJeans</em>
                        </div>
                        <div class="content EditorModalLayoutView_content">
                            <div class="WeverseEditor">
                                <div class="editor" id="Modifyeditor-wevEditor" style="min-height: 348px;">
                                    <form id="Modify_textbox_form" method="POST">
                                        <input id="Modify_board_number" type="hidden" name="Modify_board_number" value="<?php echo $board_number;?>">
                                        <input id="Modify_user_number" type="hidden" name="Modify_user_number" value="<?php echo $user_number;?>">
                                        <div id="Modify_wevEditor" contenteditable="true" style="position: relative; outline: none;" class="cke_editable cke_editable_inline cke_contents_ltr" tabindex="0" spellcheck="false" role="textbox" aria-label="false">
                                            <?php echo $row['contents'];?>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="EditorModalLayoutView_footer_area">
                            <div class="EditorWriteModalFooterView_container">
                                <div class="EditorWriteModalFooterView_button_area">
                                    <div class="EditorWriteModalFooterView_button_icon_wrap -photo">
                                        <label for="ape" class="EditorWriteModalFooterView_button_icon">
                                            <span class="blind">Attach photo</span>
                                            <input class="blind" id="ape" type="file" multiple accept="image/*">
                                        </label>
                                    </div>
                                    <div class="EditorWriteModalFooterView_button_icon_wrap EditorWriteModalFooterView_-video">
                                        <label for="ave" class="EditorWriteModalFooterView_button_icon">
                                            <span class="blind">Attach photo</span>
                                            <input class="blind" id="ave" type="file" multiple accept="video/mp4, video/*">
                                        </label>
                                    </div>
                                </div>
                                <div class="EditorWriteModalFooterView_button_area">
                                    <button type="button" onclick="modifyPostFromDB()" id="Modify_Modal_submit_btn" class="EditorWriteModalFooterView_button_submit" disabled>등록</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="BaseModalView_close_button" onclick="returnBoardNotModify()">
                    <span class="blind">close popup</span>
                </button>
            </div>
        </div>
    </div>
    <div class="Modal">
        <div id="modifyConfirmPostModal" class="Modal__Overlay Modal__Overlay--after-open BaseModalView_modal_overlay" style="z-index: 20003;">
            <div id="modifyPopupModal" class="Modal__Content Modal__Content--after-open BaseModalView_modal" tabindex="-1" role="dialog" aria-label="modal" aria-modal="true">
                <div class="BaseModalViewContent BaseModalView_content" style="width: 428px; max-width: 428px; border-radius: 14px;">
                    <div class="CommonModalView_modal_inner">
                        <p class="CommonModalView_description">
                            수정을 취소하시겠습니까?
                        </p>
                        <div class="ModalButtonView_button_wrap">
                            <form action="">
                            <input id="Modify_board_number" type="hidden" name="Modify_board_number" value="<?php echo $board_number;?>">
                            <input id="Modify_user_number" type="hidden" name="Modify_user_number" value="<?php echo $user_number;?>">
                            <button aria-label="cancel modal" type="button" class="ModalButtonView_button ModalButtonView_-cancel" onclick="returnModifyModal()">취소</button>
                            <button aria-label="confirm modal" type="button" class="ModalButtonView_button ModalButtonView_-confirm" onclick="location.href='weverse_artist_user.php'">확인</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="weverse_modify_post.js"></script>