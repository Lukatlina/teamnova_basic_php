<?php
//세션 데이터에 접근하기 위해 세션 시작
if (!session_id()) {
  session_start();
}
setcookie("UserToken", "", time() - (86400 * 30) , "/");

// 세션 파일 삭제
session_destroy();
?>