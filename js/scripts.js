// axios.defaults.baseURL = 'https://api-scrapbook-andrei.herokuapp.com/';
axios.defaults.baseURL = 'http://localhost:8080';

async function login(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post(`/login/${email}`, { password });
    localStorage.setItem('userUid', response.data.data.uid);
    
    alert(response.data.message);

    window.location.href = '/home.html';
  } catch (error) {
    console.log(error.response.data.message);
    switch (error.response.status) {
      case 400:
        alert(error.response.data.message);
        break;
      default:
        alert('Erro interno do servidor');
        break;
    }
  }
}