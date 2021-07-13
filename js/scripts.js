axios.defaults.baseURL = 'https://api-scrap-andrei.herokuapp.com';

async function login(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post(`/login/${email}`, { password });

    localStorage.setItem('userUid', response.data.data.uid);

    document.getElementById('scrap-sucess').innerHTML = response.data.message
    document.getElementById('scrap-sucess').classList.remove('none');
    setTimeout(() => {
      document.getElementById('scrap-sucess').classList.add('none');
      window.location.href = '/home.html';
    }, 3000);
  } catch (error) {
    document.getElementById('scrap-error').innerHTML = error.response.data.message
    document.getElementById('scrap-error').classList.remove('none');
    setTimeout(() => {
      document.getElementById('scrap-error').classList.add('none');
    }, 2000);
  }
}