import Notiflix from 'notiflix';

const submitBtn = document.querySelector("button");
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

submitBtn.addEventListener('click', event => {
  event.preventDefault();
  let delay = Number(delayEl.value);
  const step = Number(stepEl.value);
  const amount = Number(amountEl.value);
  
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}






//submitBtn.addEventListener('click', event => { 

//});



/*

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    return Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    return Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  });


<form class="form">
      <label>
        First delay (ms)
        <input type="number" name="delay" required />
      </label>
      <label>
        Delay step (ms)
        <input type="number" name="step" required />
      </label>
      <label>
        Amount
        <input type="number" name="amount" required />
      </label>
      <button type="submit">Create promises</button>
    </form>
    */