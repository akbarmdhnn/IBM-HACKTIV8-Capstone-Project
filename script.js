// ===================================================================================
// BAGIAN 1: SELEKSI ELEMEN DOM & INISIALISASI DATA
// ===================================================================================

// --- Seleksi Elemen dari HTML ---
// Mengambil semua elemen interaktif dari HTML agar bisa dimanipulasi oleh JavaScript.
const welcomeModal = document.getElementById('welcome-modal');
const welcomeForm = document.getElementById('welcome-form');
const usernameInput = document.getElementById('username-input');

const taskFormModal = document.getElementById('task-form-modal');
const taskForm = document.getElementById('task-form');
const addTaskBtn = document.getElementById('add-task-btn');
const formTitle = document.getElementById('form-title');
const taskFormSubmitBtn = document.getElementById('task-form-submit-btn');

const profileAvatar = document.querySelector('.profile-avatar');
const profileName = document.querySelector('.profile-name');
const profileStats = document.querySelector('.profile-stats');

// --- Inisialisasi Data ---
// `tasks` adalah array utama yang akan menyimpan semua objek tugas.
// Saat aplikasi dimuat, kita coba ambil data dari localStorage. Jika tidak ada, kita mulai dengan array kosong.
let tasks = getTasksFromLocalStorage();
let currentUser = localStorage.getItem('username') || '';
let editingTaskId = null; // Variabel untuk melacak tugas mana yang sedang di-edit.

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
  // Menampilkan nama di bagian profil
  profileName.textContent = name;
  
  // Membuat inisial dari nama (misal: "Akbar Ramadhan" -> "AR")
  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
  profileAvatar.textContent = initials;
}

/**
 * Memperbarui tampilan dashboard (kartu kategori).
 * Menghitung jumlah tugas dan persentase penyelesaian untuk setiap prioritas.
 */
function renderDashboard() {
  // Filter tugas berdasarkan prioritas
  const highPriorityTasks = tasks.filter(task => task.priority === 'high');
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium');
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low');

  // Hitung tugas yang sudah selesai untuk setiap prioritas
  const highCompleted = highPriorityTasks.filter(task => task.isCompleted).length;
  const mediumCompleted = mediumPriorityTasks.filter(task => task.isCompleted).length;
  const lowCompleted = lowPriorityTasks.filter(task => task.isCompleted).length;

  // Fungsi internal untuk memperbarui satu kartu kategori
  const updateCategoryCard = (cardId, tasks, completed) => {
    const card = document.getElementById(cardId);
    const countElement = card.querySelector('.task-count');
    const percentageElement = card.querySelector('.task-percentage');
    
    countElement.textContent = `${tasks.length} Tugas`;
    // Hindari pembagian dengan nol jika tidak ada tugas
    const percentage = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
    percentageElement.textContent = `${percentage}% Selesai`;
  };

  // Perbarui setiap kartu
  updateCategoryCard('high-priority-card', highPriorityTasks, highCompleted);
  updateCategoryCard('medium-priority-card', mediumPriorityTasks, mediumCompleted);
  updateCategoryCard('low-priority-card', lowPriorityTasks, lowCompleted);
  
  // (Nanti bisa ditambahkan untuk update statistik profil utama)
}


// ===================================================================================
// BAGIAN 3: FUNGSI-FUNGSI UNTUK MODAL (POP-UP)
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
    taskForm.reset(); // Selalu bersihkan form terlebih dahulu
    if (taskToEdit) {
        // Mode Ubah
        formTitle.textContent = "Ubah Tugas";
        taskForm.querySelector('#task-name-input').value = taskToEdit.name;
        taskForm.querySelector('#task-description-input').value = taskToEdit.description;
        taskForm.querySelector('#task-deadline-input').value = taskToEdit.deadline;
        taskForm.querySelector('#task-priority-select').value = taskToEdit.priority;
        taskFormSubmitBtn.textContent = "Simpan Perubahan";
        editingTaskId = taskToEdit.id; // Simpan ID tugas yang sedang diedit
    } else {
        // Mode Tambah
        formTitle.textContent = "Tambah Tugas Baru";
        taskFormSubmitBtn.textContent = "Tambah Tugas";
        editingTaskId = null; // Pastikan tidak ada ID yang tersimpan
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
    
    // Mengambil nilai dari setiap field di form
    const taskName = document.getElementById('task-name-input').value;
    const taskDesc = document.getElementById('task-description-input').value;
    const taskDeadline = document.getElementById('task-deadline-input').value;
    const taskPriority = document.getElementById('task-priority-select').value;

    if (editingTaskId) {
        // Logika untuk MENGUBAH tugas yang ada
        const taskIndex = tasks.findIndex(task => task.id === editingTaskId);
        if (taskIndex > -1) {
            tasks[taskIndex].name = taskName;
            tasks[taskIndex].description = taskDesc;
            tasks[taskIndex].deadline = taskDeadline;
            tasks[taskIndex].priority = taskPriority;
        }
    } else {
        // Logika untuk MENAMBAH tugas baru
        const newTask = {
            id: Date.now(), // ID unik berdasarkan waktu saat ini
            name: taskName,
            description: taskDesc,
            deadline: taskDeadline,
            priority: taskPriority,
            isCompleted: false // Tugas baru selalu dimulai dengan status belum selesai
        };
        tasks.push(newTask);
    }

    saveTasksToLocalStorage(tasks); // Simpan array tugas yang sudah diperbarui
    renderDashboard(); // Perbarui tampilan dashboard
    taskFormModal.classList.add('hidden'); // Sembunyikan modal form
}


// ===================================================================================
// BAGIAN 4: EVENT LISTENERS & INISIALISASI
// ===================================================================================

/**
 * Fungsi inisialisasi utama yang berjalan saat halaman pertama kali dimuat.
 */
function init() {
  checkUser();
  renderDashboard();
  // (Nanti kita akan tambahkan render daftar tugas di sini)
}

// Menambahkan 'pendengar' untuk setiap aksi pengguna
welcomeForm.addEventListener('submit', handleWelcomeFormSubmit);
addTaskBtn.addEventListener('click', () => openTaskForm());
taskForm.addEventListener('submit', handleTaskFormSubmit);

// Menjalankan fungsi init() setelah seluruh halaman HTML selesai dimuat.
document.addEventListener('DOMContentLoaded', init);
