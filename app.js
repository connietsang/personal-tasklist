// define variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
//input box for filtering tasks
const filter = document.querySelector('#filter');
//input box for new task
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);

  // remove task from task list after clicking X
  taskList.addEventListener('click', removeTask);

  // clears task
  clearBtn.addEventListener('click', clearTasks);

  // filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// Add task in UI
function addTask(e){
  if (taskInput.value === ''){
    alert('Add a task');
  }

  // Create li element to add to collection
  const li = document.createElement('li');
  li.className = 'collection-item'

  // Create text node with what has been submitted as its value and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  
  // Create a new link element
  const link = document.createElement('a');
  // Need secondary-content for link to be to the right of li
  // and delete-item for the task to be deletable later
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  
  // Append link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);


  // Store task in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Get tasks from local storage and show them in UI
function getTasks(){
  let tasks;
  if (localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item'

    // Create text node with what has been submitted as its value and append to li
    li.appendChild(document.createTextNode(task));
    
    // Create a new link element
    const link = document.createElement('a');
    // Need secondary-content for link to be to the right of li
    // and delete-item for the task to be deletable later
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    // Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Store task in local storage
function storeTaskInLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    // local storage only stores strings so needs to be parsed as JSON
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  // local storage only stores strings so tasks must be parsed as a string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from UI
function removeTask(e){
  // Need to target delete-item 
  if(e.target.parentElement.classList.contains('delete-item')){
      // parent of target is the a link, parent of the a link
      // is the li 
      e.target.parentElement.parentElement.remove();

      // remove task from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);

  }
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if (localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task,index){
    if (taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks on UI
function clearTasks(e){

  while (taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // Clear tasks from local storage
  clearTasksFromLocalStorage();

}

// Clear tasks from local storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// Filter tasks
function filterTasks(e){
  // gets whatever is typed in filter box and makes it lowercase
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-items').forEach(
    function(task){
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1){
          task.style.display = 'block';
        }
        else{
          task.style.display = 'none';
        }
    }
  );

}