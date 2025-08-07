# Mengimpor library yang kita butuhkan
import os
import replicate
from dotenv import load_dotenv

# Memuat API Key rahasia dari file .env
load_dotenv()

# --- FUNGSI UNTUK MENJALANKAN AI ---
def generate_code_from_ai(prompt_text):
    """Fungsi ini mengirimkan prompt ke AI dan mengembalikan hasilnya."""
    print("Sedang mengirimkan instruksi ke AI...")
    try:
        output_iterator = replicate.run(
            "ibm-granite/granite-3.3-8b-instruct",
            input={
                "prompt": prompt_text,
                "max_new_tokens": 4096,
                "temperature": 0.2,
            }
        )
        print("AI sedang memproses... Mohon tunggu.\n")
        
        generated_code = ""
        for item in output_iterator:
            if isinstance(item, str):
                generated_code += item
        
        return generated_code

    except Exception as e:
        print(f"\nTerjadi kesalahan: {e}")
        return None

# ==============================================================================
# PROMPT #7: Meminta Logika JavaScript untuk Aksi pada Item Tugas
# ==============================================================================
prompt_to_run = """
You are an expert JavaScript developer.

Context:
- The HTML for the task list is generated dynamically inside a container with id `task-list-container`.
- Each task item has a unique `data-id` attribute.
- Each task item has buttons with classes `.complete-btn`, `.edit-btn`, and `.delete-btn`.
- We have an array `tasks` and functions `saveTasksToLocalStorage`, `renderDashboard`, and `openTaskForm`.

Question: Generate the JavaScript code to handle clicks on the action buttons within the task list. The code must be well-commented.

Please provide the following:
1.  **Event Delegation**: An event listener on the `task-list-container` to handle clicks on the action buttons efficiently.
2.  **Functions with Comments**:
    - A function `toggleTaskComplete(taskId)` that finds a task by its ID in the `tasks` array and flips its `isCompleted` status.
    - A function `deleteTask(taskId)` that removes a task from the `tasks` array based on its ID.
    - A function `editTask(taskId)` that finds a task by its ID and calls the `openTaskForm` function, passing the found task object.
3.  **Integration**: Inside the main event listener, write the logic to check which button was clicked (using `event.target.classList.contains`) and call the appropriate function (`toggleTaskComplete`, `deleteTask`, or `editTask`), passing the task's ID. After each action, the tasks should be saved and the UI should be re-rendered.

IMPORTANT: Provide only the raw JavaScript code. Do NOT include any HTML, CSS, or markdown formatting.
"""

# --- MENJALANKAN SCRIPT ---
print("--- MEMBUAT LOGIKA JAVASCRIPT (AKSI TUGAS) ---")
generated_code = generate_code_from_ai(prompt_to_run)

if generated_code:
    print("--- KODE JAVASCRIPT YANG DIHASILKAN ---")
    print(generated_code)
    print("-----------------------------------------\n")

print("Selesai.")
