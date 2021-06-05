function createAccount(event) {
   event.preventDefault();

   let local = JSON.parse(localStorage.getItem('users'));

   if (local == null) {
      local = [];
   }

   const user = document.getElementById('user');
   const pass = document.getElementById('pass');
   const repeatPass = document.getElementById('repeat-pass');

   if (pass.value !== repeatPass.value) {
      alert('As senhas devem ser iguais');
      return;
   }

   const profile = {
      user: user.value,
      password: pass.value,
   }

   local.push(profile);

   // let users = localStorage.getItem('users');
   localStorage.setItem('users', JSON.stringify(local));

   user.value = '';
   pass.value = '';
   repeatPass.value = '';
}