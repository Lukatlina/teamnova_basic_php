// 댓글을 작성하면 버튼이 활성화 되는 함수
let textarea = document.getElementById('CommentInputView_textarea');
let send_btn = document.getElementById('CommentInputView_send_button');

textarea.addEventListener('input', function() {
    if (textarea.value !== "") {
      console.log(textarea.value);
      send_btn.disabled = false;
    }else{
      console.log(textarea.value);
      send_btn.disabled = true;
    }
  });

// 댓글창에 텍스트를 입력하면 저장하는 함수

function saveCommentValue(board_number) {
  console.log("saveCommentValue() 시작");
  console.log(textarea.value);


  let formData = new FormData();
  formData.append("board_number", board_number);
  formData.append("textarea", textarea.value.trim());


  for (var pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
}

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "saveCommentText.php", true);

  xhr.onreadystatechange = function() {
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

console.log("saveCommentValue() 끝");
}

// 관련 내용 주석 달기
// let listboxs = document.getElementsByClassName("MoreButtonView_button_menu MoreButtonView_-comment MoreButtonView_-post");
// let listbox;
// let beforeListBox;

// for (var i = 0; i < listboxs.length; i++) {
//   listboxs[i].addEventListener("click", function(event) {
//     console.log("click listboxs 시작");
//     console.log("listbox 길이" + listboxs.length);
//     // 클릭한 댓글의 ID 가져오기
//     var buttonId = event.target.dataset.id;

//     if (listbox!==null) {
//       beforeListBox = listbox;
//     }

//     listbox = document.getElementById("CommentDropdownOptionListView"+buttonId);
//     console.log("CommentDropdownOptionListView"+buttonId);
//     console.log(listbox);

//   // 버튼에 대한 추가적인 처리 수행
//   console.log('버튼 ' + buttonId + '이 클릭되었습니다.');

//   var computedStyle = window.getComputedStyle(listbox);
//   var displayValue = computedStyle.getPropertyValue("display");

//   console.log("computedStyle : " + computedStyle);
//   console.log("displayValue : " + displayValue);


//   if (displayValue === "none") {
//     console.log("displayValue : none일때 시작" + displayValue);
//     listbox.style.display = "block";
//     console.log(listbox);
//     if (beforeListBox!==undefined && beforeListBox!==listbox) {
//       beforeListBox.style.display = "none";
//     }
//     console.log("displayValue : none일때 끝" + displayValue);
//   } else {
//     console.log("displayValue : block 일때 시작" + displayValue);
//     listbox.style.display = "none";
//     console.log("displayValue : block 일때 끝" + displayValue);
//   }
//   console.log("click listboxs 끝");
// });
// }

let listbox;
let beforeListBox;

function clickCommentListBox(comment_number) {
  // 클릭한 댓글의 ID 가져오기

  if (listbox!==null) {
    beforeListBox = listbox;
  }

  listbox = document.getElementById("CommentDropdownOptionListView"+comment_number);

  // 버튼에 대한 추가적인 처리 수행
  var computedStyle = window.getComputedStyle(listbox);
  var displayValue = computedStyle.getPropertyValue("display");

  if (displayValue === "none") {
    listbox.style.display = "block";
    if (beforeListBox!==undefined && beforeListBox!==listbox) {
      beforeListBox.style.display = "none";
    }
  } else {
    listbox.style.display = "none";
  }
}
    






// 버튼과 드롭다운옵션리스트뷰 이외의 곳을 클릭시 모든 드롭다운옵션리스트뷰가 닫히도록 만드는 함수
document.addEventListener("click", function(event) {
  // console.log("버튼과 드롭다운옵션리스트뷰 이외의 모든 곳 클릭시 닫기 시작");
  // 이벤트가 발생한 요소를 가리키는 속성
  var targetElement = event.target;
  var buttonId = event.target.dataset.id;
  let listboxElements = document.querySelectorAll('[role="listbox"]');


  for (let i = 0; i < listboxElements.length; i++) {
    let listbox = listboxElements[i];

    if (!targetElement.closest("#DropdownOptionListView"+buttonId) && !targetElement.closest("#MoreButtonView_button_menu"+buttonId)) {
      listbox.style.display = "none";
      // console.log("버튼과 드롭다운옵션리스트뷰 이외의 모든 곳 클릭시 닫기 if문");
    }
  }
});

let deleteCommentModal = document.getElementById("deleteCommentModal");

function closeDeleteCommentModal(){
  deleteCommentModal.style.display = "none";
}

let deletePost_comment_number;
function openDeleteCommentModal(comment_number){

  console.log("comment_number :" + comment_number);
  deletePost_comment_number = comment_number;
  deleteCommentModal.style.display = "flex";
}

function complteDeletedComment() {
  let formData = new FormData();

  console.log(deletePost_comment_number);
  formData.append("comment_number", deletePost_comment_number);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
}

var xhr = new XMLHttpRequest();
  xhr.open("POST", "deletePost.php", true);

  xhr.onreadystatechange = function() {
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
}


// // 대댓글 입력창에 텍스트 입력시 버튼 활성화
// // 대댓글 박스의 갯수를 먼저 확인한 후 각 대댓글 박스 버튼의 상태를 저장할 변수를 선언한다.
// let textarea_list = document.getElementsByClassName('ReplyViewerView_input_wrap');
// console.log(textarea_list.length);
// let ReplyCreateButton;
// let beforeReplyCreateButton;
// let ReplyText;

//   for (var i = 0; i < textarea_list.length; i++) {
//     textarea_list[i].addEventListener("input", function(event) {
//       console.log("input ReplyCreateButton 시작");
//       // 작성중인 대댓글의 ID 가져오기

//       var buttonId = event.target.dataset.id;

//       if (ReplyCreateButton!==null) {
//         beforeReplyCreateButton = ReplyCreateButton;
//       }

//       ReplyText = document.getElementById("ReplyInputView_textarea"+buttonId);
//       ReplyCreateButton = document.getElementById("ReplyInputView_send_button"+buttonId);

//       console.log("ReplyInputView_textarea"+buttonId);

//       console.log("텍스트 내용" + ReplyText.value);
//       console.log("버튼 상태" + ReplyCreateButton);

//     // 버튼에 대한 추가적인 처리 수행
//     console.log('버튼 ' + buttonId + '이 클릭되었습니다.');

//     if (ReplyText.value !== "") {
//       console.log(ReplyText.value);
//       console.log("대댓글버튼.disabled" + ReplyCreateButton.disabled);
//       ReplyCreateButton.disabled = false;
//       console.log("대댓글버튼.disabled" + ReplyCreateButton.disabled);
//     }else{
//       console.log(ReplyText.value);
//       console.log("대댓글버튼.disabled" + ReplyCreateButton.disabled);
//       ReplyCreateButton.disabled = true;
//       console.log("대댓글버튼.disabled" + ReplyCreateButton.disabled);
//     }
//     console.log("input ReplyCreateButton 끝");
//   });
// }

let ReplyCreateButton;
let beforeReplyCreateButton;
let ReplyText;

function saveButtonCheck(id) {

      console.log("input ReplyCreateButton 시작");
      // 작성중인 대댓글의 ID 가져오기



      if (ReplyCreateButton!==null) {
        beforeReplyCreateButton = ReplyCreateButton;
      }

      ReplyText = document.getElementById("ReplyInputView_textarea"+id);
      ReplyCreateButton = document.getElementById("ReplyInputView_send_button"+id);

      console.log("ReplyInputView_textarea"+id);

      console.log("텍스트 내용" + ReplyText.value);
      console.log("버튼 상태" + ReplyCreateButton);

    // 버튼에 대한 추가적인 처리 수행
    console.log('버튼 ' + id + '이 클릭되었습니다.');

    if (ReplyText.value !== "") {
      console.log(ReplyText.value);
      console.log("대댓글버튼.disabled" + ReplyCreateButton.disabled);
      ReplyCreateButton.disabled = false;
      console.log("대댓글버튼.disabled" + ReplyCreateButton.disabled);
    }else{
      console.log(ReplyText.value);
      console.log("대댓글버튼.disabled" + ReplyCreateButton.disabled);
      ReplyCreateButton.disabled = true;
      console.log("대댓글버튼.disabled" + ReplyCreateButton.disabled);
    }
    console.log("input ReplyCreateButton 끝");
  }




    




// 입력한 대댓글이 저장이 되도록 만든 함수
function saveReplyValue(board_number, reply_number) {
  console.log("saveReplyValue() 시작");

  let formData = new FormData();
  formData.append('board_number', board_number);
  formData.append('reply_number', reply_number);
  formData.append("textarea", ReplyText.value.trim());


  for (var pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
}

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "saveCommentText.php", true);

  xhr.onreadystatechange = function() {
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

console.log("saveCommentValue() 끝");
}



// 버튼 클릭시 댓글 작성할 수 있도록 만들기
// let comment_btn_view_list = document.getElementsByClassName('CommentButtonView_button_comment CommentButtonView_-comment -post');
// console.log(comment_btn_view_list[0]);

//   for (var i = 0; i < comment_btn_view_list.length; i++) {
//     comment_btn_view_list[i].addEventListener("click", function(event) {
//       console.log("input ReplyCreateButton 시작");
//       // 작성중인 대댓글의 ID 가져오기

//       // console.log("이벤트" +event.target.dataset);

//       // var buttonId1 = event.target.dataset.id;
//       // console.log("버튼1" + buttonId1);
//       // var buttonId2 = event.target.getAttribute('data-id');
//       // console.log("버튼2" +buttonId2);
//       var buttonId = event.target.dataset.id;

//       let replyViewer = document.getElementById("ReplyViewerView_input_wrap"+buttonId);

//       console.log("replyViewer"+buttonId);
//       console.log(replyViewer);

//       var computedStyle = window.getComputedStyle(replyViewer);
//       var displayValue = computedStyle.getPropertyValue("display");

//       console.log("코멘트 버튼 상태" + displayValue);

//     // 버튼에 대한 추가적인 처리 수행
//     console.log('버튼 ' + buttonId + '이 클릭되었습니다.');

//     if (displayValue === "none") {
//       replyViewer.style.display = "block";
//     } else {
//       replyViewer.style.display = "none";
//     }
//   });
// }


function clickWriteReply(id) {

  let replyViewer = document.getElementById("ReplyViewerView_input_wrap"+id);

  console.log("replyViewer"+id);
  console.log(replyViewer);

  var computedStyle = window.getComputedStyle(replyViewer);
  var displayValue = computedStyle.getPropertyValue("display");

  console.log("코멘트 버튼 상태" + displayValue);

  // 버튼에 대한 추가적인 처리 수행
  console.log('버튼 ' + id + '이 클릭되었습니다.');

  if (displayValue === "none") {
    replyViewer.style.display = "block";
  } else {
    replyViewer.style.display = "none";
  }
}








// 댓글과 대댓글에 좋아요를 하기 위한 함수
function changeCommentMaximumLikes(board_number, comment_number) {
  console.log("changeMaximumLikes() 시작");
  // 버튼 클릭시 버튼의 색이 바뀐다. 하얀색 -> 컬러 전체 좋아요 +1
  // 컬러 -> 하얀색 전체 좋아요 -1
  // 먼저 버튼의 색이 바뀐 후 전체 좋아요 수가 바뀌게 된다.
  // 좋아요 DB에 저장을 하기 위해서는 board_number와 user_number, comment_number가 필요하다.

  let comment_svg = document.getElementById('comment_like_btn' + comment_number);

  console.log('board_number : ' + board_number);
  console.log('comment_number : ' + comment_number);
  console.log('comment_svg' + comment_svg);

  // POST로 보낼 formData
  let formData = new FormData();
  formData.append("board_number", board_number);
  formData.append("comment_number", comment_number);
  
  // 버튼에 liked 클래스가 있는지 확인하기. 이 클래스가 없다면 클릭시 컬러버튼이 되면서 이 유저의 좋아요를 포함한 최대 좋아요 수가 보여야 한다.
  if (!comment_svg.classList.contains('liked')) {
    // 버튼의 색이 컬러로 변하게 된다.
    comment_svg.classList.add('liked');
    // formData에 true, false값을 넣어서 버튼 상태를 확인하고 DB생성 여부를 결정하도록 만든다.
    formData.append('is_button', true);
    
  }else{
    // 있다면 클릭시 흰색버튼이 뜨면서 이 유저는 좋아요를 누르지 않은 모습이 된다.
    // 버튼의 색이 흰색으로 변하게 된다.
    comment_svg.classList.remove('liked');
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
          let emotion_btn = document.getElementById("EmotionButtonView_button_emotion" + comment_number);
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
    // 버튼의 색이 컬러로 변하게 된다.
    button.classList.add('liked');
    // formData에 true, false값을 넣어서 버튼 상태를 확인하고 DB생성 여부를 결정하도록 만든다.
    formData.append('is_button', true);
    
  }else{
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
          let emotion_btn = document.getElementById("EmotionButtonView_button_emotion");
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



// 댓글 페이징
// 대댓글 유무에 따라서 생성되도록 만들기
var scrollCount = 0;
var scrolled = false;

// 696 0 505
const scrollableArea = document.querySelector('.CommentViewerView_scrollable_area');



scrollableArea.addEventListener('scroll', function() {
  // 스크롤 요소의 높이와 스크롤 위치를 가져옵니다.

  var scrollHeight = scrollableArea.scrollHeight;
  var scrollTop = scrollableArea.scrollTop;
  var clientHeight = scrollableArea.clientHeight;

  // 스크롤이 맨 아래로 이동했을 때 추가 데이터를 불러오는 조건을 설정합니다.
  if (scrollHeight - scrollTop === clientHeight && scrolled === false) {
    scrolled = true;
    scrollCount++;

    console.log('scrollCount 횟수' + scrollCount);
    console.log('스크롤됨');
    console.log('scrollHeight : '+ scrollHeight);
    console.log('scrollTop : '+ scrollTop);
    console.log('clientHeight : '+clientHeight);

    var postmodal = document.getElementById("PostModal");

    var board_number = postmodal.getAttribute("data-id");

    const commentviewItemElements = document.querySelectorAll('.comment_item.CommentView_comment_item');
    // 요소의 가장 마지막 태그의 뒤쪽에 추가해줄 것
    const lastItemElement = commentviewItemElements[commentviewItemElements.length - 1];

    var lastItemNumber = lastItemElement.getAttribute("data-comment-id");
  
    let formData = new FormData();
  
    formData.append("board_number", board_number);
    formData.append("lastItemNumber", lastItemNumber);
    formData.append("scrollCount", scrollCount);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "readNewCommentData.php", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log("POST 요청 성공");
          var comments = JSON.parse(xhr.responseText);
          // 응답 결과에 따라 처리
          if (comments !== "" && comments !== 0) {
            // json에서 데이터를 하나씩 뽑아와서 추가해준다.
            comments.forEach(comment => {
              console.log('comment' + comment);
              // 데이터를 불러와서 요소 생성 후 추가해줄 태그 찾기
              const commentviewItemElements = document.querySelectorAll('[data-comment-alias="COMMENT"]');
              // 요소의 가장 마지막 태그의 뒤쪽에 추가해줄 것
              const lastItemElement = commentviewItemElements[commentviewItemElements.length - 1];
              var new_board_comment = makeComment(comment);
              lastItemElement.insertAdjacentElement('afterend', new_board_comment);
            });
            scrolled = false;
            
            // 모두 스크롤했는지 여부 확인. 만약 다 불러왔다면 더 이상 스크롤해도 불러와지지 않는다.
            if (comments.length != 20) {
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
  }
});



function makeComment(comment) {
  // 대댓글의 갯수 체크 후 다르게 만들기
  var commentItemDiv = document.createElement('div');

  console.log('comment.number_of_reply' + comment.number_of_reply);

  if (comment.number_of_reply !== 0) {
    commentItemDiv.classList.add('comment_item', 'CommentView_comment_item', 'CommentView_-with_reply');
  } else if(comment.number_of_reply === 0) {
    commentItemDiv.classList.add('comment_item', 'CommentView_comment_item');
  } else {
    console.log('대댓글 여부 확인 불가');
  }
  commentItemDiv.setAttribute('data-comment-id', comment.id);
  commentItemDiv.setAttribute('data-comment-anchored', 'false');
  commentItemDiv.setAttribute('data-comment-alias', 'COMMENT');
  commentItemDiv.setAttribute('data-comment-depth', 'depth1');
  var depth = 1;
  commentItemDiv.setAttribute('data-comment-client', 'post');
  commentItemDiv.setAttribute('data-comment-use-background', 'false');

  var commentContentDiv = document.createElement('div');
  commentContentDiv.classList.add('CommentView_comment_content', '-comment_client_post');

  var postHeaderViewWrapDiv = document.createElement('div');
  postHeaderViewWrapDiv.classList.add('PostHeaderView_header_wrap', 'PostHeaderView_-header_type_post', 'PostHeaderView_-comment_depth1');

  // 프로필 생성 함수
  var postHeaderViewGroupWrapDiv = createProfile_area(depth, comment.write_user_nickname, comment.date_time);

  postHeaderViewWrapDiv.appendChild(postHeaderViewGroupWrapDiv);
  commentContentDiv.appendChild(postHeaderViewWrapDiv);
  commentItemDiv.appendChild(commentContentDiv);

  // 삭제, 신고, 차단 버튼 리스트 생성
  var postHeaderGroupWrapDiv = createDropdownButtonArea(comment.id, comment.user_number, comment.write_user_number); 
  postHeaderViewWrapDiv.appendChild(postHeaderGroupWrapDiv);
  
  // 본문 생성
  var content_textNode = document.createTextNode(comment.contents); // 추가할 텍스트 노드 생성


  // 새로운 <div> 요소 생성
  var commenttextDiv = document.createElement('div');
  commenttextDiv.className = 'CommentView_comment_text';

  // 변수 값을 <div> 요소의 텍스트로 설정
  commenttextDiv.appendChild(content_textNode);
  commentContentDiv.appendChild(commenttextDiv);

  // 새로운 <div> 요소 생성
  var divCommentActions = document.createElement('div');
  divCommentActions.className = 'CommentView_comment_actions';

  // 좋아요 버튼 생성
  var divLikeActionItem = createLikeCommentItem(comment.board_number, comment.id, comment.cheering, comment.likes_row_count);

  // <div> 요소를 부모 요소에 추가
  divCommentActions.appendChild(divLikeActionItem);
  commentContentDiv.appendChild(divCommentActions);
  

  // 댓글 버튼 추가
  var divCommentActionItem = createWriteCommentItem(comment.id);
  divCommentActions.appendChild(divCommentActionItem);

  // 댓글을 생성하는 텍스트인풋
  divInputWrap = createReplyWrap(comment.board_number, comment.id);
  commentContentDiv.appendChild(divInputWrap);

  // 대댓글 여부 확인 후 더보기 버튼 생성
  if (comment.number_of_reply !== 0) {
  // 생성된 요소를 부모 요소에 추가
    var divWrap = createMoreCommentItem(comment.number_of_reply, comment.id);
    commentItemDiv.appendChild(divWrap);
  }

  return commentItemDiv;
  }



  // 프로필 이미지 생성 함수
  function createProfile_area(depth, write_user_nickname, date_time) {
    // 프로필의 사진 부분 생성
    var postHeaderViewGroupWrapDiv = document.createElement('div');
    postHeaderViewGroupWrapDiv.classList.add('PostHeaderView_group_wrap', 'PostHeaderView_-profile_area');

    var profileThumbnailViewLink = document.createElement('a');
    profileThumbnailViewLink.className = 'PostHeaderView_thumbnail_wrap';

    var profileThumbnailViewAreaDiv = document.createElement('div');
    profileThumbnailViewAreaDiv.className = 'ProfileThumbnailView_thumbnail_area';
    
    var profileThumbnailViewWrapDiv = document.createElement('div');
    profileThumbnailViewWrapDiv.classList.add('ProfileThumbnailView_thumbnail_wrap', 'ProfileThumbnailView_-has_border');

    var profileThumbnailViewImageDiv = document.createElement('div');
    profileThumbnailViewImageDiv.style.contentVisibility = 'auto';
    profileThumbnailViewImageDiv.style.width = '100%';
    profileThumbnailViewImageDiv.style.height = '100%';


    var profileThumbnailViewImage = document.createElement('img');
    profileThumbnailViewImage.className = 'ProfileThumbnailView_thumbnail';
    profileThumbnailViewImage.src = 'image/icon_empty_profile.png';

    profileThumbnailViewImage.alt = '';

    // depth에 따라서 이미지 크기를 다르게 설정한다
    if (depth === 1) {
      profileThumbnailViewAreaDiv.style.width = '32px';
      profileThumbnailViewAreaDiv.style.height = '32px';
      profileThumbnailViewImageDiv.style.aspectRatio = 'auto 32 / 32';
      profileThumbnailViewImageDiv.style.containIntrinsicSize = '32px';
      profileThumbnailViewImage.width = '32';
      profileThumbnailViewImage.height = '32';
    }else if (depth === 2) {
      profileThumbnailViewAreaDiv.style.width = '22px';
      profileThumbnailViewAreaDiv.style.height = '22px';
      profileThumbnailViewImageDiv.style.aspectRatio = 'auto 22 / 22';
      profileThumbnailViewImageDiv.style.containIntrinsicSize = '22px';
      profileThumbnailViewImage.width = '22';
      profileThumbnailViewImage.height = '22';
    }else{
      console.log('creatProfile 오류');
    }

    // 요소들을 계층적으로 추가
    profileThumbnailViewImageDiv.appendChild(profileThumbnailViewImage);
    profileThumbnailViewWrapDiv.appendChild(profileThumbnailViewImageDiv);
    profileThumbnailViewAreaDiv.appendChild(profileThumbnailViewWrapDiv);
    profileThumbnailViewLink.appendChild(profileThumbnailViewAreaDiv);
    postHeaderViewGroupWrapDiv.appendChild(profileThumbnailViewLink);

    // 닉네임 영역 생성
    var postHeaderTextWrapDiv = document.createElement('div');
    postHeaderTextWrapDiv.className = 'PostHeaderView_text_wrap';


    var postHeaderLink = document.createElement('a');
    postHeaderLink.href = '';


    var postHeaderNicknameWrapDiv = document.createElement('div');
    postHeaderNicknameWrapDiv.className = 'PostHeaderView_nickname_wrap';


    var postHeaderNicknameStrong = document.createElement('strong');
    postHeaderNicknameStrong.classList.add('PostHeaderView_nickname');
    postHeaderNicknameStrong.textContent = write_user_nickname;

    // 시간 부분 생성
    var postHeaderInfoWrapDiv = document.createElement('div');
    postHeaderInfoWrapDiv.classList.add('PostHeaderView_info_wrap');

    var postHeaderDateSpan = document.createElement('span');
    postHeaderDateSpan.classList.add('PostHeaderView_date');
    postHeaderDateSpan.textContent = date_time;

    postHeaderInfoWrapDiv.appendChild(postHeaderDateSpan);
    postHeaderNicknameWrapDiv.appendChild(postHeaderNicknameStrong);
    postHeaderLink.appendChild(postHeaderNicknameWrapDiv);
    postHeaderTextWrapDiv.appendChild(postHeaderLink);
    postHeaderTextWrapDiv.appendChild(postHeaderInfoWrapDiv);

    postHeaderViewGroupWrapDiv.appendChild(postHeaderTextWrapDiv);

    return postHeaderViewGroupWrapDiv;

  }

function createDropdownButtonArea(id, user_number, write_user_number) {
  var postHeaderGroupWrapDiv = document.createElement('div');
  postHeaderGroupWrapDiv.classList.add('PostHeaderView_group_wrap', 'PostHeaderView_-button_area');

  var translationButtonDiv = document.createElement('div');
  translationButtonDiv.setAttribute('type', 'button');
  translationButtonDiv.classList.add('TranslationButtonView_translation_button');
  translationButtonDiv.setAttribute('aria-pressed', 'false');

  var postHeaderButtonItemDiv = document.createElement('div');
  postHeaderButtonItemDiv.classList.add('PostHeaderView_button_item', 'PostHeaderView_-menu');

  var buttonWrapperDiv = document.createElement('div');

  var moreButton = document.createElement('button');
  moreButton.setAttribute('type', 'button');
  moreButton.id = 'MoreButtonView_button_menu' + id;
  moreButton.classList.add('MoreButtonView_button_menu', 'MoreButtonView_-comment', 'MoreButtonView_-post');
  moreButton.setAttribute('data-id', id);
  moreButton.setAttribute('onclick', 'clickCommentListBox(' + id +')');

  var blindSpan = document.createElement('span');
  blindSpan.classList.add('blind');
  blindSpan.textContent = 'Show More Content';

  var CommentUl = document.createElement('ul');
  CommentUl.id = 'CommentDropdownOptionListView' + id;
  CommentUl.classList.add('DropdownOptionListView_option_list', 'DropdownOptionListView_dropdown-action');
  CommentUl.setAttribute('role', 'listbox');
  CommentUl.setAttribute('data-use-placement', 'true');
  CommentUl.setAttribute('data-placement', 'top');

  // 로그인 유저와 글 작성 유저가 같다면 삭제가 가능하다.
  if (user_number === write_user_number) {
    var deleteCommentLi = document.createElement('li');
    deleteCommentLi.classList.add('DropdownOptionListView_option_item');
    deleteCommentLi.setAttribute('role', 'presentation');

    var deleteCommentButton = document.createElement('button');
    deleteCommentButton.classList.add('ContentMetaActionLayerView_button_item', 'ContentMetaActionLayerView_-delete');
    deleteCommentButton.setAttribute('onclick', 'openDeleteCommentModal(' + id + ')');
    deleteCommentButton.textContent = '삭제하기';

    deleteCommentLi.appendChild(deleteCommentButton);
    CommentUl.appendChild(deleteCommentLi);
  }else{
    var li1 = document.createElement('li');
    li1.className = 'DropdownOptionListView_option_item';
    li1.setAttribute('role', 'presentation');

    var button1 = document.createElement('button');
    button1.classList.add('ContentMetaActionLayerView_button_item', 'ContentMetaActionLayerView_-report');
    button1.textContent = '신고하기';

    li1.appendChild(button1);

    var li2 = document.createElement('li');
    li2.className = 'DropdownOptionListView_option_item';
    li2.setAttribute('role', 'presentation');

    var button2 = document.createElement('button');
    button2.classList.add('ContentMetaActionLayerView_button_item', 'ContentMetaActionLayerView_-block');
    button2.textContent = '작성자 차단';

    li2.appendChild(button2);

    CommentUl.appendChild(li1);
    CommentUl.appendChild(li2);
  }

  moreButton.appendChild(blindSpan);
  buttonWrapperDiv.appendChild(moreButton);
  buttonWrapperDiv.appendChild(CommentUl);
  postHeaderButtonItemDiv.appendChild(buttonWrapperDiv);
  postHeaderGroupWrapDiv.appendChild(translationButtonDiv);
  postHeaderGroupWrapDiv.appendChild(postHeaderButtonItemDiv);

  return postHeaderGroupWrapDiv;

}

// 좋아요 버튼 생성
function createLikeCommentItem(board_number, id, cheering, likes_row_count) {
  // 새로운 <div> 요소 생성
  var divLikeActionItem = document.createElement('div');
  divLikeActionItem.className = 'CommentView_comment_action_item';

  // <button> 요소 생성
  var buttonEmotion = document.createElement('button');
  buttonEmotion.id = 'EmotionButtonView_button_emotion' + id;
  buttonEmotion.type = 'button';
  buttonEmotion.classList.add('EmotionButtonView_button_emotion', 'EmotionButtonView_-comment', '-post');
  buttonEmotion.setAttribute('aria-pressed', 'false');
  buttonEmotion.onclick = function() {
    changeCommentMaximumLikes(board_number, id);
  };


    // <svg> 요소 생성
    var svgCommentLikeBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgCommentLikeBtn.id = "comment_like_btn" + id;
    if (likes_row_count === 1) {
      svgCommentLikeBtn.classList.add('add_comment_like', 'liked');
    }else{
      svgCommentLikeBtn.classList.add('add_comment_like');
    }
    svgCommentLikeBtn.setAttribute("width", "20");
    svgCommentLikeBtn.setAttribute("height", "18");
    svgCommentLikeBtn.setAttribute("viewBox", "0 0 20 18");
    svgCommentLikeBtn.setAttribute("fill", "none");
    svgCommentLikeBtn.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    // <span> 요소 생성
    var spanBlind = document.createElement("span");
    spanBlind.className = "blind";
    spanBlind.textContent = "cheering";

    // 텍스트 노드 생성
    if (cheering === '0' || cheering === null) {
      var textNode = document.createTextNode('');
    }else{
      var textNode = document.createTextNode(cheering);
    }

    // 생성된 요소를 부모 요소에 추가
    buttonEmotion.appendChild(svgCommentLikeBtn);
    buttonEmotion.appendChild(spanBlind);
    buttonEmotion.appendChild(textNode);

  // <button> 요소를 <div> 요소의 자식으로 추가
  divLikeActionItem.appendChild(buttonEmotion);

  return divLikeActionItem;
}

function createWriteCommentItem(id) {
  var divCommentActionItem = document.createElement("div");
  divCommentActionItem.className = "CommentView_comment_action_item";

  var buttonComment = document.createElement("button");
  buttonComment.type = "button";
  buttonComment.classList.add('CommentButtonView_button_comment','CommentButtonView_-comment', '-post');
  buttonComment.setAttribute("onclick", "clickWriteReply(" + id + ")")

  var svgComment = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgComment.setAttribute("width", "20");
  svgComment.setAttribute("height", "18");
  svgComment.setAttribute("viewBox", "0 0 20 18");
  svgComment.setAttribute("fill", "none");
  svgComment.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgComment.setAttribute("data-id", id);

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M16.9987 8.45003C16.9987 4.72476 13.9753 1.70135 10.25 1.70135C6.52475 1.70135 3.50134 4.72476 3.50134 8.45003C3.50134 11.3038 5.27528 13.741 7.77422 14.7282C7.77422 14.7282 7.80507 14.7436 7.8282 14.7514C8.11358 14.8593 8.40666 14.9519 8.70746 15.0213C11.1524 15.6615 14.0524 15.5458 15.4484 15.3144C15.8263 15.245 15.9729 14.9133 15.7801 14.574C15.5718 14.2038 15.2787 13.7564 15.2247 13.3553C15.0474 12.0056 16.9987 11.1186 16.991 8.52715C16.991 8.50402 16.991 8.48088 16.991 8.45774L16.9987 8.45003Z");
  path.setAttribute("stroke", "#8E8E8E");
  path.setAttribute("stroke-width", "1.2");
  path.setAttribute("stroke-miterlimit", "10");

  // <span> 요소 생성
  var spanBlind = document.createElement("span");
  spanBlind.className = "blind";
  spanBlind.textContent = "Leave a comment";

  // <path> 요소를 <svg>에 추가
  svgComment.appendChild(path);

  // <svg>와 <span>을 <button>에 추가
  buttonComment.appendChild(svgComment);
  buttonComment.appendChild(spanBlind);

  // <button>을 <div>에 추가
  divCommentActionItem.appendChild(buttonComment);

  return divCommentActionItem;
}



  // 대댓글을 다는 창을 생성하는 함수
  function createReplyWrap(board_number, id) {

    // <div> 요소 생성
  var divInputWrap = document.createElement("div");
  divInputWrap.className = "ReplyViewerView_input_wrap";
  divInputWrap.id = "ReplyViewerView_input_wrap" + id;
  divInputWrap.setAttribute("data-id", id);
  divInputWrap.setAttribute("oninput", "saveButtonCheck(" + id + ")");

  // <div> 요소 생성
  var divContainer = document.createElement("div");
  divContainer.classList.add('container','-comment_client_post');

  // <div> 요소 생성
  var divCommentInput = document.createElement("div");
  divCommentInput.className = "CommentInputView_form";

  // <div> 요소 생성
  var divTextareaWrap = document.createElement("div");
  divTextareaWrap.className = "CommentInputView_textarea_wrap";

  // <textarea> 요소 생성
  var textarea = document.createElement("textarea");
  textarea.id = "ReplyInputView_textarea" + id;
  textarea.setAttribute("data-id", id);
  textarea.className = "CommentInputView_textarea";
  textarea.spellcheck = false;
  textarea.placeholder = "댓글을 입력하세요.";
  textarea.setAttribute("style", "height: 22px !important;");

  // <button> 요소 생성
  var buttonSend = document.createElement("button");
  buttonSend.type = "button";
  buttonSend.id = "ReplyInputView_send_button" + id;
  buttonSend.className = "CommentInputView_send_button";
  buttonSend.setAttribute("onclick", 'saveReplyValue(' + board_number + ',' + id + ')');
  buttonSend.disabled = true;

  // <svg> 요소 생성
  var svgSend = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgSend.setAttribute("width", "36");
  svgSend.setAttribute("height", "36");
  svgSend.setAttribute("viewBox", "0 0 36 36");
  svgSend.setAttribute("fill", "none");
  svgSend.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  // <path> 요소 생성
  var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("d", "M18 26C17.4477 26 17 25.5523 17 25L17 12C17 11.4477 17.4477 11 18 11C18.5523 11 19 11.4477 19 12L19 25C19 25.5523 18.5523 26 18 26Z");
  path1.setAttribute("fill", "currentColor");

  // <path> 요소 생성
  var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("d", "M12 17L18 11L24 17");
  path2.setAttribute("stroke", "currentColor");
  path2.setAttribute("stroke-width", "2");
  path2.setAttribute("stroke-linecap", "round");

  // <span> 요소 생성
  var spanBlind = document.createElement("span");
  spanBlind.className = "blind";
  spanBlind.textContent = "send";

  // <path> 요소를 <svg>에 추가
  svgSend.appendChild(path1);
  svgSend.appendChild(path2);

  // <svg>와 <span>을 <button>에 추가
  buttonSend.appendChild(svgSend);
  buttonSend.appendChild(spanBlind);

  // <textarea>를 <div>에 추가
  divTextareaWrap.appendChild(textarea);

  // <div> 요소들을 계층적으로 추가
  divCommentInput.appendChild(divTextareaWrap);
  divCommentInput.appendChild(buttonSend);
  divContainer.appendChild(divCommentInput);
  divInputWrap.appendChild(divContainer);

  return divInputWrap;
  }


// 더보기 버튼 생성
function createMoreCommentItem(number_of_reply, id) {
  // <div> 요소 생성
  var divWrap = document.createElement("div");
  divWrap.className = "CommentView_more_recent_comment_wrap";
  divWrap.setAttribute("data-id" , id)

  // <a> 요소 생성
  var linkMore = document.createElement("a");
  linkMore.href = "#";
  linkMore.classList.add('MoreRecentCommentView_link_more','-post');
  linkMore.setAttribute("onclick", "loadReply(" + number_of_reply + "," + id +")");
  linkMore.textContent = "답글 " + number_of_reply +"개";

  // <a>를 <div>에 추가
  divWrap.appendChild(linkMore);

return divWrap;
}



// 버튼 클릭시 대댓글 생성
function makeReply(reply) {
  // 대댓글 요소 본격 불러와서 붙여넣을 태그 구조
  var replyItemDiv = document.createElement('div');
  replyItemDiv.classList.add('comment_item', 'CommentView_comment_item');
  replyItemDiv.setAttribute('data-comment-id', reply.id);
  replyItemDiv.setAttribute('data-comment-anchored', 'false');
  replyItemDiv.setAttribute('data-comment-alias', 'REPLY_COMMENT');
  replyItemDiv.setAttribute('data-comment-depth', 'depth2');
  var depth = 2;
  replyItemDiv.setAttribute('data-comment-client', 'post');
  replyItemDiv.setAttribute('data-comment-use-background', 'false');

  var commentContentDiv = document.createElement('div');
  commentContentDiv.classList.add('CommentView_comment_content', '-comment_client_post');

  var postHeaderViewWrapDiv = document.createElement('div');
  postHeaderViewWrapDiv.classList.add('PostHeaderView_header_wrap', 'PostHeaderView_-header_type_post', 'PostHeaderView_-comment_depth2');

  var postHeaderViewGroupWrapDiv = createProfile_area(depth, reply.write_user_nickname, reply.date_time);

  postHeaderViewWrapDiv.appendChild(postHeaderViewGroupWrapDiv);
  commentContentDiv.appendChild(postHeaderViewWrapDiv);
  replyItemDiv.appendChild(commentContentDiv);

  // 삭제, 신고, 차단 버튼 리스트 생성
  var postHeaderGroupWrapDiv = createDropdownButtonArea(reply.id, reply.user_number, reply.write_user_number); 
  postHeaderViewWrapDiv.appendChild(postHeaderGroupWrapDiv);
  
  // 본문 생성
  var content_textNode = document.createTextNode(reply.contents); // 추가할 텍스트 노드 생성

  // 새로운 <div> 요소 생성
  var commenttextDiv = document.createElement('div');
  commenttextDiv.className = 'CommentView_comment_text';

  // 변수 값을 <div> 요소의 텍스트로 설정
  commenttextDiv.appendChild(content_textNode);
  commentContentDiv.appendChild(commenttextDiv);

  // 새로운 <div> 요소 생성
  var divCommentActions = document.createElement('div');
  divCommentActions.className = 'CommentView_comment_actions';

  // 좋아요 버튼 생성
  var divLikeActionItem = createLikeCommentItem(reply.board_number, reply.id, reply.cheering, reply.likes_row_count);

  // <div> 요소를 부모 요소에 추가
  divCommentActions.appendChild(divLikeActionItem);
  commentContentDiv.appendChild(divCommentActions);


  return replyItemDiv;

}

var openReply = false;

// 버튼 클릭시 생성 or list 열리도록 만들기
function loadReply(number_of_reply, board_number, parent_number) {
  console.log("클릭됐나?");

  

  var wrap_comment_list = document.getElementById('wrap_comment_list'+parent_number);
  var more_recent_comment_wrap = document.getElementById("CommentView_more_recent_comment_wrap"+parent_number);
  
  console.log( "openReply : " + openReply);
  console.log( "wrap_comment_list : " + wrap_comment_list);

  // 버튼 클릭시 불러온 데이터 유무에 따라서 생성해야 한다.
  if (wrap_comment_list !== null && openReply === false) {
    console.log("어디로 들어감? 1");
    openReply = true;
    wrap_comment_list.style.display ='block';
  } else if (wrap_comment_list === null && openReply === false) {
    console.log("어디로 들어감? 2");
    openReply = true;
    var wrapCommentList = document.createElement("div");
    wrapCommentList.className = "wrap_comment_list";
    wrapCommentList.setAttribute("id", "wrap_comment_list" + parent_number);

    var list = document.createElement("div");
    list.className = "list";

    var commentListView = document.createElement("div");
    commentListView.classList.add('CommentListView_list_content','CommentListView_-comment_depth_depth2', '-comment_client_post');

    var contentDiv = document.createElement("div");
    contentDiv.setAttribute('id', 'plusReplybtn' + parent_number); 



    commentListView.appendChild(contentDiv);
    list.appendChild(commentListView);
    wrapCommentList.appendChild(list);
    more_recent_comment_wrap.appendChild(wrapCommentList);


    let formData = new FormData();

    formData.append("board_number", board_number);
    formData.append("lastItemNumber", '');
    formData.append("number_of_reply", number_of_reply);
    formData.append("parent_number", parent_number);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "readNewReplyData.php", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log("POST 요청 성공");
          var replies = JSON.parse(xhr.responseText);
          console.log(replies);
          // 응답 결과에 따라 처리
          if (replies !== "" && replies.length !== 0) {
            // json에서 데이터를 하나씩 뽑아와서 추가해준다.
            replies.forEach(reply => {
              console.log('reply' + reply);
              // 데이터를 불러와서 요소 생성 후 추가해줄 태그 찾기
              const replyviewItemElements = document.querySelectorAll('[data-comment-alias="REPLY_COMMENT"]');
              console.log('replyviewItemElements 길이 : ' + replyviewItemElements.length);
              if (replyviewItemElements.length === 0) {
                var replyItemDiv = makeReply(reply);
                contentDiv.appendChild(replyItemDiv);
              }else{
                // 요소의 가장 마지막 태그의 뒤쪽에 추가해줄 것
                const lastItemElement = replyviewItemElements[replyviewItemElements.length - 1];
                var replyItemDiv = makeReply(reply);
                lastItemElement.insertAdjacentElement('afterend', replyItemDiv);
              }
              
            });
            
            console.log("Math.floor(number_of_reply / 10) : " + Math.floor(number_of_reply / 10));

            // 보여줄 데이터가 더 있다면 더 보기 버튼을 생성해서 넣어준다.
            // 몫이 1보다 크거나 같으면 버튼을 생성한다.
            if (Math.floor(number_of_reply / 10) >= 1) {
              
              // <a> 요소 생성
              var linkMore = document.createElement("a");
              linkMore.href = "#";
              linkMore.classList.add('MoreRecentReplyView_link_more','-post');
              linkMore.setAttribute("onclick", "loadMoreReply(" + board_number + "," + parent_number + "," + number_of_reply + ")");
              linkMore.setAttribute("id", "MoreRecentReplyView_link_more" + parent_number);
              linkMore.setAttribute("pagination", 1);
              linkMore.textContent = "더보기";

              // <a>를 <div>에 추가
              
              contentDiv.appendChild(linkMore);
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
  }else if (wrap_comment_list !== null && openReply === true) {
    console.log("어디로 들어감? 3");
    openReply = false;
    wrap_comment_list.style.display ='none';
  }else{
    console.log("오류");
  }
  }
  

function loadMoreReply(board_number, parent_number, number_of_reply) {
  console.log("클릭됐나?");

  

  var wrap_comment_list = document.getElementById('wrap_comment_list'+parent_number);
  
  const replyviewItemElements = wrap_comment_list.querySelectorAll('[data-comment-alias="REPLY_COMMENT"]');
  // 요소의 가장 마지막 태그의 뒤쪽에 추가해줄 것
  const lastItemElement = replyviewItemElements[replyviewItemElements.length - 1];

  var lastItemNumber = lastItemElement.getAttribute("data-comment-id");


  let formData = new FormData();

  formData.append("board_number", board_number);
  formData.append("lastItemNumber", lastItemNumber);
  formData.append("parent_number", parent_number);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "readNewReplyData.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log("POST 요청 성공");
        var replies = JSON.parse(xhr.responseText);
        console.log(replies);
        // 응답 결과에 따라 처리
        if (replies !== "" && replies.length !== 0) {
          // json에서 데이터를 하나씩 뽑아와서 추가해준다.
          replies.forEach(reply => {
            console.log('reply' + reply);
            // 데이터를 불러와서 요소 생성 후 추가해줄 태그 찾기
            const replyviewItemElements = wrap_comment_list.querySelectorAll('[data-comment-alias="REPLY_COMMENT"]');
            console.log('replyviewItemElements 길이 : ' + replyviewItemElements.length);
            // 요소의 가장 마지막 태그의 뒤쪽에 추가해줄 것
            const lastItemElement = replyviewItemElements[replyviewItemElements.length - 1];
            var replyItemDiv = makeReply(reply);
            lastItemElement.insertAdjacentElement('afterend', replyItemDiv);
          
          });

          var element = document.getElementById("MoreRecentReplyView_link_more" + parent_number);
          var pagination = parseInt(element.getAttribute("pagination")) + 1;
          // && Math.floor(number_of_reply / 10) >= whole_page
          
          // 보여줄 데이터가 더 있다면 더보기 버튼을 생성해서 넣어준다.

          console.log("replies.length : " + replies.length);
          console.log("pagination : " + pagination);
          console.log("Math.floor(number_of_reply / 10) : " + Math.floor(number_of_reply / 10));
          if (pagination < Math.ceil(number_of_reply / 10)) {
            // <a> 요소 생성
            var linkMore = document.createElement("a");
            linkMore.href = "#";
            linkMore.classList.add('MoreRecentReplyView_link_more','-post');
            linkMore.setAttribute("onclick", "loadMoreReply(" + board_number + "," + parent_number + "," + number_of_reply +")");            linkMore.setAttribute("id", "MoreRecentReplyView_link_more" + parent_number);
            linkMore.setAttribute("pagination", pagination);
            linkMore.textContent = "더보기";

            

            var contentDiv = document.getElementById('plusReplybtn'+parent_number);
            // <a>를 <div>에 추가
            contentDiv.appendChild(linkMore);
            element.remove();
          }else{
            element.remove();
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
}





//   const commentviewItemElements = document.querySelectorAll('.comment_item.CommentView_comment_item');
//   // 요소의 가장 마지막 태그의 뒤쪽에 추가해줄 것
//   const lastItemElement = commentviewItemElements[commentviewItemElements.length - 1];

//   var lastItemNumber = lastItemElement.getAttribute("data-comment-id");

//   let formData = new FormData();

//   formData.append("board_number", board_number);
//   formData.append("lastItemNumber", lastItemNumber);
//   formData.append("scrollCount", scrollCount);

//   for (var pair of formData.entries()) {
//     console.log(pair[0] + ": " + pair[1]);
//   }

//   var xhr = new XMLHttpRequest();
//   xhr.open("POST", "readNewCommentData.php", true);
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === XMLHttpRequest.DONE) {
//       if (xhr.status === 200) {
//         console.log("POST 요청 성공");
//         var comments = JSON.parse(xhr.responseText);
//         // 응답 결과에 따라 처리
//         if (comments !== "" && comments !== 0) {
//           // json에서 데이터를 하나씩 뽑아와서 추가해준다.
//           comments.forEach(comment => {
//             console.log('comment' + comment);
//             // 데이터를 불러와서 요소 생성 후 추가해줄 태그 찾기
//             const commentviewItemElements = document.querySelectorAll('.CommentView_comment_item');
//             // 요소의 가장 마지막 태그의 뒤쪽에 추가해줄 것
//             const lastItemElement = commentviewItemElements[commentviewItemElements.length - 1];
//             new_board_comment = makeComment(comment);
//             lastItemElement.insertAdjacentElement('afterend', new_board_comment);
//           });
//           scrolled = false;
          
//           // 모두 스크롤했는지 여부 확인. 만약 다 불러왔다면 더 이상 스크롤해도 불러와지지 않는다.
//           if (comments.length != 20) {
//             scrolled = true;
//           }

//         } else {
//           console.log("posts 오류");
//           return;
//         }
//       } else {
//         console.log("POST 요청 실패");
//       }
//     }
//   };
//   xhr.send(formData);
// }