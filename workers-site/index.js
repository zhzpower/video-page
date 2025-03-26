// Cloudflare Worker for serving static assets from Cloudflare Pages
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let pathname = url.pathname;
    
    // 默认路径处理
    if (pathname === '/' || pathname === '') {
      return fetch(new URL('/index.html', url.origin));
    }
    
    // 尝试获取请求的资源
    const response = await fetch(request);
    
    // 如果资源存在，直接返回
    if (response.ok) {
      return response;
    }
    
    // 处理404情况，尝试返回自定义404页面
    return fetch(new URL('/404.html', url.origin));
  }
};
