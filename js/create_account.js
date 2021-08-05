// axios.defaults.baseURL = 'https://api-scrap-andrei.herokuapp.com/api';
axios.defaults.baseURL = 'http://localhost:8080/api';

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
    const { data } = await axios.post('/users', profile);

    document.getElementById('scrap-sucess').innerHTML = data.message
    document.getElementById('scrap-sucess').classList.remove('none');
    setTimeout(() => {
      document.getElementById('scrap-sucess').classList.add('none');
    }, 2000);
  } catch (error) {
    const { data } = error.response;

    document.getElementById('scrap-error').innerHTML = data.error
    document.getElementById('scrap-error').classList.remove('none');
    setTimeout(() => {
      document.getElementById('scrap-error').classList.add('none');
    }, 2000);
  }

  email.value = '';
  password.value = '';
  repeatPassword.value = '';
}