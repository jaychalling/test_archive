const fs = require('fs');
const path = require('path');

const charsDir = path.join(process.cwd(), 'frontend', 'public', 'images', 'characters');
const outputFile = path.join(process.cwd(), 'frontend', 'app', 'api', 'og', 'kpop-assets.ts');

const files = fs.readdirSync(charsDir);
const assets = {};

files.forEach(file => {
    if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp')) {
        const filePath = path.join(charsDir, file);
        const buffer = fs.readFileSync(filePath);
        const base64 = buffer.toString('base64');
        let mime = 'image/jpeg';
        if (file.endsWith('.png')) mime = 'image/png';
        if (file.endsWith('.webp')) mime = 'image/webp';

        assets[file] = `data:${mime};base64,${base64}`;
    }
});

const content = `export const CHAR_IMAGES: Record<string, string> = ${JSON.stringify(assets, null, 4)};\n`;

fs.writeFileSync(outputFile, content);
console.log('Assets generated successfully!');
