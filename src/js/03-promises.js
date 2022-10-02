import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formRef = document.querySelector('.form');

formRef.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const res = {
        position: position,
        delay: delay,
      };
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve(res);
        } else {
          reject(res);
        }
      }, delay);
    });
  }

  const first = Number(event.currentTarget.delay.value); // get from DOM element
  const delay = Number(event.currentTarget.step.value); // get from DOM element
  const count = Number(event.currentTarget.amount.value); // get from DOM element

  setTimeout(() => {
    for (let i = 0; i < count; i++) {
      createPromise(i + 1, first + delay * i)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }, first);
}
