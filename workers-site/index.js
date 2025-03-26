// This is a placeholder worker for Cloudflare Pages
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
