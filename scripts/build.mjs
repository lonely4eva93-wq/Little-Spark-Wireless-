import fs from 'fs';
import path from 'path';

const dist = './dist';

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

const files = ['index.html', 'style.css', 'app.js'];

for (const file of files) {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(dist, file));
  } else {
    console.warn(`Skipping missing file: ${file}`);
  }
}

console.log('⚡ Little Spark build complete');
