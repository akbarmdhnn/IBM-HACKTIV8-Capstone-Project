# TugasKu - Personal Task Manager

## Deskripsi

TugasKu adalah sebuah aplikasi web sederhana yang dirancang untuk membantu pengguna mengelola tugas harian mereka dengan lebih efisien. Aplikasi ini memungkinkan pengguna untuk membuat, membaca, memperbarui, dan menghapus (CRUD) daftar tugas mereka. Proyek ini dibuat sebagai bagian dari Capstone Project Hacktiv8 x IBM SkillsBuild dengan fokus pada pengembangan antarmuka yang dinamis dan pemanfaatan AI sebagai alat bantu pengembangan.

---

## Fitur Utama

* **Buat Tugas Baru**: Pengguna dapat menambahkan tugas baru lengkap dengan nama tugas, tenggat waktu, dan tingkat prioritas (Tinggi, Sedang, Rendah).
* **Daftar Tugas Dinamis**: Menampilkan semua tugas dalam antarmuka yang bersih. Tampilan akan diperbarui secara *real-time* setiap kali ada perubahan data, tanpa perlu me-reload halaman.
* **Tandai Tugas Selesai**: Pengguna dapat menandai tugas yang sudah selesai, yang akan memberikan efek visual coretan pada tugas tersebut.
* **Prioritas Visual**: Setiap tugas memiliki penanda warna berdasarkan prioritasnya untuk membantu pengguna fokus pada hal yang paling penting.
* **Penyimpanan Lokal**: Semua data tugas disimpan dengan aman di `localStorage` browser, sehingga daftar tugas tidak akan hilang bahkan setelah browser ditutup.

---

## Teknologi yang Digunakan

* **HTML5**: Untuk struktur dan kerangka konten aplikasi.
* **CSS3**: Untuk desain, tata letak, dan membuat antarmuka yang responsif.
* **JavaScript (ES6)**: Untuk semua logika aplikasi, interaktivitas, manipulasi DOM, dan manajemen data.
* **localStorage API**: Sebagai mekanisme penyimpanan data di sisi klien (browser).
* **Git & GitHub**: Untuk kontrol versi dan manajemen kode.

---

## Instruksi Setup

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone repository ini:**
    ```bash
    git clone https://github.com/akbarmdhnn/proyek-tugasku.git
    ```
2.  **Buka folder proyek:**
    ```bash
    cd proyek-tugasku
    ```
3.  **Buka file `index.html`** langsung di browser pilihan Anda. Tidak ada instalasi atau dependensi lain yang diperlukan.

---

## Penjelasan Dukungan AI

Dalam pengembangan aplikasi TugasKu, **AI IBM Granite (via Replicate API)** digunakan sebagai asisten kode (*code assistant*) untuk mempercepat dan meningkatkan beberapa aspek pengembangan. AI tidak menjadi bagian dari produk akhir, melainkan hanya sebagai alat bantu selama proses *coding*.

Contoh penggunaan AI dalam proyek ini:

* **Generasi Komponen UI**: AI diminta untuk membuatkan struktur HTML dan CSS untuk komponen-komponen spesifik, seperti formulir input tugas dan kartu tampilan tugas.
    * *Contoh Prompt: "Generate HTML and CSS for a task input form with fields for 'task name', 'deadline', and 'priority'."*
* **Pembuatan Logika Inti**: AI membantu dalam menulis fungsi-fungsi JavaScript yang krusial, seperti fungsi untuk menyimpan data ke `localStorage` dan fungsi untuk menampilkan (merender) daftar tugas secara dinamis di halaman.
    * *Contoh Prompt: "Write a JavaScript function named 'saveTasks' that saves an array of task objects to the browser's localStorage."*
* **Debugging & Refactoring**: AI digunakan untuk menganalisis blok kode yang tidak berjalan sesuai harapan dan memberikan saran untuk perbaikan agar kode lebih efisien dan mudah dibaca.

Penggunaan AI secara signifikan mengurangi waktu yang dihabiskan untuk menulis kode boilerplate dan memungkinkan fokus yang lebih besar pada implementasi logika inti dan pengalaman pengguna.