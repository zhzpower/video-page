const fs = require('fs');
const path = require('path');

const SOURCE_FILES = ['_redirects', '_headers'];
const OUTPUT_DIR = 'out';

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 复制每个文件到输出目录
SOURCE_FILES.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(path.join(OUTPUT_DIR, file), content, 'utf8');
    console.log(`已复制 ${file} 到 ${OUTPUT_DIR}/`);
  } else {
    console.warn(`警告: ${file} 不存在，已跳过`);
  }
});

console.log('静态文件复制完成！'); 
