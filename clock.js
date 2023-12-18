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