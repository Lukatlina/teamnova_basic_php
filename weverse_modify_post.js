const ModifytextBox = document.getElementById('Modify_wevEditor');
let saved_contents = ModifytextBox.textContent.trim();


ModifytextBox.addEventListener('input', function() {
  let Modal_submit_btn = document.getElementById('Modify_Modal_submit_btn');
  

  console.log(ModifytextBox.textContent.trim());

  if (ModifytextBox.textContent.trim() !== '' && ModifytextBox.textContent.trim() !== saved_contents) {
    console.log("Modal_submit_btn.disabled" + Modal_submit_btn.disabled);
    Modal_submit_btn.disabled = false;
    console.log("Modal_submit_btn.disabled" + Modal_submit_btn.disabled);
  }else{
    console.log("Modal_submit_btn.disabled" + Modal_submit_btn.disabled);
    Modal_submit_btn.disabled = true;
    console.log("Modal_submit_btn.disabled" + Modal_submit_btn.disabled);
  }
});

function modifyPostFromDB() {
  console.log("modifyBoardText() 시작");

  let form = document.getElementById("Modify_textbox_form");

  console.log("modifyform : " + form);

  let divContent = ModifytextBox.innerHTML;

  let formData = new FormData(form);
  formData.append("divContent", divContent);
  
  for (var pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
}

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "modifyBoardTextPHP.php", true);
    
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            console.log("POST 요청 성공");
            var response = xhr.responseText;
            console.log("response: " + response);
            // 응답 결과에 따라 처리
            if (response === "1") {
                form.action = "weverse_artist_user.php";
            } else {
              console.log("response 오류");
              return;
            }
          } else {
            console.log("POST 요청 실패");
          }
          form.submit();
        }
      };
      xhr.send(formData);
 
    console.log("modifyBoardText() 끝");
  }

  let modifyPostModal = document.getElementById("modifyConfirmPostModal");

  function returnBoardNotModify(){
    modifyPostModal.style.display = "flex";
  }

  function returnModifyModal(){
    modifyPostModal.style.display = "none";
  }

  function openDeletePostModal(){
    modifyPostModal.style.display = "flex";
  }