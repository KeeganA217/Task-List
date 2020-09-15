// Variables

const clearTask = document.querySelector('#clear'),
    removeTask = document.querySelector('.list-items'),
    filter = document.querySelector('#filter-tasks'),
    form = document.querySelector('.task-input'),
    taskList = document.querySelector('.list-items'),
    taskInput = document.querySelector('#new-task');


//Event Listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Clear tasks button
    clearTask.addEventListener('click', removeTasks);
    // Add tasks button
    form.addEventListener('submit', addTask);
    // Filter tasks
    filter.addEventListener('keyup', filterTaskList);
    // Delet single task
    removeTask.addEventListener('click', deleteTask);
}

// Get tasks from local storage 
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const li = document.createElement('li');

        li.className = 'list-item';

        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');

        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);

        taskList.appendChild(li);
    })
}

// Add a task to the list
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a Task');
        e.preventDefault();
    } else {

        const li = document.createElement('li');

        li.className = 'list-item';

        li.appendChild(document.createTextNode(taskInput.value));

        const link = document.createElement('a');

        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);

        taskList.appendChild(li);

        addToLocalStorage(taskInput.value);

        taskInput.value = '';

        e.preventDefault();
    }
}

//Add to local storage
function addToLocalStorage(task) {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Filter through tasks in list 
function filterTaskList(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.list-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

//Delete single task 
function deleteTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove single task from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Clear all tasks 
function removeTasks() {
    while (taskList.firstChild) {
        alert('Are you sure?')
        taskList.removeChild(taskList.firstChild);

        clearLocalStorage();
    }
}

function clearLocalStorage() {
    localStorage.clear();
}