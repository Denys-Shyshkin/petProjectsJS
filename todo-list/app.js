// Creating const to work with DOM
const inputData = document.querySelector('.input');
const addBtn = document.querySelector('.add-button');
const clearBtn = document.querySelector('.clear-button');
const yesBtn = document.getElementById('yes-button');
const cancelBtn = document.getElementById('cancel-button');
const modal = document.querySelector('.modal-content');
const tasksList = document.querySelector('ul');

// Introducing new array to work with users input tasks
const allTasks = [];

// Creating function to add a task 
const addTask = () => {
    const taskDescr = inputData.value;
    if (taskDescr.trim() === '') {
        alert ('Wrong input');
        return;
    }

    allTasks.push(inputData.value);
 
    renderTask();
    toggleBorder();

    inputData.value = '';
}

// Creating function to render a task on a screen
const renderTask = () => {
    let newLi = document.createElement('li');
    tasksList.appendChild(newLi);
    newLi.innerHTML = 
    `<div class="task"><input type="checkbox" class="checkbox">${inputData.value}<button class="del-button">X</button></div>`;
};

// Creating function to delete all tasks on a screen
const clearAllTasks = () => {
    modal.classList.add('visible');
    cancelBtn.addEventListener('click', () => hideModal());
    yesBtn.addEventListener('click', () => {
        tasksList.innerHTML = '';
        hideModal();
        allTasks.length = 0;
        toggleBorder();
    });
}

// Creating functions to hide confirmation modal window
const hideModal = () => {
    modal.classList.remove('visible');
};

// Creating function to show/hide border around tasks list
const toggleBorder = () => {
    if (allTasks.length === 0) {
        tasksList.classList.remove('list');
    } else if (allTasks.length > 0) {
        tasksList.classList.add('list');
    }
};

// Creating function and attaching it to buttons to checkmark or delete specific task
tasksList.addEventListener('click', event => {
  if (event.target.className === 'del-button') {
    const liEl = event.target.parentElement.parentElement;
    tasksList.removeChild(liEl);
    allTasks.length -= 1;
    toggleBorder();

  } else if (event.target.className === 'checkbox') {
    if (event.target.checked) {
        const divEl = event.target.parentElement;
        divEl.style.textDecoration = 'line-through';
    } else {
        const divEl = event.target.parentElement;
        divEl.style.textDecoration = '';
    }
  }
});

// Attaching adding a task function to "ADD" button
addBtn.addEventListener('click', addTask);

// Attaching adding a task function to "Enter" key
inputData.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Attaching clear of all tasks function to "clear" button
clearBtn.addEventListener('click', clearAllTasks);