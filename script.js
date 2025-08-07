// ===================================================================================
// BAGIAN 1: SELEKSI ELEMEN DOM & INISIALISASI DATA
// ===================================================================================
const welcomeModal = document.getElementById('welcome-modal');
const welcomeForm = document.getElementById('welcome-form');
const usernameInput = document.getElementById('username-input');
const closeWelcomeModalBtn = document.getElementById('close-welcome-modal'); // REVISI

const taskFormModal = document.getElementById('task-form-modal');
const taskForm = document.getElementById('task-form');
const addTaskBtn = document.getElementById('add-task-btn');
const formTitle = document.getElementById('form-title');
const taskFormSubmitBtn = document.getElementById('task-form-submit-btn');
const closeTaskFormModalBtn = document.getElementById('close-task-form-modal'); // REVISI

const profileAvatar = document.querySelector('.profile-avatar');
const profileName = document.querySelector('.profile-name');
const profileStats = document.querySelector('.profile-stats');

let tasks = getTasksFromLocalStorage();
let currentUser = localStorage.getItem('username') || '';
let editingTaskId = null;

// ===================================================================================
// BAGIAN 2: FUNGSI-FUNGSI INTI (MANAJEMEN DATA & TAMPILAN)
// ===================================================================================
function saveTasksToLocalStorage(tasksArray) { localStorage.setItem('tasks', JSON.stringify(tasksArray)); }
function getTasksFromLocalStorage() { const tasksJSON = localStorage.getItem('tasks'); return tasksJSON ? JSON.parse(tasksJSON) : []; }

function displayUserProfile(name) {
  profileName.textContent = name;
  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
  profileAvatar.textContent = initials;
}

function renderDashboard() {
  const highPriorityTasks = tasks.filter(task => task.priority === 'high');
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium');
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low');
  const highCompleted = highPriorityTasks.filter(task => task.isCompleted).length;
  const mediumCompleted = mediumPriorityTasks.filter(task => task.isCompleted).length;
  const lowCompleted = lowPriorityTasks.filter(task => task.isCompleted).length;
  const updateCategoryCard = (cardId, tasks, completed) => {
    const card = document.getElementById(cardId);
    const countElement = card.querySelector('.task-count');
    const percentageElement = card.querySelector('.task-percentage');
    countElement.textContent = `${tasks.length} Tugas`;
    const percentage = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
    percentageElement.textContent = `${percentage}% Selesai`;
  };
  updateCategoryCard('high-priority-card', highPriorityTasks, highCompleted);
  updateCategoryCard('medium-priority-card', mediumPriorityTasks, mediumCompleted);
  updateCategoryCard('low-priority-card', lowPriorityTasks, lowCompleted);
}

// ===================================================================================
// BAGIAN 3: FUNGSI-FUNGSI UNTUK MODAL (POP-UP)
// ===================================================================================
function handleWelcomeFormSubmit(event) {
  event.preventDefault();
  const username = usernameInput.value.trim();
  if (username) {
    currentUser = username;
    localStorage.setItem('username', username);
    displayUserProfile(username);
    welcomeModal.classList.add('hidden');
  }
}

function checkUser() {
  if (currentUser) {
    displayUserProfile(currentUser);
    welcomeModal.classList.add('hidden');
  } else {
    welcomeModal.classList.remove('hidden');
  }
}

function openTaskForm(taskToEdit = null) {
    taskForm.reset();
    if (taskToEdit) {
        formTitle.textContent = "Ubah Tugas";
        taskForm.querySelector('#task-name-input').value = taskToEdit.name;
        taskForm.querySelector('#task-description-input').value = taskToEdit.description;
        taskForm.querySelector('#task-deadline-input').value = taskToEdit.deadline;
        taskForm.querySelector('#task-priority-select').value = taskToEdit.priority;
        taskFormSubmitBtn.textContent = "Simpan Perubahan";
        editingTaskId = taskToEdit.id;
    } else {
        formTitle.textContent = "Tambah Tugas Baru";
        taskFormSubmitBtn.textContent = "Tambah Tugas";
        editingTaskId = null;
    }
    taskFormModal.classList.remove('hidden');
}

function handleTaskFormSubmit(event) {
    event.preventDefault();
    const taskName = document.getElementById('task-name-input').value;
    const taskDesc = document.getElementById('task-description-input').value;
    const taskDeadline = document.getElementById('task-deadline-input').value;
    const taskPriority = document.getElementById('task-priority-select').value;
    if (editingTaskId) {
        const taskIndex = tasks.findIndex(task => task.id === editingTaskId);
        if (taskIndex > -1) {
            tasks[taskIndex].name = taskName;
            tasks[taskIndex].description = taskDesc;
            tasks[taskIndex].deadline = taskDeadline;
            tasks[taskIndex].priority = taskPriority;
        }
    } else {
        const newTask = { id: Date.now(), name: taskName, description: taskDesc, deadline: taskDeadline, priority: taskPriority, isCompleted: false };
        tasks.push(newTask);
    }
    saveTasksToLocalStorage(tasks);
    renderDashboard();
    taskFormModal.classList.add('hidden');
}

// ===================================================================================
// BAGIAN 4: EVENT LISTENERS & INISIALISASI
// ===================================================================================
function init() {
  checkUser();
  renderDashboard();
}

welcomeForm.addEventListener('submit', handleWelcomeFormSubmit);
addTaskBtn.addEventListener('click', () => openTaskForm());
taskForm.addEventListener('submit', handleTaskFormSubmit);

// REVISI: Menambahkan event listener untuk tombol close
closeWelcomeModalBtn.addEventListener('click', () => welcomeModal.classList.add('hidden'));
closeTaskFormModalBtn.addEventListener('click', () => taskFormModal.classList.add('hidden'));

document.addEventListener('DOMContentLoaded', init);
