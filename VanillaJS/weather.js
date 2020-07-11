const API_KEY ="5253262c3b88bb92e872591ba3ce70bc";
const COORDS = "coords";

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    // latitude: latitude -> 객체의 변수이름과 객체 key 이름을 같게 할때는 아래처럼 작성가능
    // longitue: longitude
    latitude,
    longitude
  };
  saveCoords(coordsObj)
}

function handleGeoError() {
  console.log('Cant access geo location');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if(loadedCords === null){
    askForCoords();
  } else {

  }
}


function init() {
  loadCoords();
}

init();