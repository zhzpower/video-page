#!/bin/bash
set -e  # 遇到错误立即退出

# 打印信息
echo "=== 开始部署 ==="

# 构建项目
echo "1. 运行构建..."
npm run build

# 部署到Cloudflare Pages
echo "2. 部署到Cloudflare Pages..."
npx wrangler pages deploy out --commit-dirty=true

echo "=== 部署完成 ===" 
