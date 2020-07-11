const toDoForm = document.querySelector(".js-toDoForm"), //document는 문서 전체를 탐색하고
    toDoInput = toDoForm.querySelector("input"),        // toDoForm는 해당 element만 탐색하여 값을 가져옴.
    toDoList = document.querySelector(".js-toDoList");  // 

const TODOS_LS = "toDos";     

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;                           // btn에 event를 담아주고
  const li = btn.parentNode;                          // li에 btn의 부모 node를 담아준다.
  toDoList.removeChild(li);                           // toDoList의 자식node li를 지운다.
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos
  saveToDos();
}
 
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //string으로 형변환 하는 것.
}

function paintToDo(text) {
  const li = document.createElement("li");          // 비어있는 li을만들고
  const delBtn = document.createElement("button");  // 버튼을 만들고
  const span = document.createElement("span");      // span을 만들고
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);                             // span을  li에 넣는 다.
  li.id = newId
  toDoList.appendChild(li);                         // toDoList에 li를 넣는다.
  const toDoObj = {
    text: text,
    id: newId
   };
   toDos.push(toDoObj);
   saveToDos();
  }

function handleSubmit(event) {
    event.preventDefault();                          // default 값을 막고(자동새로고침)
    const currentValue = toDoInput.value;            // toDoInput값을 currentValue에 담고
    paintToDo(currentValue);                         // paintToDo에 current값을 넣는다.
    toDoInput.value ="";                             // toDoInput값 초기화
}



function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);       // localStorage에서 
  if(loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();