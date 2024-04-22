let modal = document.getElementById("Modal");
// 이미지 파일을 추가할 때마다 저장할 배열 변수 선언 
let uploadFiles = [];
let submitFiles = [];

function openWriteTextModal() {
  modal.style.display = "flex";
}

function closeWriteTextModal() {
  modal.style.display = "none";
  textBox.textContent = "위버스에 남겨보세요...";
}


const textBox = document.getElementById('wevEditor');

// 포커스가 갔을 때 
textBox.addEventListener('focus', function () {
  let images = textBox.getElementsByTagName('img');
  if (this.textContent.trim() === "위버스에 남겨보세요...") {
    this.textContent = '';
    create_pTag();
    this.classList.remove('placeholder');
    this.classList.add('active');
    let Modal_submit_btn = document.getElementById('Modal_submit_btn');
    if (textBox.textContent.trim() !== '' || images.length > 0) {
      Modal_submit_btn.disabled = false;
    } else {
      Modal_submit_btn.disabled = true;
    }
  } else if (images.length > 0) {
    create_pTag();
    this.classList.remove('placeholder');
    this.classList.add('active');
  }
});

// 텍스트 박스에 텍스트가 입력될 때마다 검사하는 함수
// 안에 텍스트가 있다면 버튼 활성화, 없다면 비활성화
textBox.addEventListener('input', function () {
  let Modal_submit_btn = document.getElementById('Modal_submit_btn');
  let images = textBox.getElementsByTagName('img');
  console.log("텍스트 박스 길이" + textBox.textContent.trim().length);
  if (textBox.textContent.trim() !== '' && textBox.textContent.trim().length < 10000) {
    Modal_submit_btn.disabled = false;
  } else if (textBox.textContent.length > 10000) {
    Modal_submit_btn.disabled = true;
    alert("게시글은 9,999자까지만 작성할 수 있습니다.");
  } else if (images.length > 0) {
    Modal_submit_btn.disabled = false;
  } else {
    Modal_submit_btn.disabled = true;
  }
});

// 포커스 해제 시
textBox.addEventListener('blur', function () {
  let images = textBox.getElementsByTagName('img');
  if (this.textContent.trim() === '' && images.length === 0) {
    this.textContent = "위버스에 남겨보세요...";
    this.classList.remove('active');
    this.classList.add('placeholder');
  }
});


function create_pTag() {
  let new_pTag = document.createElement('p');
  new_pTag.contentEditable = true;

  // minheight 속성을 넣어줌으로써 p태그로 focus가 가도록 만듦
  new_pTag.style.minHeight = "15px";
  new_pTag.style.margin = "1px";

  // 생성된 Tag에 속성, 값을 부여하는 함수
  // new_pTag.setAttribute('id', 'pTag');
  new_pTag.innerHTML = "";

  // 속성이 부여된 태그를 지정된 태그의 자식 태그로 넣는다.
  textBox.appendChild(new_pTag);
  new_pTag.focus();

}

function saveBoardText() {
  console.log("saveBoardText() 시작");

  // 6-1. 등록 버튼을 클릭하면 게시판에 img 태그가 있을 경우 같은 이미지가 할당된 submitFiles을 보내 저장한다.
  console.log("이미지 서브밋 마지막 파일 이름" + submitFiles[submitFiles.length - 1]);

  let formData = new FormData();

  // 이미지 태그의 src 속성 비우기
  // 텍스트 박스 안의 모든 img 태그 가져오기
  imgElements = textBox.querySelectorAll('img');


  //for문으로 img태그의 갯수만큼 반복해서 src속성을 삭제해준다.
  for (let i = 0; i < imgElements.length; i++) {
    const element = imgElements[i];
    // 저장할 때는 모든 요소가 새로 추가되는 요소이기 때문에 먼저 id값을 숫자로 바꿔준다.
    var id_number = parseInt(element.id.split('_')[1]);

    element.setAttribute('id', id_number);
    formData.append('images[]', JSON.stringify(submitFiles[id_number-1].uploadfile));
    formData.append('id[]', element.id);
    formData.append('widget-type[]', element.getAttribute('widget-type'));
    element.removeAttribute('src');
    element.removeAttribute('widget-type');
    
  }




  // 이미지의 위치를 img 태그를 저장해서 텍스트에 표시해주기 위해서 innerHTML을 사용한다.
  let divContent = textBox.innerHTML;
  // 작성글의 길이를 확인하기 위해 textContent로 변수 선언
  let confirmText = textBox.textContent.trim().length
  console.log("텍스트 길이" + confirmText);

  formData.append("divContent", divContent);
  formData.append("confirmText", confirmText);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "saveBoardTextPHP.php", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log("POST 요청 성공");
        var response = xhr.responseText;
        console.log("response: " + response);
        // 응답 결과에 따라 처리
        if (response === "1") {
          location.reload();
        } else {
          console.log("response 오류");
          return;
        }
      } else {
        console.log("POST 요청 실패");
      }
    }
  };
  xhr.send(formData);
  // formData 전송 후 바로 닫힐 수 있도록 만들어 준다.
  modal.style.display = "none";
  console.log("saveBoardText() 끝");
}


// let listboxs = document.getElementsByClassName("MoreButtonView_button_menu");
// let listbox;
// let beforeListBox;

// for (var i = 0; i < listboxs.length; i++) {
//   listboxs[i].addEventListener("click", function (event) {
//     console.log("click listboxs 시작");
//     // 클릭한 게시글의 ID 가져오기

//     var buttonId = event.target.dataset.id;

//     if (listbox !== null) {
//       beforeListBox = listbox;
//     }

//     listbox = document.getElementById("DropdownOptionListView" + buttonId);
//     console.log("DropdownOptionListView" + buttonId);

//     console.log(listbox);

//     // 버튼에 대한 추가적인 처리 수행
//     console.log('버튼 ' + buttonId + '이 클릭되었습니다.');

//     var computedStyle = window.getComputedStyle(listbox);
//     var displayValue = computedStyle.getPropertyValue("display");

//     console.log("computedStyle : " + computedStyle);
//     console.log("displayValue : " + displayValue);


//     if (displayValue === "none") {
//       listbox.style.display = "block";
//       if (beforeListBox !== undefined && beforeListBox !== listbox) {
//         beforeListBox.style.display = "none";
//       }
//     } else {
//       listbox.style.display = "none";
//     }
//   });

// }



let listbox;
let beforeListBox;

function clickListBox(board_number) {

  console.log("click listboxs 시작");
  // 클릭한 게시글의 ID 가져오기

  if (listbox !== null) {
    beforeListBox = listbox;
  }

  listbox = document.getElementById("DropdownOptionListView" + board_number);
  console.log("DropdownOptionListView" + board_number);

  console.log(listbox);

  // 버튼에 대한 추가적인 처리 수행
  console.log('버튼 ' + board_number + '이 클릭되었습니다.');

  var computedStyle = window.getComputedStyle(listbox);
  var displayValue = computedStyle.getPropertyValue("display");

  console.log("computedStyle : " + computedStyle);
  console.log("displayValue : " + displayValue);


  if (displayValue === "none") {
    listbox.style.display = "block";
    if (beforeListBox !== undefined && beforeListBox !== listbox) {
      beforeListBox.style.display = "none";
    }
  } else {
    listbox.style.display = "none";
  }
}


document.addEventListener("click", function (event) {
  // console.log("버튼과 드롭다운옵션리스트뷰 이외의 모든 곳 클릭시 닫기 시작");
  // 이벤트가 발생한 요소를 가리키는 속성
  var targetElement = event.target;
  var buttonId = event.target.dataset.id;
  let listboxElements = document.querySelectorAll('[role="listbox"]');


  for (let i = 0; i < listboxElements.length; i++) {
    let listbox = listboxElements[i];
    // console.log("listbox : " + listbox);
    // console.log(targetElement);
    // event.stopPropagation();

    if (!targetElement.closest("#DropdownOptionListView" + buttonId) && !targetElement.closest("#MoreButtonView_button_menu" + buttonId)) {
      listbox.style.display = "none";
      // console.log("버튼과 드롭다운옵션리스트뷰 이외의 모든 곳 클릭시 닫기 if문");
    }
  }

});


// 수정하기
let ModifyModal = document.getElementById("ModifyModal");
let ModifytextBox = document.getElementById('Modify_wevEditor');
let saved_contents;
let modifying_board_number;

// 수정 modal 오픈 후 set text를 위한 함수
function openModifyPostModal(board_number) {
  ModifyModal.style.display = "flex";

  console.log("수정버튼 누를 때 모달 열림? " + modal.style.display);
  var formData = new FormData();
  formData.append("board_number", board_number);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "setModifyContents.php", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log("POST 요청 성공");
        console.log("수정 post 요청 성공 후 모달 열림? " + modal.style.display);
        var response = xhr.responseText;
        console.log("response: " + response);
        // 응답 결과에 따라 처리
        var post = JSON.parse(xhr.responseText);
        let text = post.contents;
        ModifytextBox.innerHTML = text;
        saved_contents = ModifytextBox.textContent.trim();
        modifying_board_number = post.board_number;
      } else {
        console.log("POST 요청 실패");
      }
    }
  };
  xhr.send(formData);
}

let modify_modal_submit_btn = document.getElementById('Modify_Modal_submit_btn');

ModifytextBox.addEventListener('input', function () {
  let images = ModifytextBox.getElementsByTagName('img');

  console.log(ModifytextBox.textContent.trim());
  console.log(saved_contents);

  if (ModifytextBox.textContent.trim() !== '' && ModifytextBox.textContent.trim() !== saved_contents && ModifytextBox.textContent.trim().length < 10000) {
    modify_modal_submit_btn.disabled = false;
  } else if (ModifytextBox.textContent.trim().length > 10000) {
    modify_modal_submit_btn.disabled = true;
    alert("게시글은 9,999자까지만 작성할 수 있습니다.");
  } else if (images.length > 0) {
    modify_modal_submit_btn.disabled = false;
  } else {
    modify_modal_submit_btn.disabled = true;
  }
});


// 이미지 여부에 따라서 수정이 달라지게 됨.
// 새로 추가한 이미지는 src 속성에서 base64 형식으로 보이기 때문에 src 속성값을 확인 한 뒤 저장한다.
// php에서 DB 안에 같은 id 값이 있는지 여부 확인 후 update 하거나 새로 저장할 것.
function saveModifiedPost() {
  console.log("saveModifiedPost() 시작");

  let formData = new FormData();

  // 이미지 태그의 src 속성 비우기
  // 텍스트 박스 안의 모든 img 태그 가져오기
  imgElements = ModifytextBox.querySelectorAll('img');

  // 

  //for문으로 img태그의 갯수만큼 반복해서 src속성을 삭제해준다.
  for (let i = 0; i < imgElements.length; i++) {
    const element = imgElements[i];
    // 만약 img 태그 요소가 새로 추가 되어서 'newAttachment_'라는 단어가 있으면 formdata에 추가해준다.

    console.log("흠........." + element.id.split('_')[0]);

    // 만약 base64라는 단어가 src에 있다면 true가 되어 if문 안의 코드가 동작한다.
    if (element.id.split('_')[0] == 'newAttachment') {
      console.log("뉴어탯치먼트 if문 실행됨? =====");
      // id 속성값을 함께 추가해준다.

      for (let x = 0; x < submitFiles.length; x++) {
        const submitFile = submitFiles[x];
        if (submitFile.id == element.id.split('_')[1]) {
          // json 문자열로 객체를 변환해서 보낸다.
          formData.append('images[]', JSON.stringify(submitFile.uploadfile));
        }
      }
      
      formData.append('id[]', parseInt(element.id.split('_')[1]));
      formData.append('widget-type[]', element.getAttribute('widget-type'));
      element.setAttribute('id', parseInt(element.id.split('_')[1]));
      element.removeAttribute('src');
      element.removeAttribute('widget-type');
    }
    // 텍스트 저장을 위해서 img태그의 src 속성값을 삭제해준다.
    element.removeAttribute('src');
  }
  

  // 이미지의 위치를 img 태그를 저장해서 텍스트에 표시해주기 위해서 innerHTML을 사용한다.
  let divContent = ModifytextBox.innerHTML;
  // 작성글의 길이를 확인하기 위해 textContent로 변수 선언
  let confirmText = ModifytextBox.textContent.trim().length

  formData.append("board_number", modifying_board_number);
  formData.append("divContent", divContent);
  formData.append("confirmText", confirmText);


  for (var pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "modifyBoardTextPHP.php", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log("POST 요청 성공");
        var response = xhr.responseText;
        console.log("response: " + response);
        // 응답 결과에 따라 처리
        if (response === "1") {
          location.reload();
        } else {
          console.log("response 오류");
          return;
        }
      } else {
        console.log("POST 요청 실패");
      }
    }
  };
  xhr.send(formData);
  ModifyModal.style.display = "none";

  console.log("saveModifiedPost() 끝");
}

let modifyPostModal = document.getElementById("modifyConfirmPostModal");

function returnBoardNotModify() {
  modifyPostModal.style.display = "flex";
}

function returnModifyModal() {
  modifyPostModal.style.display = "none";
}

function closeModifyConfirmModal() {
  modifyPostModal.style.display = "none";
  ModifyModal.style.display = "none";
}

let deletePostModal = document.getElementById("deletePostModal");

function closeDeletePostModal() {
  deletePostModal.style.display = "none";
}

let deletePost_board_number;
function openDeletePostModal(board_number) {

  console.log("board_number :" + board_number);
  deletePost_board_number = board_number;
  deletePostModal.style.display = "flex";
}

function completeDeletedPost() {
  let formData = new FormData();

  console.log(deletePost_board_number);
  formData.append("board_number", deletePost_board_number);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "deletePost.php", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log("POST 요청 성공");
        var response = xhr.responseText;
        console.log(response);
        // 응답 결과에 따라 처리
        if (response === "1") {
          location.reload();
        } else {
          console.log("response 오류");
          return;
        }
      } else {
        console.log("POST 요청 실패");
      }
    }
    // form.submit();
  };
  xhr.send(formData);
}


function saveTemporarySaveFile(files) {
  console.log(files);

  var formData = new FormData();
  // 'files'라는 이름으로 파일 데이터를 추가합니다.

  for (var i = 0; i < files.length; i++) {
    formData.append('files[]', files[i]);
  }

  for (var pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "upload_image.php", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log("POST 요청 성공");
        // 응답 결과에 따라 처리
        var temp_img = JSON.parse(xhr.responseText);
        for (let i = 0; i < temp_img.length; i++) {
          const element = temp_img[i];
          console.log("엠프티 확인" + element["videodestinationPath"] !== "undefined");
          if (typeof element["videodestinationPath"] !== "undefined") {
            // 동영상의 썸네일을 php에서 만들어서 저장해주었기 때문에 reader를 쓰지않고 주소값을 쓰도록 한다.
            uploadFiles.push(element);
            console.log('업로드파일 destinationPath'+uploadFiles[i]);
            const item_btn = document.getElementById('thumbnail_item_btn');
            const preview_content = document.getElementById('thumbnail_content');
            changeImage(preview_content,item_btn, element['destinationPath']);
          }else{
            uploadFiles.push(element);
            const item_btn = document.getElementById('preview_item_btn');
            const preview_content = document.getElementById('image_content'); // 요소를 추가할 컨테이너 선택 (원하는 대상에 맞게 변경)
            changeImage(preview_content, item_btn, element['destinationPath']);
          }
        }
      } else {
        console.log("POST 요청 실패");
      }
    }
  };
  xhr.send(formData);
}

function createPreviewItem(file) {
  // 새로운 요소 생성
  const previewItem = document.createElement('div');
  previewItem.classList.add('preview_item');
  previewItem.setAttribute('data-status', 'DONE');

  const div = document.createElement('div');
  div.style.width = '100%';
  div.style.height = '100%';

  const img = document.createElement('img');
  img.classList.add('thumbnail');
  img.setAttribute('src', file);
  img.alt = '';

  const deleteArea = document.createElement('div');
  deleteArea.classList.add('delete_area');

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.classList.add('delete');

  const deleteSpan = document.createElement('span');
  deleteSpan.classList.add('blind');
  deleteSpan.textContent = 'delete';

  const deleteSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  deleteSvg.setAttribute('width', '14');
  deleteSvg.setAttribute('height', '14');
  deleteSvg.setAttribute('viewBox', '0 0 14 15');
  deleteSvg.setAttribute('fill', 'none');

  const deletePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  deletePath.setAttribute('fill-rule', 'evenodd');
  deletePath.setAttribute('clip-rule', 'evenodd');
  deletePath.setAttribute('d', 'M0.848542 0.848542C0.379913 1.31717 0.379913 2.07697 0.848543 2.5456L5.5926 7.28966L0.861068 12.0212C0.392439 12.4898 0.392438 13.2496 0.861068 13.7183C1.3297 14.1869 2.0895 14.1869 2.55812 13.7183L7.28966 8.98672L11.8794 13.5765C12.348 14.0451 13.1078 14.0451 13.5765 13.5765C14.0451 13.1078 14.0451 12.348 13.5765 11.8794L8.98672 7.28966L13.589 2.68739C14.0576 2.21876 14.0576 1.45896 13.589 0.990331C13.1204 0.521702 12.3606 0.521703 11.8919 0.990332L7.28966 5.5926L2.5456 0.848542C2.07697 0.379913 1.31717 0.379913 0.848542 0.848542Z');
  deletePath.setAttribute('fill', 'white');

  deleteSvg.appendChild(deletePath);
  deleteButton.appendChild(deleteSpan);
  deleteButton.appendChild(deleteSvg);
  deleteArea.appendChild(deleteButton);
  div.appendChild(img);
  previewItem.appendChild(div);
  previewItem.appendChild(deleteArea);

  return previewItem;
}

// 이미지 변경 시 호출되는 함수
function changeImage(preview_content, item_btn, dataURL) {

  // 새로운 요소 생성
  const newPreviewItem = createPreviewItem(dataURL);

  // 생성한 요소를 적절한 위치에 추가
  // const preview = createPreviewItem(event, file);
  preview_content.insertBefore(newPreviewItem, item_btn);
}



// 이미지 선택시 change 이벤트가 일어나면 실행되는 함수
function getImageFiles(event) {
  console.log("getImageFiles() 시작");

  // 4-2. 4-1에서 가져온 값을 변수를 선언해서 할당한다.
  // inputimageElement에서 이미지 파일 리스트를 다시 file_list에 저장한다.
  // = inputimageElement.files;
  let files = event.currentTarget.files; // 파일 리스트가 출력이 된다.
  console.log(files.length);

  // 업로드 되는 파일들을 하나하나 저장하기 위해 선언한 배열로 선언한 변수
  saveTemporarySaveFile(files);


  // [...files].forEach(file => {
  //   // 4-3. input tag 객체에 뭐가 들어있는지 확인한다.
  //   // file == files 배열 안의 파일 요소, for문을 돌면서 하나씩 꺼내는 요소이다.
  //   console.log(file);
  //     // file API, File or Blob 객체를 이용해서 파일의 내용을 읽어내고 컴퓨터에 저장이 가능하게 만든다.
  //     // reader라는 변수에 초기화한 FileReader()를 할당한다.
  //     const reader = new FileReader();
  //     // 읽기 동작이 성공적으로 완료 될 때 발생하는 이벤트 핸들러
  //     reader.onload = (event) => {
  //       console.log("onload 성공?");
  //       const dataURL = event.target.result;
  //       console.log("데이터 가져오기 성공:", dataURL);
  //       // for문 밖에서 선언한 배열에 push로 배열 끝에 요소들을 추가해준다.
  
  //       submitFiles.push(file);
  //       console.log("업로드파일길이" + uploadFiles.length + "마지막값" + uploadFiles[uploadFiles.length - 1]);

  //       // 4-5. 이미지를 ‘이미지 쓰기’ 모달에 띄워준다.
  //       // changeImage(dataURL);
  //       // 파일을 선택 한 후 preview가 이미지 추가 창에 떠야 함
  //       // 이미지 추가 창을 flex로 설정한다.
        
  //     };

  //     reader.onerror = function (event) {
  //       console.error("데이터 가져오기 실패:", event.target.error);
  //     };

  //     // 성공하면 onload 실패시 onerror 이벤트 핸들러가 실행이 된다.
  //     reader.readAsDataURL(file);


      // 이미지 파일이 같아도 중복해서 들어갈 수 있도록 이벤트를 초기화해주도록 한다.
      // 4-6. 이미지 쓰기 모달에서 ‘+’버튼을 누르면 앞의 동작이 반복이 되서 이미지 추가가 더 될 수 있도록 만들어 준다. 이미지는 10개까지 추가하도록 한다.
      
    
  // });
  previewPhotoModal.style.display = "flex";
  event.currentTarget.value = '';
  console.log("getImageFiles() 끝");
}

// 4-1. HTML input 태그(type이 file이고 accept속성이 image/*며 id가 ape)를 자바스크립트로 HTML의 태그의 id값이 ape인지 확인해서 가져온다.
// 유저가 올린 이미지를 가져온다.
// HTML에서 id가 ape인 input태그 객체를 가져온다.
let inputimageElement = document.getElementById("ape");

// 이미지 파일의 요소가 변경이 되었을 때 change 이벤트가 발생하게 된다.
// 이벤트 발생시 getImageFiles 함수가 시작이 된다.
inputimageElement.addEventListener('change', getImageFiles);

// 이벤트 발생한 타겟의 파일을 files 변수에 할당한다.
// files를 console.log()를 통해서 출력해본다.

// 이미지 추가 모달
let previewPhotoModal = document.getElementById("previewPhotoModal");

// 이미지 추가 삭제
function closeAddImageModal() {
  console.log("closeAddImageModal 시작")
  previewPhotoModal.style.display = "none";
  uploadFiles = [];
  deletePreview(preview_content);
}


let preview_content = document.getElementById("image_content"); // 요소를 추가할 컨테이너 선택 (원하는 대상에 맞게 변경)

// 이미지 추가 확인 버튼, 이미지가 textbox로 넘어가게 된다.
// 4-7. 이미지 쓰기에서 확인을 누르면 에디터 화면에 이미지들이 뜨도록 만든다.
function confirmAddImageModal() {
  if (textBox.textContent.trim() === "위버스에 남겨보세요...") {
    textBox.textContent = '';
  }

  previewPhotoModal.style.display = "none";

  console.log("업로드파일" + uploadFiles.length);

  for (let i = 0; i < uploadFiles.length; i++) {
    if (modal.style.display === "flex") {
      let images = textBox.getElementsByTagName('img');
      const uploadFilesElement = uploadFiles[i]['destinationPath'];
      const img = document.createElement('img');
      img.setAttribute('src', uploadFilesElement);
        if (images.length === 0) {
          // img.setAttribute('id', 1);
          img.setAttribute('id', 'newAttachment_'+1);
          submitFiles.push({id: 1, uploadfile : uploadFiles[i]});
          img.setAttribute('widget-type', 'photo');
        } else {
          // img.setAttribute('id', images.length + 1);
          img.setAttribute('id', 'newAttachment_' + (images.length + 1));
          submitFiles.push({id: (images.length + 1), uploadfile : uploadFiles[i]});
          img.setAttribute('widget-type', 'photo');
        }
      textBox.appendChild(img);
      Modal_submit_btn.disabled = false;
    
    }else if (modal.style.display !== "flex" || modal.style.display === '') {
      let images = ModifytextBox.getElementsByTagName('img');
      const uploadFilesElement = uploadFiles[i]['destinationPath'];
      const img = document.createElement('img');
      img.setAttribute('src', uploadFilesElement);
        if (images.length === 0) {
          // img.setAttribute('id', 1);
          img.setAttribute('id', 'newAttachment_' + 1);
          submitFiles.push({id: 1, uploadfile : uploadFiles[i]});
          img.setAttribute('widget-type', 'photo');
        } else {
          // id 속성 값 중 가장 큰 값을 찾는다.
          let maxId = 0;
            for (let i = 0; i < images.length; i++) {
              let id = parseInt(images[i].getAttribute('id'));
              if (images[i].getAttribute('id').split('_')[0] == 'newAttachment') {
                id = parseInt(images[i].id.split('_')[1]);
              }
              
              if (!isNaN(id) && id > maxId) {
                maxId = id;
              }
            }


          
          // 가장 큰 값에 +1을 해서 겹치지 않도록 해준다.
          // img.setAttribute('id', maxId + 1);
          img.setAttribute('id', 'newAttachment_'+ (maxId + 1));
          submitFiles.push({id: (maxId + 1), uploadfile : uploadFiles[i]});
          img.setAttribute('widget-type', 'photo');

          // // 중복으로 값을 집어넣을 수 없는 Set 자료구조 생성
          // let usedIds = new Set();

          // // 이미지들의 id 값을 검사하여 사용된 id들을 추출
          // for (let i = 0; i < images.length; i++) {
          //   // parseInt로 문자열 중 정수로 변환 가능한 곳만 변환한다. 
          //   let id = parseInt(images[i].id); // id값 변환
          //   // isNAN() : 숫자가 아닌지 판별 아니라면 true, 맞다면 false
          //   if (!isNaN(id)) {
          //     // id가 숫자가 맞다면 set 자료구조에 id를 추가한다.
          //     usedIds.add(id);
          //   }
          // }
          
          // // 사용되지 않은 id를 찾아 새로운 이미지 태그에 할당
          // // 무한 루프 구문, 가운데의 조건 구문이 생략되었다.
          // for (let id = 1; ; id++) {
          //   // 만약 usedIds가 같은 값을 가지고 있지 않다면 id를 추가하고 break한다.
          //   if (!usedIds.has(id)) {
          //     img.setAttribute('id', id);
          //     break;
          //   }
          // }
        }
      // textBox에 새로운 이미지 추가
      ModifytextBox.appendChild(img);
      modify_modal_submit_btn.disabled = false;
    }
  }
  deletePreview(preview_content);
  uploadFiles = [];

  // 등록 버튼 활성화
  
}

function deletePreview(preview_content) {
  // querySelector는 일치하는 첫번째 요소만 가져오고 getElementsByClassName은 모든 요소를 가져옴
  // 기존의 요소 삭제
  const previewItems = document.getElementsByClassName('preview_item');
  const previewItemsArray = Array.from(previewItems);

  for (let i = 0; i < previewItemsArray.length; i++) {
    let previewItem = previewItemsArray[i];
    if (previewItem.dataset.status === 'DONE') {
      preview_content.removeChild(previewItem); // data-status가 DONE인 preview_item 삭제
    }
  }
}




// 2. 동영상 선택 후 확인을 누르면 동영상 프리뷰 화면이 뜨면서 어떤 영상을 추가했는지 확인 할 수 있음. jpg의 썸네일과 영상의 길이가 함께 뜬다.
// HTML input 태그(type이 file이고 accept속성이 "video/mp4, video/*"며 id가 ave)를 자바스크립트로 HTML의 태그의 id값이 ape인지 확인해서 가져온다.
let inputvideoElement = document.getElementById("ave");
let secondinputimage = document.getElementById("apei");
let secondinputvideo = document.getElementById("avei");

secondinputimage.addEventListener('change', getImageFiles);
secondinputvideo.addEventListener('change', getVideoFiles);


// 이미지 파일의 요소가 변경이 되었을 때 change 이벤트가 발생하게 된다.
// 이벤트 발생시 getImageFiles 함수가 시작이 된다.
inputvideoElement.addEventListener('change', getVideoFiles);

// 이벤트 발생한 타겟의 파일을 files 변수에 할당한다.
// files를 console.log()를 통해서 출력해본다.

// 동영상 추가 모달
let previewVideoModal = document.getElementById("previewVideoModal");

// 동영상이 추가되면 change 이벤트가 실행이 된다. 이벤트 실행 후 자동으로 실행될 함수
function getVideoFiles(event) {
  console.log("getVideoFiles() 시작");
  console.log("getVideoFiles() 시작 모달 열림? " + modal.style.display);

  // 4-2. 4-1에서 가져온 값을 변수를 선언해서 할당한다.
  // inputimageElement에서 이미지 파일 리스트를 다시 file_list에 저장한다.
  // = inputVideoElement.files;
  let files = event.currentTarget.files; // 파일 리스트가 출력이 된다.
  console.log(files.length);

  // 동영상 파일을 임시 저장한 후 썸네일을 추출해서 preview에서 보여준다.
  saveTemporarySaveFile(files);

  console.log("수정때 겟비디오 후 모달 열림? " + modal.style.display);

  previewVideoModal.style.display = "flex";
  event.currentTarget.value = '';
  console.log("getVideoFiles 끝");
}

// 동영상 프리뷰를 삭제하거나 추가하기 위한 변수 선언
let thumbnail_content = document.getElementById("thumbnail_content"); // 요소를 추가할 컨테이너 선택 (원하는 대상에 맞게 변경)

// 3. 동영상 추가 창에서 확인 클릭시 에디터에 영상 추가됨
// 이미지 추가 삭제
function closeAddVideoModal() {
  console.log("closeAddVideoModal 시작")
  previewVideoModal.style.display = "none";
  uploadFiles = [];
  deletePreview(thumbnail_content);
}

// 이미지 추가 확인 버튼, 이미지가 textbox로 넘어가게 된다.
// 4-7. 이미지 쓰기에서 확인을 누르면 에디터 화면에 이미지들이 뜨도록 만든다.
function confirmAddVideoModal() {
  if (textBox.textContent.trim() === "위버스에 남겨보세요...") {
    textBox.textContent = '';
  }
  previewVideoModal.style.display = "none";

  console.log("업로드파일" + uploadFiles.length);

  for (let i = 0; i < uploadFiles.length; i++) {
    if (modal.style.display === "flex") {
      let images = textBox.getElementsByTagName('img');
      // 등록 버튼을 누를 때 사용할 리스트에 데이터를 추가해준다.
      const uploadFilesElement = uploadFiles[i]['destinationPath'];
      const img = document.createElement('img');
      img.setAttribute('src', uploadFilesElement);
        if (images.length === 0) {
          img.setAttribute('id', 'newAttachment_'+1);
          submitFiles.push({id: 1, uploadfile : uploadFiles[i]});
          img.setAttribute('widget-type', 'video');
        } else {
          img.setAttribute('id', 'newAttachment_'+ (images.length + 1));
          submitFiles.push({id: (images.length + 1), uploadfile : uploadFiles[i]});
          img.setAttribute('widget-type', 'video');
        }
      textBox.appendChild(img);
      Modal_submit_btn.disabled = false;
    
    }else if (modal.style.display !== "flex" || modal.style.display === '') {
      let images = ModifytextBox.getElementsByTagName('img');
      const uploadFilesElement = uploadFiles[i]['destinationPath'];
      const img = document.createElement('img');
      img.setAttribute('src', uploadFilesElement);
        if (images.length === 0) {
          // img.setAttribute('id', 1);
          img.setAttribute('id', 'newAttachment_'+ 1);
          submitFiles.push({id: 1, uploadfile : uploadFiles[i]});
          img.setAttribute('widget-type', 'video');
        } else {
          // id 속성 값 중 가장 큰 값을 찾는다.
          let maxId = 0;
            for (let i = 0; i < images.length; i++) {
              let id = parseInt(images[i].getAttribute('id'));
              if (images[i].getAttribute('id').split('_')[0] == 'newAttachment') {
                id = parseInt(images[i].id.split('_')[1]);
              }
              
              if (!isNaN(id) && id > maxId) {
                maxId = id;
              }
            }
            
          // 가장 큰 값에 +1을 해서 겹치지 않도록 해준다.
          // img.setAttribute('id', maxId + 1);
          img.setAttribute('id', 'newAttachment_'+ (maxId + 1));
          // 파일구별을 위해 id값 추가
          submitFiles.push({id: (maxId + 1), uploadfile : uploadFiles[i]});
          img.setAttribute('widget-type', 'video');
        }
      // textBox에 새로운 이미지 추가
      ModifytextBox.appendChild(img);
      modify_modal_submit_btn.disabled = false;
      

    }else{
    }
  }
  
  deletePreview(thumbnail_content);
  // submitFiles에 추가해줘서 데이터는 남아있기 때문에 preview 때 사용하는 uploadFiles를 비워준다.
  // 만약 비워주지 않으면 동영상을 다시 추가했을 때 이전에 추가했던 데이터가 중복으로 올라가게 된다.
  uploadFiles = [];

}

// 좋아요 버튼 클릭시 색이 바뀌는 함수

// let emotion_btns = document.getElementsByClassName("EmotionButtonView_button_emotion");
// let emotion_btn;
// let before_emotion_btn;

// for (var i = 0; i < emotion_btns.length; i++) {
//   emotion_btns[i].addEventListener("click", function (event) {
//     console.log("emotion_btns 시작");
//     // 클릭한 게시글의 ID 가져오기

//     var buttonId = event.target.dataset.id;

//     if (emotion_btn !== null) {
//       before_emotion_btn = emotion_btn;
//     }

//     emotion_btn = document.getElementById("DropdownOptionListView" + buttonId);
//     console.log("DropdownOptionListView" + buttonId);

//     console.log(emotion_btn);

//     // 버튼에 대한 추가적인 처리 수행
//     console.log('버튼 ' + buttonId + '이 클릭되었습니다.');

//     var computedStyle = window.getComputedStyle(emotion_btn);
//     var displayValue = computedStyle.getPropertyValue("display");

//     console.log("computedStyle : " + computedStyle);
//     console.log("displayValue : " + displayValue);


//     if (displayValue === "none") {
//       emotion_btn.style.display = "block";
//       if (before_emotion_btn !== undefined && before_emotion_btn !== emotion_btn) {
//         before_emotion_btn.style.display = "none";
//       }
//     } else {
//       emotion_btn.style.display = "none";
//     }
//   });

// }

function changeMaximumLikes(board_number) {
  console.log("changeMaximumLikes() 시작");
  // 버튼 클릭시 버튼의 색이 바뀐다. 하얀색 -> 컬러 전체 좋아요 +1
  // 컬러 -> 하얀색 전체 좋아요 -1
  // 먼저 버튼의 색이 바뀐 후 전체 좋아요 수가 바뀌게 된다.
  // 좋아요 DB에 저장을 하기 위해서는 board_number와 user_number가 필요하다.

  let button = document.getElementById('like_btn' + board_number);

  // POST로 보낼 formData
  let formData = new FormData();
  formData.append("board_number", board_number);
  
  // 버튼에 liked 클래스가 있는지 확인하기. 이 클래스가 없다면 클릭시 컬러버튼이 되면서 이 유저의 좋아요를 포함한 최대 좋아요 수가 보여야 한다.
  if (!button.classList.contains('liked')) {
    console.log("버튼 컬러");
    // 버튼의 색이 컬러로 변하게 된다.
    button.classList.add('liked');
    // formData에 true, false값을 넣어서 버튼 상태를 확인하고 DB생성 여부를 결정하도록 만든다.
    formData.append('is_button', true);
    
  }else{
    console.log("버튼 흰색");
    // 있다면 클릭시 흰색버튼이 뜨면서 이 유저는 좋아요를 누르지 않은 모습이 된다.
    // 버튼의 색이 흰색으로 변하게 된다.
    button.classList.remove('liked');
    // formData에 true, false값을 넣어서 버튼 상태를 확인하고 DB생성 여부를 결정하도록 만든다.
    formData.append('is_button', false);
  }

  // 좋아요를 누른 유저의 정보가 DB에 저장이 되어야 한다.
  // 최대 좋아요는 불러오는 구조가 같기 때문에 같은 함수를 사용하도록 한다.

  for (var pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "update_likes.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log("POST 요청 성공");
        var response = xhr.responseText;
        console.log("response: " + response);
        // 응답 결과에 따라 처리
        if (response !== "") {
          let emotion_btn = document.getElementById("EmotionButtonView_button_emotion" + board_number);
          let textNode = emotion_btn.lastChild;
          if (textNode.nodeType === Node.TEXT_NODE) {
            if (response === '0') {
              textNode.textContent = null;
            }else{
              textNode.textContent = response;
            }
          }
          // resetLikes(board_number);
          // location.reload();
          console.log("changeMaximumLikes() 끝");
        } else {
          console.log("response 오류");
          return;
        }
      } else {
        console.log("POST 요청 실패");
      }
    }
  };
  xhr.send(formData);
}

// // 최대 likes를 다시 조회하기 위한 변수
// function resetLikes(board_number) {

//   let formData = new FormData();
//   formData.append("board_number", board_number);

//   var xhr = new XMLHttpRequest();
//   xhr.open("POST", "read_all_Likes.php", true);
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === XMLHttpRequest.DONE) {
//       if (xhr.status === 200) {
//         console.log("POST 요청 성공");
//         var response = xhr.responseText;
//         console.log("response: " + response);
//         // 응답 결과에 따라 처리
//         let emotion_btn = document.getElementById("EmotionButtonView_button_emotion" + board_number);
//         let textNode = emotion_btn.lastChild;
//         if (textNode.nodeType === Node.TEXT_NODE) {
//           if (response === '0') {
//             textNode.textContent = null;
//           }else{
//             textNode.textContent = response;
//           }
//         }
//       } else {
//         console.log("POST 요청 실패");
//       }
//     }
//   };
//   xhr.send(formData);
// }

// (() => {
//   // 
//   // const ul = document.querySelector('FeedPostListView_list_wrap');
//   // let li;
//   // let count = ul.children.length;
//   console.log('board_row' + board_rows);

// // for (let i = 0; i < array.length; i++) {
// //   const element = array[i];
  
// // }

var scrollCount = 0;
var scrolled = false;

  document.addEventListener('scroll', () => {
  //window height + window scrollY 값이 document height보다 클 경우,
  // 현재 화면의 높이와 스크롤된 위치의 합 >= 문서 전체 높이

  const element = document.querySelector('.GlobalLayoutView_layout_container');
  // element 요소의 높이 계산
  const height = element.getBoundingClientRect().height;

  if ((window.innerHeight + window.scrollY) >= height && scrolled === false) {
    // 문서의 끝에 스크롤이 도달하면 새로운 요소 생성해서 추가하고 count 변수 값 설정
    scrolled = true;
    scrollCount++;

    console.log('scrollCount 횟수' + scrollCount);
    console.log('스크롤됨');
    console.log('window.innerHeight : '+ window.innerHeight);
    console.log('window.scrollY : '+ window.scrollY);
    console.log('document.body.offsetHeight : '+ height);

    const listviewItemElements = document.querySelectorAll('.PostListItemView_post_item');
    // 요소의 가장 마지막 태그의 뒤쪽에 추가해줄 것
    const lastItemElement = listviewItemElements[listviewItemElements.length - 1];

    var lastItemNumber = lastItemElement.dataset.id

    console.log('lastItemElement : ' + lastItemElement.dataset.id);
  
    let formData = new FormData();
    
    formData.append("lastItemNumber", lastItemNumber);
    formData.append("scrollCount", scrollCount);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "readNewBoardData.php", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log("POST 요청 성공");
          var posts = JSON.parse(xhr.responseText);
          // 응답 결과에 따라 처리
          if (posts !== "" && posts !== 0) {
            // json에서 데이터를 하나씩 뽑아와서 추가해준다.
            posts.forEach(post => {
              // 데이터를 불러와서 요소 생성 후 추가해줄 태그 찾기
              const listviewItemElements = document.querySelectorAll('.PostListItemView_post_item');
              // 요소의 가장 마지막 태그의 뒤쪽에 추가해줄 것
              const lastItemElement = listviewItemElements[listviewItemElements.length - 1];
              new_board_post = makePost(post);
              lastItemElement.insertAdjacentElement('afterend', new_board_post);
            });
            scrolled = false;
            
            // 모두 스크롤했는지 여부 확인. 만약 다 불러왔다면 더 이상 스크롤해도 불러와지지 않는다.
            if (posts.length != 20) {
              scrolled = true;
            }

          } else {
            console.log("posts 오류");
            return;
          }
        } else {
          console.log("POST 요청 실패");
        }
      }
    };
    xhr.send(formData);
    }else{

    }

  });

// 게시글 보이도록 만드는 함수
// json 형식의 $post데이터를 받아서 사용한다.
function makePost(post) {
// <div> 요소 생성
var divElement = document.createElement('div');
divElement.id = 'PostListItemView_post_item' + post.id;
divElement.className = 'PostListItemView_post_item';
divElement.setAttribute('data-id', post.id);

// 첫 번째 중첩 <div> 요소 생성
var firstDivElement = document.createElement('div');
firstDivElement.className = 'PostHeaderView_header_wrap PostHeaderView_-header_type_feed';

divElement.appendChild(firstDivElement);

// 중첩 <div> 요소 내부 첫 번째 중첩 <div> 요소 생성
var nestedDivElement1 = document.createElement('div');
nestedDivElement1.className = 'PostHeaderView_group_wrap PostHeaderView_-profile_area';

firstDivElement.appendChild(nestedDivElement1);

// 중첩 <div> 요소 내부 첫 번째 중첩 <a> 요소 생성
var nestedAnchorElement = document.createElement('a');
nestedAnchorElement.className = 'PostHeaderView_thumbnail_wrap';

nestedDivElement1.appendChild(nestedAnchorElement);

// 중첩 <a> 요소 내부 <div> 요소 생성
var nestedDivElement2 = document.createElement('div');
nestedDivElement2.className = 'ProfileThumbnailView_thumbnail_area';
nestedDivElement2.style.width = '36px';
nestedDivElement2.style.height = '36px';

nestedAnchorElement.appendChild(nestedDivElement2);

// 중첩 <div> 요소 내부 <div> 요소 내부 첫 번째 중첩 <div> 요소 생성
var nestedDivElement3 = document.createElement('div');
nestedDivElement3.className = 'ProfileThumbnailView_thumbnail_wrap ProfileThumbnailView_-has_border';

nestedDivElement2.appendChild(nestedDivElement3);


// 중첩 <div> 요소 내부 <div> 요소 내부 첫 번째 중첩 <div> 요소 내부 <div> 요소 생성
var nestedDivElement4 = document.createElement('div');
nestedDivElement4.style.aspectRatio = 'auto 36 / 36';
nestedDivElement4.style.contentVisibility = 'auto';
nestedDivElement4.style.containIntrinsicSize = '36px';
nestedDivElement4.style.width = '100%';
nestedDivElement4.style.height = '100%';

nestedDivElement3.appendChild(nestedDivElement4);


// 중첩 <div> 요소 내부 <div> 요소 내부 첫 번째 중첩 <div> 요소 내부 <div> 요소 내부 <img> 요소 생성
var nestedImgElement = document.createElement('img');
nestedImgElement.className = 'ProfileThumbnailView_thumbnail';
nestedImgElement.src = 'image/icon_empty_profile.png';
nestedImgElement.width = '36';
nestedImgElement.height = '36';
// 요소 추가
nestedDivElement4.appendChild(nestedImgElement);

// 중첩 <div> 요소 내부 첫 번째 중첩 <div> 요소 내부 두 번째 중첩 <div> 요소 생성
var nestedDivElement5 = document.createElement('div');
nestedDivElement5.className = 'PostHeaderView_text_wrap';

// 중첩 <div> 요소 내부 첫 번째 중첩 <div> 요소 내부 두 번째 중첩 <div> 요소 내부 <a> 요소 생성
var nestedAnchorElement2 = document.createElement('a');
nestedAnchorElement2.href = '';

// 중첩 <div> 요소 내부 첫 번째 중첩 <div> 요소 내부 두 번째 중첩 <div> 요소 내부 <a> 요소 내부 <div> 요소 생성
var nestedDivElement6 = document.createElement('div');
nestedDivElement6.className = 'PostHeaderView_nickname_wrap';

var strongElement = document.createElement('strong');
strongElement.id = 'PostHeaderView_nickname' + post.id;
strongElement.className = 'PostHeaderView_nickname';
strongElement.textContent = post.write_user_nickname;

nestedDivElement6.appendChild(strongElement);
nestedAnchorElement2.appendChild(nestedDivElement6);
nestedDivElement5.appendChild(nestedAnchorElement2);
nestedDivElement1.appendChild(nestedDivElement5);

// <div> 요소 생성
var infoWrapDiv = document.createElement('div');
infoWrapDiv.className = 'PostHeaderView_info_wrap';

// <span> 요소 생성
var spanElement = document.createElement('span');
spanElement.id = 'PostHeaderView_date' + post.id;
spanElement.className = 'PostHeaderView_date';

spanElement.textContent = post.date_time;

nestedDivElement5.appendChild(infoWrapDiv);
infoWrapDiv.appendChild(spanElement);

// 본문 html 태그 만드는 함수

// <div> 요소 생성
var contentWrapDiv = document.createElement('div');
contentWrapDiv.className = 'PostListItemView_content_wrap';

// 첫 번째 <div> 요소 생성
var contentItemDiv1 = document.createElement('div');
contentItemDiv1.className = 'PostListItemView_content_item';

// 두 번째 <div> 요소 생성
var contentItemDiv2 = document.createElement('div');
contentItemDiv2.className = 'PostListItemView_content_item PostListItemView_-text_preview';

// <div> 요소 생성
var textPreviewDiv = document.createElement('div');
textPreviewDiv.id = 'PostPreviewTextView_text' + post.id;
textPreviewDiv.className = 'PostPreviewTextView_text';
textPreviewDiv.onclick = function() {
    location.href = 'weverse_fanpost.php?board_number=' + post.id;
};
textPreviewDiv.innerHTML = post.contents;

// 요소들을 계층적으로 추가
contentItemDiv2.appendChild(textPreviewDiv);
contentWrapDiv.appendChild(contentItemDiv1);
contentWrapDiv.appendChild(contentItemDiv2);

divElement.appendChild(contentWrapDiv);


// <div> 요소 생성
var buttonWrapDiv = document.createElement('div');
buttonWrapDiv.className = 'PostListItemView_button_wrap';

// <div> 요소 생성
var groupWrapDiv = document.createElement('div');
groupWrapDiv.className = 'PostListItemView_group_wrap';

// <div> 요소 생성
var LikebuttonItemDiv = document.createElement('div');
LikebuttonItemDiv.className = 'PostListItemView_button_item';

// <button> 요소 생성
var buttonElement = document.createElement('button');
buttonElement.id = 'EmotionButtonView_button_emotion' + post.id;
buttonElement.type = 'button';
buttonElement.className = 'EmotionButtonView_button_emotion';
buttonElement.setAttribute('aria-pressed', 'false');
buttonElement.onclick = function() {
    changeMaximumLikes(post.id);
};

console.log('post.likes_row_count' + post.likes_row_count);
// 첨부된 PHP 파일을 포함하여 좋아요 수를 가져온다.
if (post.likes_row_count === 1) {
    // <svg> 요소 생성
    var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.id = 'like_btn' + post.id;
    svgElement.setAttribute('class', 'add_like liked');
    svgElement.setAttribute('width', '26');
    svgElement.setAttribute('height', '26');
    svgElement.setAttribute('viewBox', '0 0 26 26');
    svgElement.setAttribute('fill', 'none');

    // <span> 요소 생성
    var likesspanElement = document.createElement('span');
    likesspanElement.className = 'blind';
    likesspanElement.textContent = 'cheering';

    // 텍스트 노드 생성
    var textNode = document.createTextNode(post.cheering);

    // 요소들을 계층적으로 추가
    svgElement.appendChild(likesspanElement);
    buttonElement.appendChild(svgElement);
    buttonElement.appendChild(textNode);
} else {
    // <svg> 요소 생성
    var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.id = 'like_btn' + post.id;
    svgElement.setAttribute('class', 'add_like');
    svgElement.setAttribute('width', '26');
    svgElement.setAttribute('height', '26');
    svgElement.setAttribute('viewBox', '0 0 26 26');
    svgElement.setAttribute('fill', 'none');

    // <span> 요소 생성
    var likesspanElement = document.createElement('span');
    likesspanElement.className = 'blind';
    likesspanElement.textContent = 'cheering';

    // 텍스트 노드 생성
    // json에서 'null'이 아닌 null값을 넣어줬다면 꺼내서 비교시에도 null 그대로 비교해야함
    if (post.cheering === '0' || post.cheering === null) {
      var textNode = document.createTextNode('');
    }else{
      var textNode = document.createTextNode(post.cheering);
    }

    // 요소들을 계층적으로 추가
    buttonElement.appendChild(svgElement);
    buttonElement.appendChild(likesspanElement);
    buttonElement.appendChild(textNode);
}

// 요소들을 계층적으로 추가
LikebuttonItemDiv.appendChild(buttonElement);
groupWrapDiv.appendChild(LikebuttonItemDiv);
buttonWrapDiv.appendChild(groupWrapDiv);

divElement.appendChild(buttonWrapDiv);

// <div> 요소 생성
var CommentbuttonItemDiv = document.createElement('div');
CommentbuttonItemDiv.className = 'PostListItemView_button_item';

// <button> 요소 생성
var buttonElement = document.createElement('button');
buttonElement.type = 'button';
buttonElement.className = 'CommentButtonView_button_comment';

// <svg> 요소 생성
var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgElement.setAttribute('width', '26');
svgElement.setAttribute('height', '26');
svgElement.setAttribute('viewBox', '0 0 26 26');
svgElement.setAttribute('fill', 'none');

// <path> 요소 생성
var pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
pathElement.setAttribute('d', 'M22.7912 12.25C22.7912 6.98327 18.5168 2.7088 13.25 2.7088C7.98327 2.7088 3.7088 6.98327 3.7088 12.25C3.7088 16.2846 6.21678 19.7303 9.74976 21.1261C9.74976 21.1261 9.79338 21.1479 9.82609 21.1588C10.2295 21.3115 10.6439 21.4423 11.0692 21.5405C14.5258 22.4455 18.6258 22.2819 20.5995 21.9548C21.1338 21.8567 21.341 21.3878 21.0684 20.908C20.774 20.3846 20.3596 19.7522 20.2833 19.1851C20.0325 17.2769 22.7912 16.0229 22.7803 12.3591C22.7803 12.3264 22.7803 12.2936 22.7803 12.2609L22.7912 12.25Z');
pathElement.setAttribute('stroke', '#444444');
pathElement.setAttribute('stroke-width', '1.6');
pathElement.setAttribute('stroke-miterlimit', '10');

// <span> 요소 생성
var spanElement = document.createElement('span');
spanElement.className = 'blind';
spanElement.textContent = 'Leave a comment';

// 요소들을 계층적으로 추가
svgElement.appendChild(pathElement);
buttonElement.appendChild(svgElement);
buttonElement.appendChild(spanElement);
CommentbuttonItemDiv.appendChild(buttonElement);

groupWrapDiv.appendChild(CommentbuttonItemDiv);

// 수정/삭제 or 신고/차단 기능 추가
// <div class="PostListItemView_group_wrap"> 요소 생성
var groupWrapDiv2 = document.createElement('div');
groupWrapDiv2.className = 'PostListItemView_group_wrap';

// <div class="PostListItemView_button_menu_wrap"> 요소 생성
var buttonMenuWrapDiv = document.createElement('div');
buttonMenuWrapDiv.className = 'PostListItemView_button_menu_wrap';

// <div> 요소 생성
var innerDiv = document.createElement('div');

// <button> 요소 생성
var moreButton = document.createElement('button');
moreButton.type = 'button';
moreButton.id = 'MoreButtonView_button_menu' + post.id;
moreButton.className = 'MoreButtonView_button_menu';
moreButton.setAttribute('data-id', post.id);
moreButton.setAttribute('onclick', 'clickListBox(' + post.id + ')');

// <span> 요소 생성
var blindSpan = document.createElement('span');
blindSpan.className = 'blind';
blindSpan.textContent = 'Show More Content';

// <ul> 요소 생성
var dropdownOptionListUl = document.createElement('ul');
dropdownOptionListUl.id = 'DropdownOptionListView' + post.id;
dropdownOptionListUl.className = 'DropdownOptionListView_option_list DropdownOptionListView_dropdown-action';
dropdownOptionListUl.setAttribute('role', 'listbox');
dropdownOptionListUl.setAttribute('data-use-placement', 'true');
dropdownOptionListUl.setAttribute('data-placement', 'top');

// <li> 요소 생성
var optionItemLi = document.createElement('li');
optionItemLi.className = 'DropdownOptionListView_option_item';
optionItemLi.setAttribute('role', 'presentation');

if (post.user_number === post.write_user_number) {
  // "수정하기" 버튼 생성
  var editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.className = 'ContentMetaActionLayerView_button_item ContentMetaActionLayerView_-edit';
  editButton.setAttribute('onclick', 'openModifyPostModal(' + post.id + ')');
  editButton.textContent = '수정하기';

  // "삭제하기" 버튼 생성
  var deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'ContentMetaActionLayerView_button_item ContentMetaActionLayerView_-delete';
  deleteButton.setAttribute('onclick', 'openDeletePostModal(' + post.id + ')');
  deleteButton.textContent = '삭제하기';
  optionItemLi.appendChild(editButton);
  // 요소들을 계층적으로 추가
  dropdownOptionListUl.appendChild(optionItemLi);
  dropdownOptionListUl.appendChild(optionItemLi.cloneNode(false)).appendChild(deleteButton);
} else {
  // "신고하기" 버튼 생성
  var reportButton = document.createElement('button');
  reportButton.type = 'button';
  reportButton.className = 'ContentMetaActionLayerView_button_item ContentMetaActionLayerView_-report';
  reportButton.textContent = '신고하기';

  // "작성자 차단" 버튼 생성
  var blockButton = document.createElement('button');
  blockButton.type = 'button';
  blockButton.className = 'ContentMetaActionLayerView_button_item ContentMetaActionLayerView_-block';
  blockButton.textContent = '작성자 차단';

  optionItemLi.appendChild(reportButton);
  // 요소들을 계층적으로 추가
  dropdownOptionListUl.appendChild(optionItemLi);
  dropdownOptionListUl.appendChild(optionItemLi.cloneNode(false)).appendChild(blockButton);
}

moreButton.appendChild(blindSpan);
innerDiv.appendChild(moreButton);
innerDiv.appendChild(dropdownOptionListUl);
buttonMenuWrapDiv.appendChild(innerDiv);
groupWrapDiv2.appendChild(buttonMenuWrapDiv);

buttonWrapDiv.appendChild(groupWrapDiv2);

return divElement;

}