const addTask = document.querySelector('form');
const container = document.querySelector('.container');
const sortAbc = document.querySelector('.sortAbc');
const sortDate = document.querySelector('.sortDate');

let mainList =[];

if(localStorage.getItem('todo')){
    mainList = JSON.parse(localStorage.getItem('todo'));
    showList();
}

addTask.addEventListener('submit',function(e){
    e.preventDefault();
    let date = new Date().toLocaleString();
    let dateS = Date.now();
    let inputText = document.querySelector('[name="text"]');
    let newTodo = {
        dateCreate:date,
        dateSort:dateS,
        task:inputText.value,
        checked:false,
    }
    mainList.push(newTodo);
    showList();

    localStorage.setItem('todo', JSON.stringify(mainList))
});


function showList(){
        let allTasks = '';
        for(let i=0;i<mainList.length;i++){
            allTasks = allTasks + `<div class="container${i} containerTask">
                                    <label for="elemInput${i}">
                                    <p>${mainList[i].dateCreate}</p>
                                    <p>${mainList[i].task}</p>
                                    </label>
                                    <input id="ch${i}" ${mainList[i].checked?'checked':''} type="checkbox" id="elemInput${i}">
                                    <button id="bt${i}">delete</button>
                                    <button id="ed${i}">edit</button>
                                </div>`
        }
    
    container.innerHTML = allTasks;
}

container.addEventListener('click',function(event){
    let editTextDone='';
    if(event.target.getAttribute('id')){
        let forCheck = event.target.getAttribute('id').split('').splice(0,2).join('');
        console.log(forCheck);
        if(forCheck==='bt'){
            let cutNum =event.target.getAttribute('id').replace('bt','');
            mainList.splice(cutNum,1);
            showList();
            localStorage.setItem('todo', JSON.stringify(mainList))
        }
        if(forCheck==='ed'){
            let cutNum =event.target.getAttribute('id').replace('ed','');
            console.log(mainList);
            document.querySelector(`.container${cutNum}`).innerHTML=`<div>
                                <p>${mainList[cutNum].dateCreate}</p>
                                <input type="text" value="${mainList[cutNum].task}" name="textEdit${cutNum}" id="inputEdit${cutNum}">
                                <button id="eN${cutNum}">done</button>
                            </div>`
            
        }
        if(forCheck==='eN'){
            let cutNum =event.target.getAttribute('id').replace('eN','');
            console.log(cutNum);
            editTextDone = document.querySelector(`[name="textEdit${cutNum}"]`).value;
            console.log(editTextDone);
            mainList[cutNum].task = editTextDone;
            showList();
            localStorage.setItem('todo', JSON.stringify(mainList))
        }
        if(forCheck==='ch'){
            let cutNum =event.target.getAttribute('id').replace('ch','');
            console.log(cutNum);
            mainList[cutNum].checked = !mainList[cutNum].checked;
            showList();
            localStorage.setItem('todo', JSON.stringify(mainList))
        }
    }
});

sortDate.addEventListener('click',function(){
    if(mainList[0].dateSort < mainList[1].dateSort){
        mainList.sort((a,b)=>a.dateSort < b.dateSort ? 1 : -1);
        showList();
        localStorage.setItem('todo', JSON.stringify(mainList));
    }else{
        mainList.sort((a,b)=>a.dateSort > b.dateSort ? 1 : -1);
        showList();
        localStorage.setItem('todo', JSON.stringify(mainList))
    }
});

sortAbc.addEventListener('click',function(){
    if(mainList[0].task < mainList[1].task){
        mainList.sort((a,b)=>a.task < b.task ? 1 : -1);
        showList();
        localStorage.setItem('todo', JSON.stringify(mainList));
    }else{
        mainList.sort((a,b)=>a.task > b.task ? 1 : -1);
        showList();
        localStorage.setItem('todo', JSON.stringify(mainList))
    }
});