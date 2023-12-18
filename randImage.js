// 랜덤 이미지 넣기
const randImage = document.querySelector("#rand-image");
const images = ["1.jpg", "2.jpg", "3.jpg"];
const selectedImage = images[Math.floor(Math.random()*images.length)];
const img = document.createElement("img");
img.setAttribute("src", `images/${selectedImage}`);
randImage.appendChild(img);

// 랜덤 명언 넣기
const quotes = document.querySelector("#quotes");
fetch("https://api.adviceslip.com/advice")
.then(response => response.json())
.then(json => {
    const word = json.slip.advice;
    quotes.innerText = word;
});