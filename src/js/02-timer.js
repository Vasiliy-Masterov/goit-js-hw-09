import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStartEl = document.querySelector("[data-start]");
const timerEl = document.querySelector(".timer");
const fieldsEl = document.querySelectorAll(".field");
const dataDaysEl = document.querySelector("[data-days]");
const dataHoursEl = document.querySelector("[data-hours]");
const dataMinutesEl = document.querySelector("[data-minutes]");
const dataSecondsEl = document.querySelector("[data-seconds]");

timerEl.style.display = "flex";

fieldsEl.forEach(fieldEl => {
    fieldEl.style.display = "flex";
    fieldEl.style.flexDirection = "column";
    fieldEl.style.alignItems = "center";
    fieldEl.style.marginRight = "10px";
    fieldEl.firstElementChild.style.fontSize = "40px";
    fieldEl.lastElementChild.style.fontSize = "12px";
    fieldEl.lastElementChild.style.textTransform = "uppercase";
});

let timerId = null;
buttonStartEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date())
    {
      buttonStartEl.disabled = true;
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    let ms = selectedDates[0] - new Date();
    buttonStartEl.disabled = false;

buttonStartEl.addEventListener('click', () => {
  buttonStartEl.disabled = true;
  timerId = setInterval(() => {
    ms = ms - 1000;
    const {days, hours, minutes, seconds} = convertMs(ms);
    const {textDays, textHours, textMinutes,textSeconds} = addLeadingZero(days, hours,  minutes, seconds);
    dataSecondsEl.textContent = textSeconds;
    dataMinutesEl.textContent = textMinutes;
    dataHoursEl.textContent = textHours;
    dataDaysEl.textContent = textDays;
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timerId);
    }
   }, 1000);
  });
  },
};

const fp = flatpickr("#datetime-picker", options);

function addLeadingZero(days, hours,  minutes, seconds) {
  const textSeconds = `${seconds}`.padStart(2, "0");
  const textMinutes = `${minutes}`.padStart(2, "0");
  const textHours = `${hours}`.padStart(2, "0");
  const textDays = `${days}`.padStart(2, "0");
  return {textDays,textHours,textMinutes,textSeconds};
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

























/*
 <input type="text" id="datetime-picker" />
    <button type="button" data-start>Start</button>

    <div class="timer">
      <div class="field">
        <span class="value" data-days>00</span>
        <span class="label">Days</span>
      </div>
      <div class="field">
        <span class="value" data-hours>00</span>
        <span class="label">Hours</span>
      </div>
      <div class="field">
        <span class="value" data-minutes>00</span>
        <span class="label">Minutes</span>
      </div>
      <div class="field">
        <span class="value" data-seconds>00</span>
        <span class="label">Seconds</span>
      </div>
    </div>
*/
/*
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

itemEl.style.width =`${size}px`;
itemEl.style.height =`${size}px`;
itemEl.style.backgroundColor = `${getRandomHexColor()}`;
    

const galleryEl = document.querySelector("body .gallery");
galleryEl.style.listStyle = "none";
galleryEl.style.display = "flex";
galleryEl.style.flexDirection = "column";
galleryEl.style.padding = "0";

const insert = images.map((image =>
  `<li >
  <img
  style="display: block;
  margin-bottom: 10px"
  src='${image.url}' 
  alt='${image.alt}' 
  width=270px >
  </li>`
)).join("");
galleryEl.insertAdjacentHTML("afterbegin", insert);

*/