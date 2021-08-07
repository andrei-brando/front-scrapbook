// axios.defaults.baseURL = 'https://api-scrap-andrei.herokuapp.com/api';
axios.defaults.baseURL = 'http://localhost:8080/api';

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

  const body = {
    description: inputDesc.value,
    details: inputDetail.value,
    userUid,
  }

  let response = null;

  if (!inputId.value) {
    response = await axios.post('/notes', body);
  } else {
    response = await axios.put(`/notes/${inputId.value}`, body);
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


  try {
    await axios.delete(`/notes/${idScrap}`);

    document.getElementById('scrap-sucess').innerHTML = 'Recado deletado';
    document.getElementById('scrap-sucess').classList.remove('none');
    setTimeout(() => {
      document.getElementById('scrap-sucess').classList.add('none');
      initTable();
    }, 2000);
  } catch (error) {
    document.getElementById('scrap-error').innerHTML = 'Erro ao deletar recado';
    document.getElementById('scrap-error').classList.remove('none');
    setTimeout(() => {
      document.getElementById('scrap-error').classList.add('none');
      initTable();
    }, 2000);
  }


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

function clearTable() {
  const tbody = document.getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';
}

async function initTable() {
  const tbody = document.getElementsByTagName('tbody')[0];

  const userUid = localStorage.getItem('userUid');

  tbody.innerHTML = '';

  const { data } = await axios.get(`/notes/all/${userUid}`);

  if (data) {
    data.forEach((item) => {
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