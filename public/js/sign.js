// const inputContainer = document.querySelector('.input-container');
// const inputLabelCon = document.querySelector('.input-label');
const inputs = document.querySelectorAll('input');

Array.from(inputs).forEach((input) => {
  input.addEventListener('focus', (e) => {
    const label = document.querySelector(`label[for='${e.target.id}']`);
    label.style.fontSize = '10px';
    label.style.top = '10%';
  });
});

Array.from(inputs).forEach((input) => {
  input.addEventListener('blur', (e) => {
    if (input.value === '') {
      const label = document.querySelector(`label[for='${e.target.id}']`);
      label.style.fontSize = '13px';
      label.style.top = '30%';
    }
  });
});
