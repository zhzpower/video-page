// 首页处理函数
export async function onRequest({ request }) {
  const url = new URL(request.url);
  return fetch(new URL('/index.html', url.origin));
} 
