import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const TIMER_DEADLINE = new Date(2022, 8, 30, 19, 20);

const inputRef = document.querySelector('#datetime-picker');
const timerRef = document.querySelector('.timer');
let numbersRef = document.querySelectorAll('.value');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const fp = flatpickr(inputRef, options);

const timer = {
  intervalId: null,
  refs: {},
  notifyOptons: {
    clickToClose: true,
    closeButton: true,
  },

  start(rootSelector, deadLine) {
    const dift = deadLine.getTime() - Date.now();

    if (dift <= 0) {
      Notify.failure('время указано не верно!', this.notifyOptons);
      return;
    }
    Notify.success('Отлично', this.notifyOptons);
    this.getRefs(rootSelector);
    this.intervalId = setInterval(() => {
      const dift = deadLine.getTime() - Date.now();

      const data = this.convertMs(dift);

      this.refs.days.textContent = data.days;
      this.refs.hours.textContent = data.hours;
      this.refs.minutes.textContent = data.minutes;
      this.refs.seconds.textContent = data.seconds;
    }, 1000);
  },

  getRefs(rootSelector) {
    this.refs.days = rootSelector.querySelector('SPAN [data-days]');
    this.refs.hours = rootSelector.querySelector('SPAN [data-hours]');
    this.refs.minutes = rootSelector.querySelector('SPAN [data-minutes]');
    this.refs.seconds = rootSelector.querySelector('SPAN [data-seconds]');
  },
  convertMs(ms) {
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
  },
};

timer.start(timerRef, TIMER_DEADLINE);
