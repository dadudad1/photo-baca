import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = './public/assets';
const outputDir = './public/assets';

async function optimizeImages() {
    const files = fs.readdirSync(assetsDir);

    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const inputPath = path.join(assetsDir, file);
            const filename = path.parse(file).name;
            const outputPath = path.join(outputDir, `${filename}.webp`);

            console.log(`Optimizing ${file}...`);

            try {
                await sharp(inputPath)
                    .resize(1920, 1080, { // Resize to max 1920x1080, maintaining aspect ratio
                        fit: 'inside',
                        withoutEnlargement: true
                    })
                    .webp({ quality: 80 }) // Convert to WebP with 80% quality
                    .toFile(outputPath);

                console.log(`Saved to ${outputPath}`);

                // Optional: Remove original file to save space/confusion, 
                // but maybe keep them for safety? User asked to make loading faster, 
                // so replacing usage is key. I'll keep originals for now but index.html will use webp.
            } catch (error) {
                console.error(`Error optimizing ${file}:`, error);
            }
        }
    }
}

optimizeImages();
