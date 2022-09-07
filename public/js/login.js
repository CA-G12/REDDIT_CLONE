const loginBtn = document.querySelector('.login-btn');
const errorMessage = document.querySelector('.error-message');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

loginBtn.addEventListener('click', () => {
  if (email.value && password.value) {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        errorMessage.style.display = 'none';

        if (res.err) {
          // console.log("test 1" , res.err);
          errorMessage.textContent = `* ${res.err.details[0].message}`;
          errorMessage.style.display = 'block';
        } else if (res.msg) {
          // console.log("test 2" , res.msg);
          errorMessage.textContent = `* ${res.msg}`;
          errorMessage.style.display = 'block';
        } else if (res.path) {
          window.location.href = res.path;
        }
      })
      .catch((error) => console.log(error));
  } else {
    errorMessage.textContent = "* You can't leave fields empty";
    errorMessage.style.display = 'block';
  }
});
