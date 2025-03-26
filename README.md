# 视频订阅管理系统

这是一个基于Next.js和Cloudflare Pages的视频订阅管理系统，用于展示和管理视频订阅数据。

## 功能特点

- 从API获取视频订阅数据并展示
- 支持分页浏览数据
- 支持搜索筛选功能
- 支持高亮标记重要条目
- 响应式设计，适配移动设备
- 美观的UI界面

## 技术栈

- [Next.js](https://nextjs.org/) - React框架
- [React](https://reactjs.org/) - JavaScript库
- [TypeScript](https://www.typescriptlang.org/) - 类型系统
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [React Query](https://tanstack.com/query) - 数据获取库
- [Axios](https://axios-http.com/) - HTTP客户端
- [React Hot Toast](https://react-hot-toast.com/) - 通知组件

## 快速开始

### 开发环境

```bash
# 克隆项目
git clone [repository-url]

# 进入项目目录
cd video-page

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 生产构建

```bash
# 构建应用
npm run build

# 本地预览生产构建
npm run start
```

## 部署到Cloudflare Pages

1. 将代码推送到GitHub仓库
2. 在Cloudflare Pages中创建新项目
3. 连接GitHub仓库
4. 设置构建命令为 `npm run build`
5. 设置输出目录为 `out`
6. 部署完成后，可通过Cloudflare Pages分配的域名访问

## API说明

该项目使用以下API获取数据：

- 视频订阅列表：`https://db.video.zhz99.cn/api/subscriptions?page=1`

API返回的数据结构：

```json
{
  "result": {
    "data": [
      {
        "id": 668,
        "name": "少年歌行 血染天启篇 (2025)",
        "origin_name": "少年歌行 血染天启篇 (2025) 【更新13 4K】 【热播国漫】",
        "url": "https://pan.quark.cn/s/1d1c8ef20d15",
        "source": "quark",
        "createdAt": "2025-03-26T03:20:38.264Z",
        "updatedAt": "2025-03-26T03:40:33.928Z"
      },
      // ...更多数据
    ],
    "pagination": {
      "current": 2,
      "pageSize": 50,
      "total": 694,
      "totalPages": 14
    }
  }
}
```

## 本地存储

系统使用浏览器的localStorage存储用户高亮的视频名称，方便用户在下次访问时查看之前已高亮的内容。

## 许可证

[MIT](LICENSE)
