axios.defaults.baseURL = 'https://api-scrapbook-andrei.herokuapp.com/';

async function saveScrap(event) {
  event.preventDefault();
  const userUid = localStorage.getItem('userUid');

  const inputId = document.getElementById('ipt-id');
  const inputDesc = document.getElementById('ipt-desc');
  const inputDetail = document.getElementById('ipt-detail');

  if (!inputDesc.value) {
    document.getElementById('scrap-error').classList.remove('none');
    setTimeout(() => {
      document.getElementById('scrap-error').classList.add('none');
    }, 2000);

    return;
  }

  const data = {
    description: inputDesc.value,
    details: inputDetail.value,
    userUid,
  }

  let response;

  if (!inputId.value) {
    response = await axios.post('/notes', data);
  } else {
    response = await axios.put(`/notes/${inputId.value}`, data);
  }

  if (response.status == 200) {
    initTable();
    document.getElementById('scrap-sucess').classList.remove('none');
    setTimeout(() => {
      document.getElementById('scrap-sucess').classList.add('none');
    }, 2000);
  }

  inputId.value = '';
  inputDesc.value = '';
  inputDetail.value = '';
}

async function deleteScrap(event) {
  event.preventDefault();
 
  const idScrap = event.target.parentNode.parentNode.children[0].innerText;

  const response = await axios.delete(`/notes/${idScrap}`);

  initTable();
}

function setEditScrap(event) {
  event.preventDefault();

  const inputId = document.getElementById('ipt-id');
  const inputDesc = document.getElementById('ipt-desc');
  const inputDetail = document.getElementById('ipt-detail');

  inputId.value = event.target.parentNode.parentNode.children[0].innerText;
  inputDesc.value = event.target.parentNode.parentNode.children[1].innerText;
  inputDetail.value = event.target.parentNode.parentNode.children[2].innerText;
}

async function initTable() {
  const tbody = document.getElementsByTagName('tbody')[0];

  const userUid = localStorage.getItem('userUid');

  const response = await axios.get(`/notes?userUid=${userUid}`);
  const dados = response.data.data;

  tbody.innerHTML = '';

  if (dados) {
    dados.forEach((item) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
         <tr class="table-light">
            <th scope="row">${item.uid}</th>
            <td>${item.description}</td>
            <td>${item.details}</td>
            <td>
            <button type="button" class="btn btn-danger" onclick="deleteScrap(event)">Apagar</button>
            <button type="button" class="btn btn-success" onclick="setEditScrap(event)">Editar</button>
            </td>
         </tr>
         `;

      tbody.appendChild(tr);
    });
  }
}

function signOut() {
  localStorage.removeItem('userUid');
  window.location.href = '/index.html';
}

initTable();