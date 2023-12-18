const quotes = document.querySelector("#quotes");
fetch("https://api.adviceslip.com/advice")
.then(response => response.json())
.then(json => {
    const word = json.slip.advice;
    quotes.innerText = word;
});