function login(event) {
   const user = document.getElementById('user');
   const pass = document.getElementById('pass');

   const local = JSON.parse(localStorage.getItem('users'));

   if (local == null) {
      alert('Usuário não cadastrado!');
      return;
   }

   for (const profile of local) {
      if (user.value === profile.user && pass.value === profile.password) {
         window.location.href = '/home.html';
         return;
      } else {
         alert('Email ou senha inválidas');
         return;
      }
   }
}