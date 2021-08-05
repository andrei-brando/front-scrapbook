// axios.defaults.baseURL = 'https://api-scrap-andrei.herokuapp.com/api';
axios.defaults.baseURL = 'http://localhost:8080/api';

async function login(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const body = {
    email,
    password,
  }

  try {
    const { data } = await axios.post('/login', body);

    localStorage.setItem('userUid', data.uid);

    document.getElementById('scrap-sucess').innerHTML = data.message
    document.getElementById('scrap-sucess').classList.remove('none');
    setTimeout(() => {
      document.getElementById('scrap-sucess').classList.add('none');
      window.location.href = '/home.html';
    }, 3000);
  } catch (error) {
    const { data } = error.response;

    document.getElementById('scrap-error').innerHTML = data.error
    document.getElementById('scrap-error').classList.remove('none');
    setTimeout(() => {
      document.getElementById('scrap-error').classList.add('none');
    }, 2000);
  }
}