#!/bin/bash
set -e

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 显示标题
echo -e "${GREEN}=== 部署 Cloudflare Pages 应用 ===${NC}"

# 构建项目
echo -e "${YELLOW}=== 构建项目 ===${NC}"
npm run build

# 检查构建是否成功
if [ ! -d "out" ] || [ ! -f "out/index.html" ]; then
  echo -e "${RED}错误: 构建失败，'out' 目录或 'index.html' 文件不存在${NC}"
  exit 1
fi

# 部署到Cloudflare Pages
echo -e "${YELLOW}=== 部署到Cloudflare Pages ===${NC}"
echo "使用 'wrangler pages deploy' 命令 (专用于Pages项目)"

# 检查是否在CI环境中运行
if [ -n "$CI" ]; then
  # CI环境中的部署，通常需要认证token
  echo "在CI环境中运行部署..."
  npx wrangler pages deploy out --project-name=video-page
else
  # 本地部署
  echo "本地部署..."
  npx wrangler pages deploy out --project-name=video-page
fi

# 检查部署结果
if [ $? -eq 0 ]; then
  echo -e "${GREEN}=== 部署成功! ===${NC}"
else
  echo -e "${RED}=== 部署失败! ===${NC}"
  exit 1
fi 
