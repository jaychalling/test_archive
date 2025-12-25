import os
from PIL import Image

# Directory containing images
img_dir = os.path.join(os.getcwd(), 'frontend', 'public', 'images', 'characters')

# Iterate and convert
for filename in os.listdir(img_dir):
    if filename.lower().endswith('.webp'):
        filepath = os.path.join(img_dir, filename)
        new_filename = os.path.splitext(filename)[0] + '.png'
        new_filepath = os.path.join(img_dir, new_filename)
        
        try:
            with Image.open(filepath) as im:
                im.save(new_filepath, 'PNG')
                print(f"Converted {filename} to {new_filename}")
        except Exception as e:
            print(f"Failed to convert {filename}: {e}")

print("Conversion complete.")
