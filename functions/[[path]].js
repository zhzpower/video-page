// 处理所有路径的函数
export async function onRequest({ request, next }) {
  try {
    // 尝试正常响应请求
    return await next();
  } catch (err) {
    console.error(`路径处理错误: ${err.message}`);
    
    // 返回SPA的index.html用于客户端路由
    const url = new URL(request.url);
    return fetch(new URL('/index.html', url.origin));
  }
} 
