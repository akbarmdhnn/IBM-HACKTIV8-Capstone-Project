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
# PROMPT #9: Meminta Kode CSS untuk Modal (Pop-up)
# ==============================================================================
prompt_to_run = """
You are an expert frontend web developer.

Question: Generate the CSS code ONLY for the modals (pop-ups) of the Task Manager application.

Context & Requirements:
- The CSS is for an external `style.css` file.
- Use this color palette:
    - Modal Background: #FFFFFF
    - Overlay Background: rgba(0, 0, 0, 0.6)
    - Main Text: #2C3E50
    - Primary Button: #3498DB

The CSS must style:
1.  The modal overlay (`.modal-overlay`): It should cover the entire screen (`position: fixed`), have a semi-transparent dark background, and be centered using flexbox.
2.  The `.hidden` class: This class must set `display: none` to hide the modals by default.
3.  The modal content box (`.modal-content`): It should have a white background, padding, a border-radius, and a box-shadow. It should also have a max-width and be responsive.
4.  The form elements inside the modal (`form`, `input`, `textarea`, `select`, `button`): Style them to be clean, with full width, proper spacing, and modern aesthetics. The submit button should use the primary accent color and have a hover effect.

IMPORTANT: Provide only the raw CSS code. Do NOT include any explanation or markdown formatting.
"""

# --- MENJALANKAN SCRIPT ---
print("--- MEMBUAT KODE CSS (MODAL & FORMULIR) ---")
generated_code = generate_code_from_ai(prompt_to_run)

if generated_code:
    print("--- KODE CSS YANG DIHASILKAN ---")
    print(generated_code)
    print("--------------------------------\n")

print("Selesai.")
