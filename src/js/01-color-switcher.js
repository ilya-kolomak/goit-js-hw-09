function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const bodyRef = document.querySelector('body');
const buttonStartRef = document.querySelector('button[data-start]');
const buttonStopRef = document.querySelector('button[data-stop]');
let intervalId = null;
buttonStopRef.setAttribute('disabled', 'disablet');

const handleChangeStart = () => {
  intervalId = setInterval(changeColors, 1000);
  console.log('start');
  buttonStartRef.setAttribute('disabled', 'disablet');
  buttonStopRef.removeAttribute('disabled');
};

buttonStartRef.addEventListener('click', handleChangeStart);

const changeColors = () => {
  bodyRef.style.backgroundColor = getRandomHexColor();
};

const handleChangeStop = () => {
  clearInterval(intervalId);
  console.log('stop');
  buttonStartRef.removeAttribute('disabled');
  buttonStopRef.setAttribute('disabled');
};
buttonStopRef.addEventListener('click', handleChangeStop);
