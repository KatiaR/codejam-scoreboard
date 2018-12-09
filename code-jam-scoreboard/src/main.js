import sessions from './data_files/sessions.js'
import users from './data_files/users.js'

function showContent() {
    const table = document.getElementsByTagName('table')[0];
    const tbody = document.getElementsByTagName('tbody')[0];
    const tr = table.getElementsByClassName('names')[0];
    const td = tr.children[0];
   

    const item = users.map(elem => elem.displayName)
    const rounds = sessions[0].rounds;

    for (let i = 0; i < item.length; i++) {
        const rowName = document.importNode(tr, true);
        rowName.children[0].textContent = item[i];
        const uid = users[i].uid;
        rowName.children[0].setAttribute('uid', uid);

        const totalTimeNode = document.importNode(td, true);
        rowName.appendChild(totalTimeNode);

        let totalTime = 0;
        rounds.forEach(elem => {
            const time = elem.solutions[uid] && +elem.solutions[uid].time.$numberLong || 151
            const userTd = document.importNode(td, true);
            userTd.textContent = time;
            totalTime = totalTime + time
            rowName.appendChild(userTd);
        })

        totalTimeNode.textContent = totalTime;
        tbody.appendChild(rowName);
    }
    tbody.removeChild(tr);

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
    const timeData = sessions[0].rounds[0].solutions;
         console.log(timeData);
const time = Object.values(timeData);
const timeInfo = Object.values(time);

   console.log(time);
    // const puzzles = sessions[0].puzzles;
   // console.log(sessions[0].rounds[0].solutions)
   // console.log(Object.values(sessions[0].rounds[0].solutions))
    //const dataTime = Object.values(sessions[0].rounds[0].solutions);
    //const time = dataTime[0];
    //console.log(time.time)
    //console.log(Object.keys(time))
    //console.log(dataTime)
    //const { code, time, correct } = dataTime[0];
   // console.log(time);
   // console.log(time.$numberLong);
    //console.log(code); //add to the tooltype
   // console.log(correct); //check the result task
    // console.log(users);

}
load();