# **IBM-HACKTIV8-Capstone-Project: Aplikasi Task Manager**

## **Link Deployment: https://akbarmdhnn.github.io/IBM-HACKTIV8-Capstone-Project/**

## **Deskripsi**

Aplikasi ini adalah sebuah *Personal Task Manager* berbasis web dengan fungsionalitas CRUD (Create, Read, Update, Delete) penuh. Dirancang dengan pendekatan *mobile-first*, aplikasi ini membantu pengguna untuk mengelola tugas harian mereka secara efisien melalui antarmuka yang bersih, modern, dan responsif. Proyek ini dibuat sebagai bagian dari Capstone Project HACKTIV8 x IBM SkillsBuild, dengan fokus utama pada pemanfaatan AI (IBM Granite) untuk mempercepat dan meningkatkan kualitas proses pengembangan kode.

## **Fitur Utama**

* **Dashboard Personal:** Menyambut pengguna dengan nama dan avatar inisial, serta menampilkan ringkasan total tugas dan persentase penyelesaian secara keseluruhan.
* **Manajemen Kategori:** Tugas secara otomatis dikelompokkan ke dalam tiga kategori: "Prioritas Tinggi", "Prioritas Menengah", dan "Prioritas Rendah".
* **Navigasi Intuitif:** Pengguna dapat dengan mudah berpindah dari tampilan dashboard utama ke daftar tugas yang lebih detail untuk setiap kategori.
* **Fungsionalitas CRUD Lengkap:**
    * **Create:** Menambah tugas baru melalui formulir pop-up (modal) yang intuitif.
    * **Read:** Melihat daftar tugas yang terorganisir berdasarkan prioritas.
    * **Update:** Mengubah detail tugas yang sudah ada, termasuk menandai tugas sebagai "Selesai".
    * **Delete:** Menghapus tugas yang sudah tidak relevan.
* **Penyimpanan Lokal:** Semua data pengguna dan tugas disimpan dengan aman di `localStorage` browser, memastikan data tidak hilang saat halaman di-*refresh*.
* **Desain Responsif:** Tampilan aplikasi beradaptasi dengan mulus di berbagai ukuran perangkat, mulai dari ponsel, tablet, hingga desktop.

## **Teknologi yang Digunakan**

* **Frontend:**
    * **HTML5:** Untuk struktur semantik konten aplikasi.
    * **CSS3:** Untuk desain, tata letak, dan memastikan responsivitas.
    * **JavaScript (ES6):** Untuk semua logika aplikasi, interaktivitas, manipulasi DOM, dan manajemen data.
* **Penyimpanan:**
    * **localStorage API:** Sebagai mekanisme penyimpanan data di sisi klien (browser).
* **Tools & Pengembangan:**
    * **Git & GitHub:** Untuk kontrol versi dan manajemen kode.
    * **IBM Granite (via Replicate API):** Sebagai asisten AI untuk generasi kode.
    * **Visual Studio Code:** Sebagai editor kode utama.

## **Instruksi Setup**

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/akbarmdhnn/IBM-HACKTIV8-Capstone-Project.git](https://github.com/akbarmdhnn/IBM-HACKTIV8-Capstone-Project.git)
    ```

2.  **Buka folder proyek:**
    ```bash
    cd IBM-HACKTIV8-Capstone-Project
    ```

3.  **Buka file `index.html`** langsung di browser pilihan Anda. Tidak ada instalasi atau dependensi lain yang diperlukan.

## **Penjelasan Dukungan AI (IBM Granite)**

Dalam pengembangan aplikasi ini, **AI IBM Granite** digunakan secara strategis sebagai asisten kode (*code assistant*). Pendekatan ini tidak hanya untuk menghasilkan kode, tetapi juga untuk menerapkan praktik *prompt engineering* yang efektif sesuai dengan materi pembelajaran. Berikut adalah rincian penggunaan AI dalam setiap tahap pengembangan:

### **Tahap 1: Pembuatan Kerangka HTML (Struktur)**

Proses pembuatan HTML dipecah menjadi beberapa *prompt* modular untuk memastikan AI menghasilkan output yang lengkap dan fokus.

**Prompt #1: Kerangka HTML Dashboard**
* **Tujuan:** Menghasilkan struktur HTML dasar yang bersih dan semantik khusus untuk halaman utama.
* **Metode:** Menggunakan **Zero-Shot Prompting** dengan instruksi yang sangat detail mengenai nama `class` dan `id` untuk memastikan fondasi yang kuat.
* **Prompt:**
    ```
    You are an expert frontend web developer... Generate the complete HTML code for the main dashboard view ONLY... IMPORTANT: Do NOT include the HTML for any modals or pop-ups...
    ```

**Prompt #2: HTML Modal Selamat Datang**
* **Tujuan:** Menghasilkan potongan kode HTML yang terisolasi khusus untuk komponen pop-up "Selamat Datang".
* **Metode:** Melanjutkan **Zero-Shot Prompting** dengan fokus pada pembuatan elemen formulir yang sederhana dan efektif.
* **Prompt:**
    ```
    Generate the HTML code ONLY for a welcome modal (pop-up)... IMPORTANT: Provide only the raw HTML code for the modal structure...
    ```

**Prompt #3: HTML Modal Formulir Tugas**
* **Tujuan:** Menghasilkan kode HTML untuk pop-up formulir yang lebih kompleks untuk menambah/mengubah tugas.
* **Metode:** Menggunakan **Zero-Shot Prompting** dengan permintaan spesifik untuk elemen formulir (`label`, `input`, `textarea`, `select`) dan `id` unik untuk setiap elemen.
* **Prompt:**
    ```
    Generate the HTML code ONLY for a task form modal (pop-up)... Inside the form, create label and input/select/textarea pairs for the following fields...
    ```

### **Tahap 2: Pembuatan "Otak" Aplikasi (JavaScript)**

Logika aplikasi juga dibangun secara bertahap dengan *prompt* yang spesifik.

**Prompt #4: Logika Dasar JavaScript**
* **Tujuan:** Menghasilkan fondasi kode JavaScript, termasuk selektor DOM, struktur data, dan fungsi inti untuk `localStorage`.
* **Metode:** **Zero-Shot Prompting** dengan permintaan eksplisit untuk menyertakan komentar penjelas pada setiap fungsi, menerapkan praktik kode yang bersih.
* **Prompt:**
    ```
    Generate the fundamental JavaScript code. The code must be well-commented to explain the purpose of each function. Please provide... DOM Element Selectors, Data Structure, Core Functions with Comments...
    ```

*(Catatan: Prompt #5, #6, dan seterusnya untuk logika JavaScript yang lebih detail mengikuti pola yang sama, dengan memberikan konteks dari kode yang sudah ada dan meminta fungsi-fungsi baru yang terintegrasi.)*

### **Tahap 3: Pembuatan Desain (CSS)**

Desain CSS juga dibuat secara modular untuk memastikan kualitas dan kelengkapan.

**Prompt #7: CSS Layout & Profil**
* **Tujuan:** Menghasilkan kode CSS untuk fondasi layout dan bagian profil, dengan penekanan pada responsivitas sejak awal.
* **Metode:** **Zero-Shot Prompting** dengan menyediakan aset desain yang jelas (nama font, palet warna) untuk memastikan konsistensi visual.
* **Prompt:**
    ```
    Generate the CSS code ONLY for the main layout and the profile section... Use the "Inter" font... Use this color palette... Make the layout responsive using media queries...
    ```

*(Catatan: Prompt #8 dan #9 untuk kartu kategori dan modal mengikuti pola yang sama, dengan menargetkan kelas CSS spesifik dan meminta gaya yang konsisten.)*

**Dampak Keseluruhan Penggunaan AI:**
Penggunaan AI dengan pendekatan *prompting* yang terstruktur ini secara signifikan mempercepat fase pengembangan awal, mengotomatiskan penulisan kode *boilerplate*, dan memungkinkan saya untuk lebih fokus pada arsitektur aplikasi, logika bisnis, dan penyempurnaan pengalaman pengguna.
