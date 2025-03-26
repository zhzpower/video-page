import fs from 'fs';
import path from 'path';

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

// 创建一个简单的worker文件，修复URL处理
const WORKER_FILE = path.join(WORKERS_SITE_DIR, 'index.js');
const WORKER_CONTENT = `// This is a placeholder worker for Cloudflare Pages
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 获取原始URL
  const url = new URL(request.url)
  
  // 提取路径
  let pathname = url.pathname
  
  // 默认首页
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html'
  }
  
  // 构建新的请求，使用相同的基本URL但更改路径
  const assetUrl = new URL(pathname, url.origin)
  
  try {
    // 尝试获取静态资源
    const response = await fetch(assetUrl)
    if (response.ok) return response
    
    // 如果没有找到资源，返回404页面
    if (pathname !== '/404.html') {
      const notFoundResponse = await fetch(new URL('/404.html', url.origin))
      if (notFoundResponse.ok) return new Response(await notFoundResponse.text(), {
        status: 404,
        headers: { 'Content-Type': 'text/html' }
      })
    }
    
    return response
  } catch (e) {
    return new Response('服务器错误，请稍后再试', { status: 500 })
  }
}
`;

fs.writeFileSync(WORKER_FILE, WORKER_CONTENT, 'utf8');
console.log(`✅ 已创建worker文件: ${WORKER_FILE}`);

console.log('✅ Cloudflare Pages部署准备完成！'); 
