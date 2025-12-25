import os
import base64

def generate_assets():
    images_dir = 'frontend/public/images/characters'
    if not os.path.exists(images_dir):
        print(f"Directory not found: {images_dir}")
        return

    files = os.listdir(images_dir)
    output = 'export const CHAR_IMAGES: Record<string, string> = {\n'
    
    count = 0
    for f in files:
        if f.lower().endswith(('.webp', '.jpg', '.png')):
            file_path = os.path.join(images_dir, f)
            with open(file_path, 'rb') as img:
                b64 = base64.b64encode(img.read()).decode('utf-8')
                ext = 'png' if f.endswith('.png') else 'jpeg' if f.endswith('.jpg') else 'webp'
                output += f'    "{f}": "data:image/{ext};base64,{b64}",\n'
                count += 1
    
    output += '};\n'
    
    with open('frontend/app/og/kpop-assets.ts', 'w', encoding='utf-8') as f:
        f.write(output)
    
    print(f"Generated {count} assets in kpop-assets.ts")

if __name__ == '__main__':
    generate_assets()
