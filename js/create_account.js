axios.defaults.baseURL = 'https://api-scrapbook-andrei.herokuapp.com/';

async function createAccount(event) {
  event.preventDefault();

  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const repeatPassword = document.getElementById('repeat-password');

  if (password.value !== repeatPassword.value) {
    document.getElementById('scrap-error').innerHTML = 'As senhas devem ser iguais';
    document.getElementById('scrap-error').classList.remove('none');
    setTimeout(() => {
      document.getElementById('scrap-error').classList.add('none');
    }, 2000);
    return;
  }

  const profile = {
    email: email.value,
    password: password.value,
  }

  try {
    const response = await axios.post('/users', profile);

    document.getElementById('scrap-sucess').innerHTML = response.data.message
    document.getElementById('scrap-sucess').classList.remove('none');
    setTimeout(() => {
      document.getElementById('scrap-sucess').classList.add('none');
    }, 2000);
  } catch (error) {
    document.getElementById('scrap-error').innerHTML = error.response.data.message
    document.getElementById('scrap-error').classList.remove('none');
    setTimeout(() => {
      document.getElementById('scrap-error').classList.add('none');
    }, 2000);
  }

  email.value = '';
  password.value = '';
  repeatPassword.value = '';
}