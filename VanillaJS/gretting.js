const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text){
  localStorage.setItem(USER_LS, text); //로컬스토리지에 텍스트저장
}

function handleSubmit(event) {
    event.preventDefault();           // event 기본값 해제
    const currentValue = input.value; // 
    paintGreeting(currentValue);      //currentValue를 paintGreeting에 입력
    saveName(currentValue);           //currentValue를 로컬스토리지에 저장
}

function askForName() {
    form.classList.add(SHOWING_CN);   
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();