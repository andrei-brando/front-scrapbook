// axios.defaults.baseURL = 'https://api-scrapbook-andrei.herokuapp.com/';
axios.defaults.baseURL = 'http://localhost:8080';

async function createAccount(event) {
  event.preventDefault();

  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const repeatPassword = document.getElementById('repeat-password');

  if (password.value !== repeatPassword.value) {
    alert('As senhas devem ser iguais');
    return;
  }

  const profile = {
    email: email.value,
    password: password.value,
  }

  try {
    const response = await axios.post('/users', profile);
    alert(response.data.message)
  } catch (error) {
    switch (error.response.status) {
      case 400:
        alert(error.response.data.message);
        break;
      default:
        alert('Erro interno do servidor');
        break;
    }
  }

  email.value = '';
  password.value = '';
  repeatPassword.value = '';
}