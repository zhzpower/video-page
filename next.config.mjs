/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出，以便在Cloudflare Pages上部署
  output: 'export',
  
  // 禁用图像优化，因为静态导出不支持它
  images: {
    unoptimized: true,
  },

  // 禁用严格模式以避免开发中的双重渲染
  reactStrictMode: false,
  
  // 注意：headers在静态导出模式下不起作用
  // 对于CORS，需要在Cloudflare Pages的设置中配置
};

export default nextConfig; 
