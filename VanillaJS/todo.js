// 실행순서 1
// 문서, 요소정보 받아옴
const toDoForm = document.querySelector(".js-toDoForm"), //document는 문서 전체를 탐색하고
    toDoInput = toDoForm.querySelector("input"),        // toDoForm는 해당 element만 탐색하여 값을 가져옴.
    toDoList = document.querySelector(".js-toDoList");  // 

// 실행순서 2
// 배열생성
const TODOS_LS = "toDos";     

let toDos = [];

// 실행순서 7
// 지우는 함수
function deleteToDo(event) {
  const btn = event.target;                           // btn에 event를 담아주고
  const li = btn.parentNode;                          // li에 btn의 부모 node를 담아준다.
  toDoList.removeChild(li);                           // toDoList의 자식node li를 지운다.
  const cleanToDos = toDos.filter(function(toDo){     // fiter는 true인 값만 모아서 새로운 배열을 만든다.
    return toDo.id !== parseInt(li.id);               // 그래서 toDo.id와 li.id가 다른 것들로 배열을 새로 만든다.
  });
  toDos = cleanToDos                                   // 새로만들배열(cleanToDos)를 다시 toDos배열에 담아서
  saveToDos();                                        // 저장한다.
}

// 실행순서 3
// localStorage에 저장하는 함수
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // JS String을 JSON String으로 변환
}

// 실행순서 4
// li,delBtn,span,id 추가 함수
function paintToDo(text) {
  const li = document.createElement("li");          // 비어있는 li을만들고
  const delBtn = document.createElement("button");  // 버튼을 만들고
  const span = document.createElement("span");      // span을 만들고
  const newId = toDos.length + 1;                   // id값을 지정을 위한 상수.
  delBtn.innerText = "❌";                           // delBtn에 X text를 삽입
  delBtn.addEventListener("click", deleteToDo);     //  delBtn에 click event 삽입
  span.innerText = text;                            // span에 text 넣을 수 있도록 설정
  li.appendChild(delBtn);                           // delBtn을 li에 자식으로 추가
  li.appendChild(span);                             // span을  li에 자식으로 추가 
  li.id = newId                                     // id를 li에 부여.
  toDoList.appendChild(li);                         // toDoList에 li를 넣는다.
  const toDoObj = {                                 // 텍스트와 아이디를 갖는 상수 추가.
    text: text,
    id: newId
   };
   toDos.push(toDoObj);                             // 배열 toDos에 toDoObj를 추가
   saveToDos();                                     // localStorage에 toDos 배열을 JSON String으로 저장해주는 함수.
  }

  // 실행순서 5
  // 입력값 받아 paintToDo에 입력.
function handleSubmit(event) {
    event.preventDefault();                          // default 값을 막고(자동새로고침)
    const currentValue = toDoInput.value;            // toDoInput값을 currentValue에 담고
    paintToDo(currentValue);                         // paintToDo에 current값을 넣는다.
    toDoInput.value ="";                             // toDoInput값 초기화
}

// 실행순서 6
// loCalStorage에 배열을 받아오는 함수.
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);       // localStorage에서 배열인 TODOS_LS값 받아옴 
  if(loadedToDos !== null) {                                // 만약 loadedToDos가 null값이 아니면
    const parsedToDos = JSON.parse(loadedToDos);            // parsedToDos에 배열인 loadedToDos를 JS형식으로 구문분석(파싱)한다.
    parsedToDos.forEach(function (toDo) {                   // parsedToDos 배열의 element들마다 toDo함수를 실행할것이다.
      paintToDo(toDo.text);                                 // paintTodo 메소드 실행. 
    });
  }
}

// 실행순서 8
// toDoForm에 loadToDos로 저장값 받아오고
// toDoInput(입력값) 제출하는 함수
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
// 실행순서 9
// 실행
init();