import sessions from './data/sessions.js'
import users from './data/users.js'

function showContent() {
    const table = document.getElementsByTagName('table')[0];
    const tbody = document.getElementsByTagName('tbody')[0];
    const tr = table.getElementsByClassName('names')[0];
   
    
    const item = users.map(elem => elem.displayName)

    for (let i = 0; i < item.length; i++) {
        const rowName = document.importNode(tr, true);
        rowName.children[0].textContent = item[i];
        tbody.appendChild(rowName);
    }

   
    const trHead = document.getElementById('table-head');
    const puzzles = sessions[0].puzzles;
    const puzzleRow = puzzles.map(item => item.name);
    for (let i = 0; i < puzzleRow.length; i++) {
        const puzzleName = document.createElement('th');
        puzzleName.textContent = puzzleRow[i];
        trHead.appendChild(puzzleName);
    }
}
showContent()

function load() {
    console.log(sessions);
    //console.log(sessions[0].puzzles);
    const puzzles = sessions[0].puzzles;
   
    console.log(users);
   
}
load();