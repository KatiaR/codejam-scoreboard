import sessions from './data_files/sessions.js';
import users from './data_files/users.js';
import './tooltip.js';

function tableGen() {
  const fragment = document.createDocumentFragment();
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  const th1 = document.createElement('th');
  th1.textContent = 'DisplayName';
  const th2 = document.createElement('th');
  th2.textContent = 'TotalTime';
  const tbody = document.createElement('tbody');
  const tr2 = document.createElement('tr');
  const td = document.createElement('td');
  tr.appendChild(th1);
  tr.appendChild(th2);
  thead.appendChild(tr);
  tr2.appendChild(td);
  tr2.classList.add('names');
  td.classList.add('participants');
  tbody.appendChild(tr2);
  table.appendChild(thead);
  table.appendChild(tbody);
  fragment.appendChild(table);
  document.body.appendChild(fragment);
  return table;
}
showContent();

function showContent(sessionChoise = 0) {
  const table = document.getElementsByTagName('table')[0];
  const tbody = document.getElementsByTagName('tbody')[0];
  const tr = table.getElementsByClassName('names')[0];
  const td = tr.children[0];

  const item = users.map(elem => elem.displayName);
  const rounds = sessions[sessionChoise].rounds;

  for (let i = 0; i < item.length; i++) {
    const rowName = document.importNode(tr, true);
    rowName.children[0].textContent = item[i];
    const uid = users[i].uid;

    const totalTimeNode = document.importNode(td, true);
    rowName.appendChild(totalTimeNode);

    let totalTime = 0;
    if (rounds.length) {
      rounds.forEach((elem, i) => {
        let time;
        if (elem.solutions[uid] && elem.solutions[uid].correct === 'Correct') {
          time = elem.solutions[uid] && +elem.solutions[uid].time.$numberLong;
        } else {
          time = 150;
        }
        const userTd = document.importNode(td, true);
        userTd.setAttribute('uid', uid);
        userTd.setAttribute('round', i);
        userTd.textContent = time;
        totalTime = totalTime + time;
        rowName.appendChild(userTd);
      });
    } else {
      const userTd = document.importNode(td, true);
      userTd.setAttribute('uid', uid);
      userTd.setAttribute('round', i);
      const time = 150;
      userTd.textContent = time;
      totalTime = totalTime + time;
      rowName.appendChild(userTd);
    }

    const comparison = document.importNode(td, true);
    const inputCheckbox = document.createElement('input');
    inputCheckbox.setAttribute('type', 'checkbox');
    comparison.appendChild(inputCheckbox);
    rowName.appendChild(comparison);


    totalTimeNode.textContent = totalTime;
    tbody.appendChild(rowName);
  }
  tbody.removeChild(tr);

  const trHead = document.querySelector('thead tr');
  const puzzles = sessions[sessionChoise].puzzles;
  const puzzleRow = puzzles.map(item => item.name);
  for (let i = 0; i < puzzleRow.length; i++) {
    const puzzleName = document.createElement('th');
    puzzleName.textContent = puzzleRow[i];
    trHead.appendChild(puzzleName);
  }
  const th3 = document.createElement('th');
  th3.textContent = 'Comparison';
  trHead.appendChild(th3);
}
const rsschool = document.getElementById('rsschool');
rsschool.addEventListener('click', () => {
  const table = document.getElementsByTagName('table')[0];
  document.body.removeChild(table);
  document.body.insertBefore(
    tableGen(),
    document.getElementsByTagName('table')[0]
  );
  const newTable = document.getElementsByTagName('table')[0];
  newTable.classList.remove('hide');
  showContent();
});
const rsschoolDemo = document.getElementById('rsschool-demo');
rsschoolDemo.addEventListener('click', () => {
  const table = document.getElementsByTagName('table')[0];
  document.body.removeChild(table);
  document.body.insertBefore(
    tableGen(),
    document.getElementsByTagName('table')[0]
  );
  const newTable = document.getElementsByTagName('table')[0];
  newTable.classList.remove('hide');
  showContent(1);
});
