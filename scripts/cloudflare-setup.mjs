import fs from 'fs';
import path from 'path';

// 配置
const SOURCE_FILES = ['_redirects', '_headers'];
const OUTPUT_DIR = 'out';
const FUNCTIONS_SRC_DIR = 'functions';
const FUNCTIONS_OUT_DIR = path.join(OUTPUT_DIR, FUNCTIONS_SRC_DIR);

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✅ 创建输出目录: ${OUTPUT_DIR}/`);
}

// 检查Next.js是否生成了输出目录
if (!fs.existsSync(path.join(OUTPUT_DIR, 'index.html'))) {
  console.warn('⚠️ 警告: Next.js似乎没有生成完整的静态文件，创建基本的index.html');
  
  // 创建一个简单的index.html
  const basicHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>视频订阅管理</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; color: #333; }
    main { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1 { color: #4338ca; }
    p { line-height: 1.6; }
  </style>
</head>
<body>
  <main>
    <h1>视频订阅管理</h1>
    <p>欢迎使用视频订阅管理系统。系统正在加载中，请稍候...</p>
    <p>如果您长时间看到此页面，可能是API连接出现问题，请检查网络连接或稍后再试。</p>
  </main>
</body>
</html>`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), basicHtml, 'utf8');
  console.log(`✅ 已创建基本的index.html文件`);
  
  // 创建404页面
  fs.writeFileSync(path.join(OUTPUT_DIR, '404.html'), basicHtml.replace('视频订阅管理', '页面未找到').replace('系统正在加载中', '您请求的页面不存在'), 'utf8');
  console.log(`✅ 已创建基本的404.html文件`);
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

// 复制Functions目录
if (fs.existsSync(FUNCTIONS_SRC_DIR)) {
  // 确保目标目录存在
  if (!fs.existsSync(FUNCTIONS_OUT_DIR)) {
    fs.mkdirSync(FUNCTIONS_OUT_DIR, { recursive: true });
  }
  
  // 读取Functions目录下的所有文件
  const functionFiles = fs.readdirSync(FUNCTIONS_SRC_DIR);
  
  // 复制每个文件
  functionFiles.forEach(file => {
    const srcPath = path.join(FUNCTIONS_SRC_DIR, file);
    const destPath = path.join(FUNCTIONS_OUT_DIR, file);
    
    if (fs.statSync(srcPath).isFile()) {
      const content = fs.readFileSync(srcPath, 'utf8');
      fs.writeFileSync(destPath, content, 'utf8');
      console.log(`✅ 已复制函数文件: ${file} 到 ${FUNCTIONS_OUT_DIR}/`);
    }
  });
  
  console.log(`✅ 函数文件复制完成`);
} else {
  console.warn(`⚠️ 警告: ${FUNCTIONS_SRC_DIR}/ 目录不存在，未复制函数文件`);
}

// 创建一个简单的_routes.json文件帮助Cloudflare Pages路由
const ROUTES_FILE = path.join(OUTPUT_DIR, '_routes.json');
const ROUTES_CONTENT = `{
  "version": 1,
  "include": ["/*"],
  "exclude": []
}`;

fs.writeFileSync(ROUTES_FILE, ROUTES_CONTENT, 'utf8');
console.log(`✅ 已创建路由配置: ${ROUTES_FILE}`);

console.log('✅ Cloudflare Pages部署准备完成！'); 
