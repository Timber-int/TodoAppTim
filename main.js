const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const deleteAllTaskBBtn = document.querySelector('.footer button');
const key = 'todoKey';

inputBox.onkeyup = () => {
    const userData = inputBox.value;
    if (userData.trim()) {
        addBtn.classList.add('active');
    } else {
        addBtn.classList.remove('active');
    }
}

showTasks();

addBtn.onclick = (e) => {
    e.preventDefault();
    const userData = inputBox.value;

    const getLocalStorage = localStorage.getItem(key);

    const listArr = JSON.parse(getLocalStorage) || [];

    listArr.push(userData);

    localStorage.setItem(key, JSON.stringify(listArr));

    showTasks();
}

function showTasks() {
    const getLocalStorage = localStorage.getItem(key);

    const listArr = JSON.parse(getLocalStorage) || [];

    const pendingNum = document.querySelector('.pending-num');
    pendingNum.innerText = listArr.length;

    if (listArr.length > 0) {
        deleteAllTaskBBtn.classList.add('active');
    } else {
        deleteAllTaskBBtn.classList.remove('active');
    }

    let newLiTag = '';

    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick=deleteTask(${index})><i class="fas fa-trash"></i></span></li>`
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = '';
    addBtn.classList.remove('active');
}

function deleteTask(index) {
    const getLocalStorage = localStorage.getItem(key);

    const listArr = JSON.parse(getLocalStorage) || [];

    listArr.splice(index, 1);

    localStorage.setItem(key, JSON.stringify(listArr));

    inputBox.value = '';

    showTasks();
}

deleteAllTaskBBtn.onclick = () => {
    const listArr = [];

    const pendingNum = document.querySelector('.pending-num');
    pendingNum.innerText = 0;

    if (listArr.length > 0) {
        deleteAllTaskBBtn.classList.add('active');
    } else {
        deleteAllTaskBBtn.classList.remove('active');
    }

    localStorage.setItem(key, JSON.stringify(listArr));

    todoList.innerHTML = '';
}

