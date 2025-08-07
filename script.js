// ===================================================================================
// BAGIAN 1: SELEKSI ELEMEN DOM & INISIALISASI DATA
// ===================================================================================

// --- Seleksi Elemen dari HTML ---
// Mengambil semua elemen interaktif dari HTML agar bisa dimanipulasi oleh JavaScript.
const welcomeModal = document.getElementById('welcome-modal');
const welcomeForm = document.getElementById('welcome-form');
const usernameInput = document.getElementById('username-input');
const closeWelcomeModalBtn = document.getElementById('close-welcome-modal');

const taskFormModal = document.getElementById('task-form-modal');
const taskForm = document.getElementById('task-form');
const addTaskBtn = document.getElementById('add-task-btn');
const formTitle = document.getElementById('form-title');
const taskFormSubmitBtn = document.getElementById('task-form-submit-btn');
const closeTaskFormModalBtn = document.getElementById('close-task-form-modal');
const completeTaskBtn = document.getElementById('task-form-complete-btn');

// Selektor untuk modal konfirmasi hapus
const deleteConfirmModal = document.getElementById('delete-confirm-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

const profileSection = document.querySelector('.profile-section');
const profileAvatar = document.querySelector('.profile-avatar');
const profileName = document.querySelector('.profile-name');
const profileStats = document.querySelector('.profile-stats');

const taskCategoriesView = document.querySelector('.task-categories');
const taskListView = document.querySelector('.task-list-view');
const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
const listTitle = document.getElementById('list-title');
const taskListContainer = document.getElementById('task-list-container');
const categoryCards = document.querySelectorAll('.category-card');

// --- Inisialisasi Data ---
// `tasks` adalah array utama yang akan menyimpan semua objek tugas.
// Saat aplikasi dimuat, kita coba ambil data dari localStorage. Jika tidak ada, kita mulai dengan array kosong.
let tasks = getTasksFromLocalStorage();
let currentUser = localStorage.getItem('username') || '';
let editingTaskId = null; // Variabel untuk melacak tugas mana yang sedang di-edit.
let currentCategory = null; // Variabel untuk melacak kategori mana yang sedang dilihat.
let taskToDeleteId = null; // Variabel untuk menyimpan ID tugas yang akan dihapus

// ===================================================================================
// BAGIAN 2: FUNGSI-FUNGSI INTI (MANAJEMEN DATA & TAMPILAN)
// ===================================================================================

/**
 * Menyimpan array tugas ke dalam localStorage browser.
 * Data diubah menjadi format string JSON sebelum disimpan.
 * @param {Array} tasksArray - Array berisi objek-objek tugas.
 */
function saveTasksToLocalStorage(tasksArray) {
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

/**
 * Mengambil data tugas dari localStorage.
 * Mengubah string JSON kembali menjadi array. Jika tidak ada data, kembalikan array kosong.
 * @returns {Array} - Array berisi objek-objek tugas.
 */
function getTasksFromLocalStorage() {
  const tasksJSON = localStorage.getItem('tasks');
  return tasksJSON ? JSON.parse(tasksJSON) : [];
}

/**
 * Menampilkan nama pengguna dan membuat inisial untuk avatar.
 * @param {string} name - Nama pengguna yang akan ditampilkan.
 */
function displayUserProfile(name) {
  profileName.textContent = name;
  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
  profileAvatar.textContent = initials;
}

/**
 * Memperbarui tampilan dashboard (kartu kategori dan statistik profil).
 * Menghitung jumlah tugas dan persentase penyelesaian untuk setiap prioritas.
 */
function renderDashboard() {
  // --- Kalkulasi untuk kartu kategori ---
  const highPriorityTasks = tasks.filter(task => task.priority === 'high');
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium');
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low');

  const highCompleted = highPriorityTasks.filter(task => task.isCompleted).length;
  const mediumCompleted = mediumPriorityTasks.filter(task => task.isCompleted).length;
  const lowCompleted = lowPriorityTasks.filter(task => task.isCompleted).length;

  const updateCategoryCard = (cardId, tasks, completed) => {
    const card = document.getElementById(cardId);
    if (!card) return;
    const countElement = card.querySelector('.task-count');
    const percentageElement = card.querySelector('.task-percentage');
    countElement.textContent = `${tasks.length} Tugas`;
    const percentage = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
    percentageElement.textContent = `${percentage}% Selesai`;
  };

  updateCategoryCard('high-priority-card', highPriorityTasks, highCompleted);
  updateCategoryCard('medium-priority-card', mediumPriorityTasks, mediumCompleted);
  updateCategoryCard('low-priority-card', lowPriorityTasks, lowCompleted);

  // --- Kalkulasi untuk statistik profil utama ---
  const totalTasks = tasks.length;
  const totalCompleted = tasks.filter(task => task.isCompleted).length;
  const overallPercentage = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  profileStats.innerHTML = `
    <div class="stat-item">
        <span class="stat-value">${totalTasks}</span>
        <span class="stat-label">Total Tugas</span>
    </div>
    <div class="stat-item">
        <span class="stat-value">${overallPercentage}%</span>
        <span class="stat-label">Selesai</span>
    </div>
  `;
}

/**
 * Menampilkan daftar tugas yang sudah difilter di halaman daftar tugas.
 * @param {Array} filteredTasks - Array tugas yang sudah difilter berdasarkan prioritas.
 * @param {string} categoryName - Nama kategori untuk ditampilkan sebagai judul.
 */
function renderTaskList(filteredTasks, categoryName) {
    listTitle.textContent = categoryName;
    taskListContainer.innerHTML = ''; 

    if (filteredTasks.length === 0) {
        taskListContainer.innerHTML = `<p class="empty-message">Belum ada tugas di kategori ini.</p>`;
        return;
    }

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.isCompleted ? 'completed' : ''}`;
        taskItem.dataset.id = task.id;
        taskItem.innerHTML = `
            <div class="task-item-main">
                <button class="complete-btn"></button>
                <div class="task-item-details">
                    <p class="task-item-name">${task.name}</p>
                    <div class="task-item-dates">
                        <p class="task-item-created">Dibuat: ${task.createdAt}</p>
                        <p class="task-item-deadline">${task.deadline ? `Tenggat: ${task.deadline}` : ''}</p>
                    </div>
                </div>
            </div>
            <div class="task-item-actions">
                <button class="edit-btn">Ubah</button>
                <button class="delete-btn">Hapus</button>
            </div>
        `;
        taskListContainer.appendChild(taskItem);
    });
}


// ===================================================================================
// BAGIAN 3: FUNGSI-FUNGSI UNTUK MODAL & NAVIGASI
// ===================================================================================

/**
 * Menangani proses saat form selamat datang disubmit.
 * @param {Event} event - Objek event dari form submission.
 */
function handleWelcomeFormSubmit(event) {
  event.preventDefault(); // Mencegah halaman reload
  const username = usernameInput.value.trim();
  if (username) {
    currentUser = username;
    localStorage.setItem('username', username);
    displayUserProfile(username);
    welcomeModal.classList.add('hidden'); // Sembunyikan modal
  }
}

/**
 * Memeriksa apakah nama pengguna sudah tersimpan di localStorage.
 * Jika ada, tampilkan profil. Jika tidak, tampilkan modal selamat datang.
 */
function checkUser() {
  if (currentUser) {
    displayUserProfile(currentUser);
    welcomeModal.classList.add('hidden');
  } else {
    welcomeModal.classList.remove('hidden');
  }
}

/**
 * Menampilkan modal formulir tugas.
 * Jika untuk 'edit', isi formulir dengan data tugas yang ada.
 * Jika untuk 'tambah', kosongkan formulir.
 * @param {object | null} taskToEdit - Objek tugas yang akan di-edit, atau null jika menambah baru.
 */
function openTaskForm(taskToEdit = null) {
    taskForm.reset();
    if (taskToEdit) {
        // Mode Ubah
        formTitle.textContent = "Ubah Tugas";
        taskForm.querySelector('#task-name-input').value = taskToEdit.name;
        taskForm.querySelector('#task-description-input').value = taskToEdit.description;
        taskForm.querySelector('#task-deadline-input').value = taskToEdit.deadline;
        taskForm.querySelector('#task-priority-select').value = taskToEdit.priority;
        taskFormSubmitBtn.textContent = "Simpan Perubahan";
        completeTaskBtn.classList.remove('hidden');
        editingTaskId = taskToEdit.id;
    } else {
        // Mode Tambah
        formTitle.textContent = "Tambah Tugas Baru";
        taskFormSubmitBtn.textContent = "Tambah Tugas";
        completeTaskBtn.classList.add('hidden');
        editingTaskId = null;
    }
    taskFormModal.classList.remove('hidden');
}

/**
 * Menangani proses saat formulir tugas disubmit.
 * Bisa untuk menambah tugas baru atau menyimpan perubahan pada tugas yang ada.
 * @param {Event} event - Objek event dari form submission.
 */
function handleTaskFormSubmit(event) {
    event.preventDefault();
    
    const taskName = document.getElementById('task-name-input').value;
    const taskDesc = document.getElementById('task-description-input').value;
    const taskDeadline = document.getElementById('task-deadline-input').value;
    const taskPriority = document.getElementById('task-priority-select').value;

    if (editingTaskId) {
        // Logika untuk MENGUBAH tugas yang ada
        const taskIndex = tasks.findIndex(task => task.id === editingTaskId);
        if (taskIndex > -1) {
            tasks[taskIndex] = { ...tasks[taskIndex], name: taskName, description: taskDesc, deadline: taskDeadline, priority: taskPriority };
        }
    } else {
        // Logika untuk MENAMBAH tugas baru
        const newTask = { 
            id: Date.now(), 
            name: taskName, 
            description: taskDesc, 
            deadline: taskDeadline,
            priority: taskPriority, 
            isCompleted: false,
            createdAt: new Date().toLocaleDateString('en-CA') // Tanggal dibuat otomatis (format YYYY-MM-DD)
        };
        tasks.push(newTask);
    }

    saveTasksToLocalStorage(tasks); // Simpan array tugas yang sudah diperbarui
    renderDashboard(); // Perbarui tampilan dashboard
    // Jika sedang di halaman daftar tugas, re-render juga halaman itu
    if (currentCategory) {
        const filtered = tasks.filter(task => task.priority === currentCategory);
        const categoryMap = { high: 'Prioritas Tinggi', medium: 'Prioritas Menengah', low: 'Prioritas Rendah' };
        renderTaskList(filtered, categoryMap[currentCategory]);
    }
    taskFormModal.classList.add('hidden'); // Sembunyikan modal form
}

/**
 * Berpindah dari dashboard ke tampilan daftar tugas.
 * @param {string} priority - Prioritas yang dipilih ('high', 'medium', 'low').
 */
function showTaskListView(priority) {
    // Sembunyikan profil hanya di layar mobile (lebar < 768px)
    if (window.innerWidth < 768) {
        profileSection.classList.add('hidden');
    }
    taskCategoriesView.classList.add('hidden');
    taskListView.classList.remove('hidden');
    currentCategory = priority;

    const filteredTasks = tasks.filter(task => task.priority === priority);
    const categoryMap = { high: 'Prioritas Tinggi', medium: 'Prioritas Menengah', low: 'Prioritas Rendah' };
    renderTaskList(filteredTasks, categoryMap[priority]);
}

/**
 * Kembali ke tampilan dashboard utama.
 */
function showDashboardView() {
    profileSection.classList.remove('hidden');
    taskCategoriesView.classList.remove('hidden');
    taskListView.classList.add('hidden');
    currentCategory = null;
    renderDashboard(); // Re-render dashboard untuk memastikan data terbaru
}

// ===================================================================================
// BAGIAN 4: FUNGSI-FUNGSI AKSI TUGAS (COMPLETE, EDIT, DELETE)
// ===================================================================================

/**
 * Mengubah status 'isCompleted' dari sebuah tugas.
 * @param {number} taskId - ID dari tugas yang akan diubah.
 */
function toggleTaskComplete(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
        saveTasksToLocalStorage(tasks);
        if (currentCategory) { showTaskListView(currentCategory); }
        renderDashboard();
    }
}

/**
 * Membuka modal konfirmasi sebelum menghapus tugas.
 * @param {number} taskId - ID dari tugas yang akan dihapus.
 */
function deleteTask(taskId) {
    taskToDeleteId = taskId; // Simpan ID tugas yang akan dihapus
    deleteConfirmModal.classList.remove('hidden'); // Tampilkan modal konfirmasi
}

/**
 * Membuka formulir tugas dalam mode 'edit'.
 * @param {number} taskId - ID dari tugas yang akan diedit.
 */
function editTask(taskId) {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
        openTaskForm(taskToEdit);
    }
}

// ===================================================================================
// BAGIAN 5: EVENT LISTENERS & INISIALISASI
// ===================================================================================

/**
 * Fungsi inisialisasi utama yang berjalan saat halaman pertama kali dimuat.
 */
function init() {
  checkUser();
  renderDashboard();
}

// Menambahkan 'pendengar' untuk setiap aksi pengguna
welcomeForm.addEventListener('submit', handleWelcomeFormSubmit);
addTaskBtn.addEventListener('click', () => openTaskForm());
taskForm.addEventListener('submit', handleTaskFormSubmit);
closeWelcomeModalBtn.addEventListener('click', () => welcomeModal.classList.add('hidden'));
closeTaskFormModalBtn.addEventListener('click', () => taskFormModal.classList.add('hidden'));

completeTaskBtn.addEventListener('click', () => {
    if (editingTaskId) {
        toggleTaskComplete(editingTaskId);
        taskFormModal.classList.add('hidden');
    }
});

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const priority = card.id.replace('-priority-card', '');
        showTaskListView(priority);
    });
});

backToDashboardBtn.addEventListener('click', showDashboardView);

// Menggunakan Event Delegation untuk tombol di dalam daftar tugas
taskListContainer.addEventListener('click', (event) => {
    const target = event.target;
    const taskItem = target.closest('.task-item');
    if (!taskItem) return;

    const taskId = Number(taskItem.dataset.id);

    if (target.classList.contains('complete-btn')) {
        toggleTaskComplete(taskId);
    } else if (target.classList.contains('edit-btn')) {
        editTask(taskId);
    } else if (target.classList.contains('delete-btn')) {
        deleteTask(taskId);
    }
});

// Event listener untuk modal konfirmasi hapus
cancelDeleteBtn.addEventListener('click', () => {
    deleteConfirmModal.classList.add('hidden');
});

confirmDeleteBtn.addEventListener('click', () => {
    // Logika hapus yang sebenarnya dipindahkan ke sini
    tasks = tasks.filter(task => task.id !== taskToDeleteId);
    saveTasksToLocalStorage(tasks);
    if (currentCategory) { showTaskListView(currentCategory); }
    renderDashboard();
    deleteConfirmModal.classList.add('hidden');
});

// Menjalankan fungsi init() setelah seluruh halaman HTML selesai dimuat.
document.addEventListener('DOMContentLoaded', init);
