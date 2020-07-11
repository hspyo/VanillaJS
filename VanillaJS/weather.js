const weather = document.querySelector(".js-weather");
const API_KEY ="5253262c3b88bb92e872591ba3ce70bc";
const COORDS = "coords";

// 실시간으로 날씨데이터를 받아옴
function getWeather(lat, lng){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then(function(response){
    return response.json();
  }).then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerHTML = `${temperature} @ ${place}`;
  });
}

// coordsObj 저장
function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

//위도 경도 위치를 받을 함수.
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
  getWeather(latitude, longitude);
}

// 위치정보 에러
function handleGeoError() {
  console.log('Cant access geo location');
}

// 위치정보 권한 묻고 받는 것.
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

// COORDS를 저장 / 날씨 데이터 함수호출 
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords); // JS형식으로 loadedCords를 구문분석
    getWeather(parsedCoords. latitude, parsedCoords.longitude); // 파싱된 위도와 경도를 가져온다.
  }
}

// 실행함수
function init() {
  loadCoords();
}

init();