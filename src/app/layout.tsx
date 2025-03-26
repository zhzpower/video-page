import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "视频订阅管理",
  description: "浏览和管理您的视频订阅数据，支持分页和高亮功能",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <footer className="bg-white py-6 border-t">
          <div className="container mx-auto px-4">
            <div className="text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} 视频订阅管理系统</p>
              <p className="mt-1">基于Cloudflare Pages构建</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
