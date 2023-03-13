// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import Notiflix from 'notiflix';

const timerMarkup = {
  input: document.querySelector('input#datetime-picker'),
  button: document.querySelector('button'),
  timerEl: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

timerMarkup.button.disabled = true;
let timeoutId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure('Please, choose end date');
      timerMarkup.button.disabled = true;
    }
    if (selectedDates[0] >= options.defaultDate) {
      {
        timerMarkup.button.disabled = false;
      }
    }
  },
};

const calendar = flatpickr(timerMarkup.input, options);

timerMarkup.button.addEventListener('click', onButtonClick);

function onButtonClick() {
  timeoutId = setInterval(() => {
    updateTime();
  }, 1000);
  timerMarkup.input.disabled = true;
  timerMarkup.button.disabled = true;
}

function remainigDays(value) {
  return String(value).padStart(2, '0');
}

//Calulating values
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = remainigDays(Math.floor(ms / day));

  // Remaining hours
  const hours = remainigDays(Math.floor((ms % day) / hour));

  // Remaining minutes
  const minutes = remainigDays(Math.floor(((ms % day) % hour) / minute));

  // Remaining seconds
  const seconds = remainigDays(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateTime() {
  const currentTime = new Date();
  const selectedTime = new Date(timerMarkup.input.value);

  const deltaTime = selectedTime - currentTime;

  if (deltaTime <= 0) {
    clearInterval(timeoutId);
    timerMarkup.input.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(deltaTime);
  timerMarkup.days.textContent = `${days}`;
  timerMarkup.hours.textContent = `${hours}`;
  timerMarkup.minutes.textContent = `${minutes}`;
  timerMarkup.seconds.textContent = `${seconds}`;
}
