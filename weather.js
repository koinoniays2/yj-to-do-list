// 시간 넣기
const clock = document.querySelector("#clock");
function getClock() {
    const date = new Date();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    // padStart 문자열을 지정된 길이로 채운다.
    clock.innerText = `${hour}:${minute}:${second}`;
}
setInterval(getClock, 1000);

// 현재 기온 불러오기
const API_KEY = "6b8662b4d475e9fba4dc9aa9156bd3e9";
function onGeoSuccess(position) {
    // console.log(position);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    // 위치정보를 구해서 API주소에 넣기
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        const weather = document.querySelector("#weather");
        weather.innerText = json.name + " " + Math.floor(json.main.temp) + "º";
        
    });
}
function onGeoFail() {
    alert("현재 위치를 가져올 수 없습니다.");
}
// 매개변수(성공, 실패)
navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail, );