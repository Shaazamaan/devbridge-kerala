import os
import re
from PIL import Image

# Directory where screenshots are stored
input_dir = r"C:\Users\Shaaz\.gemini\antigravity\brain\5a13a4e6-717a-48b4-9f59-8a4327aa1680"
# Output PDF path
output_pdf = r"C:\Users\Shaaz\Downloads\scubiz.pdf"

# Find all slide images
files = [f for f in os.listdir(input_dir) if f.startswith("scubiz_slide_") and f.endswith(".png")]

# Sort files by slide number (extracted from filename like scubiz_slide_01_...)
def get_slide_num(filename):
    match = re.search(r"scubiz_slide_(\d+)", filename)
    return int(match.group(1)) if match else 999

files.sort(key=get_slide_num)

print(f"Found {len(files)} slides. Combining...")

images = []
for f in files:
    img_path = os.path.join(input_dir, f)
    img = Image.open(img_path).convert("RGB")
    images.append(img)

if images:
    # Save as PDF
    images[0].save(output_pdf, save_all=True, append_images=images[1:])
    print(f"Successfully saved PDF to {output_pdf}")
else:
    print("No images found to combine.")
