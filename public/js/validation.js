/* eslint-disable no-console */
const email = document.querySelector('#email');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const submitBtn = document.querySelector('.submit-btn');
let emailValue = false;
let passwordValue = false;
let usernameValue = false;

/* ---------------------------------------------------------------------------------- */
function emailValidation(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    .test(email);
}

function passwordValidation(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password);
}

function usernameValidation(username) {
  if (username === '') {
    return false;
  } if (username.length < 6) {
    return false;
  }
  if (username.toLowerCase() !== username) {
    return false;
  } if (username.includes(' ')) {
    return false;
  }
  return true;
}

function signUp() {
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      username: username.value,
      password: password.value,
    }),
  })
    .then((res) => {
      console.log(res, 'from then');
      return res.json();
    })
    .then((res) => {
      //   if (res.path) {
      //     window.location.href = res.path;
      //   } else {
      //     console.log(res.msg);
      //   }
    })
    .catch((error) => console.log(error));
}

/* -----------------------------------------------------------------------------------*/
email.addEventListener('keyup', () => {
  const result = emailValidation(email.value);
  if (result) {
    email.parentElement.parentElement.classList.add('valid');
    email.parentElement.parentElement.classList.remove('invalid');
    emailValue = true;
  } else {
    email.parentElement.parentElement.classList.add('invalid');
    email.parentElement.parentElement.classList.remove('valid');
    emailValue = false;
  }
});

password.addEventListener('keyup', () => {
  const result = passwordValidation(password.value);
  if (result) {
    password.parentElement.parentElement.classList.add('valid');
    password.parentElement.parentElement.classList.remove('invalid');
    passwordValue = true;
  } else {
    password.parentElement.parentElement.classList.add('invalid');
    password.parentElement.parentElement.classList.remove('valid');
    passwordValue = false;
  }
});

username.addEventListener('keyup', () => {
  const result = usernameValidation(username.value);
  if (result) {
    username.parentElement.parentElement.classList.add('valid');
    username.parentElement.parentElement.classList.remove('invalid');
    usernameValue = true;
  } else {
    username.parentElement.parentElement.classList.add('invalid');
    username.parentElement.parentElement.classList.remove('valid');
    usernameValue = false;
  }
});

submitBtn.addEventListener('click', () => {
  if (usernameValue && passwordValue && emailValue) {
    signUp();
  }
});

// -----------------------------------------------------------------------------------
