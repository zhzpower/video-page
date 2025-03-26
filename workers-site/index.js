// This is a placeholder worker for Cloudflare Pages
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
