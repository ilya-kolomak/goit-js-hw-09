import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';

// const TIMER_DEADLINE = options.defaultDate;

const inputRef = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

let selectedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      btnStart.disabled = false;
      selectedTime = selectedDates[0].getTime();
    }
  },
};

class Timer {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
    btnStart.disabled = true;
  }

  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = new Date();
      const deltaTime = selectedTime - currentTime;
      const timeComponent = convertMs(deltaTime);

      if (deltaTime <= 1000) {
        clearInterval(this.intervalId);
      }

      daysRef.textContent = timeComponent.days;
      hoursRef.textContent = timeComponent.hours;
      minutesRef.textContent = timeComponent.minutes;
      secondsRef.textContent = timeComponent.seconds;
    }, 1000);

    function convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = pad(Math.floor(ms / day));
      // Remaining hours
      const hours = pad(Math.floor((ms % day) / hour));
      // Remaining minutes
      const minutes = pad(Math.floor(((ms % day) % hour) / minute));
      // Remaining seconds
      const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

      return { days, hours, minutes, seconds };
    }
    function pad(value) {
      return String(value).padStart(2, '0');
    }
  }
}
const timer = new Timer();
flatpickr(inputRef, options);
btnStart.addEventListener('click', () => timer.start());
