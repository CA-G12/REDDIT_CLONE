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
  } else {
    errorMessage.style.display = 'block';
    errorMessage.textContent = "*You can't leave fields empty";
  }
});
