const fs = require('fs');
const path = require('path');

// 配置
const SOURCE_FILES = ['_redirects', '_headers'];
const OUTPUT_DIR = 'out';

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 复制重定向和头文件
console.log('正在配置Cloudflare Pages部署...');

SOURCE_FILES.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(path.join(OUTPUT_DIR, file), content, 'utf8');
    console.log(`✅ 已复制 ${file} 到 ${OUTPUT_DIR}/`);
  } else {
    console.warn(`⚠️ 警告: ${file} 不存在，已跳过`);
  }
});

// 确保有一个空的workers-site目录
const WORKERS_SITE_DIR = 'workers-site';
if (!fs.existsSync(WORKERS_SITE_DIR)) {
  fs.mkdirSync(WORKERS_SITE_DIR, { recursive: true });
  console.log(`✅ 已创建 ${WORKERS_SITE_DIR}/ 目录`);
}

// 创建一个简单的worker文件
const WORKER_FILE = path.join(WORKERS_SITE_DIR, 'index.js');
const WORKER_CONTENT = `// This is a placeholder worker for Cloudflare Pages
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Get the URL from the request
  const url = new URL(request.url)
  
  // Rewrite the URL to point to the static assets
  let path = url.pathname
  
  // Default to index.html for the root path
  if (path === '/' || path === '') {
    path = '/index.html'
  }
  
  // Try to fetch the static asset
  const response = await fetch(path)
  return response
}
`;

fs.writeFileSync(WORKER_FILE, WORKER_CONTENT, 'utf8');
console.log(`✅ 已创建worker文件: ${WORKER_FILE}`);

console.log('✅ Cloudflare Pages部署准备完成！'); 
