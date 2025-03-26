// Cloudflare Pages 中间件处理所有请求
export async function onRequest({ request, next }) {
  // 获取请求URL信息
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // 记录请求信息
  console.log(`请求: ${pathname}`);
  
  try {
    // 尝试继续处理请求
    const response = await next();
    
    // 如果找到资源就返回
    if (response.status < 400) {
      return response;
    }
    
    // 如果是404, 尝试返回自定义404页面
    if (response.status === 404) {
      console.log(`未找到资源: ${pathname} - 尝试返回404页面`);
      // 尝试获取自定义404页面
      return fetch(new URL('/404.html', url.origin));
    }
    
    return response;
  } catch (err) {
    console.error(`请求处理错误: ${err.message}`);
    return new Response('服务器错误，请稍后再试', { status: 500 });
  }
} 
