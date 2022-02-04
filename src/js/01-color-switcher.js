function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStartEl = document.querySelector('[data-start]');
const buttonStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

buttonStartEl.addEventListener('click', () => {
    buttonStartEl.disabled = true;
    timerId = setInterval(() => {
    colorChange();
    }, 1000);
});
 
buttonStopEl.addEventListener('click', event => {
     buttonStartEl.disabled = false;
     clearInterval(timerId);
});

function colorChange() {
    const randomHexColor = getRandomHexColor();
    bodyEl.style.backgroundColor = randomHexColor;   
}     

