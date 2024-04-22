<button id="getDataButton">데이터 가져오기</button>
<div id="dataContainer"></div>



<script>
const getDataButton = document.getElementById('getDataButton');
const dataContainer = document.getElementById('dataContainer');

function getData() {
    console.log('getData 됨?');
    let formData = new FormData();
    
    formData.append("board_rows", 149);
    formData.append("scrollCount", 4);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    var xhr = new XMLHttpRequest();
        xhr.open("POST", "readNewBoardData.php", true);
        xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
            console.log("POST 요청 성공");
            console.log('respons :' + xhr.responseText);
            // var posts = JSON.parse(xhr.responseText);
            // console.log("posts: " + posts);
            // 응답 결과에 따라 처리
            if (posts !== "") {
                // json에서 데이터를 하나씩 뽑아와서 추가해준다.
                // posts.forEach(post => {
                //   new_board_post = makePost(post);
                //   lastItemElement.insertAdjacentElement('afterend', new_board_post);
                // });
                dataContainer.textContent = posts;
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
        console.log('아예 작동 안하나?');
        console.log('xhr.readyState : '+ xhr.readyState);
        console.log('xhr.status : ' + xhr.status);
}

getDataButton.addEventListener('click', getData);

</script>