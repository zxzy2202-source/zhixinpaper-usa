const fs = require('fs');
const path = require('path');

function findFiles(dir, pattern) {
  let results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(findFiles(fullPath, pattern));
    } else if (item.name === pattern) {
      results.push(fullPath);
    }
  }
  return results;
}

const appDir = path.join(process.cwd(), 'src', 'app');
const files = findFiles(appDir, 'page.tsx');

let fixedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(process.cwd(), file);
  
  // Match title strings that end with " | Zhixin Paper" or " — Zhixin Paper"
  const regex = /title:\s*"(.+?)(\s*[\|—–]\s*Zhixin Paper)"/g;
  
  let hasMatch = false;
  let newContent = content.replace(regex, (match, mainTitle, suffix) => {
    hasMatch = true;
    fixedCount++;
    console.log(`Fixed: ${relPath}`);
    console.log(`  Before: title: "${mainTitle}${suffix}"`);
    console.log(`  After:  title: "${mainTitle}"`);
    return `title: "${mainTitle}"`;
  });
  
  if (hasMatch) {
    fs.writeFileSync(file, newContent);
  }
});

console.log(`\nTotal fixed: ${fixedCount} titles`);
