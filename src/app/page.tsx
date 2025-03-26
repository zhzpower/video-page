'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useSubscriptions } from '../hooks/useSubscriptions';
import SubscriptionItem from '../components/SubscriptionItem';
import Pagination from '../components/Pagination';

// 创建 React Query 客户端
const queryClient = new QueryClient();

// 应用容器组件
function SubscriptionsApp() {
  const {
    subscriptions,
    pagination,
    isLoading,
    isError,
    highlightedNames,
    handleToggleHighlight,
    handlePageChange,
  } = useSubscriptions();

  // 支持搜索功能
  const [searchTerm, setSearchTerm] = useState('');
  
  // 过滤订阅数据
  const filteredSubscriptions = searchTerm
    ? subscriptions.filter(sub => 
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        sub.origin_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : subscriptions;

  // 高亮项目计数
  const highlightedCount = filteredSubscriptions.filter(sub => 
    highlightedNames.includes(sub.name)
  ).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">视频订阅列表</h1>
        <p className="text-gray-600">浏览和管理您的视频订阅</p>
      </header>

      {/* 搜索和过滤区 */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            className="block w-full p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500" 
            placeholder="搜索名称..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="text-gray-700">
          {highlightedCount > 0 && (
            <span className="mr-2 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
              已高亮: {highlightedCount}
            </span>
          )}
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
            总数: {filteredSubscriptions.length}
          </span>
        </div>
      </div>

      {/* 内容区 */}
      <div className="mb-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em]" role="status">
              <span className="sr-only">加载中...</span>
            </div>
            <p className="mt-2 text-gray-600">加载数据中...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="font-medium text-lg">获取数据失败</p>
            <p className="mt-1">请检查您的网络连接或稍后重试</p>
          </div>
        ) : filteredSubscriptions.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="font-medium text-lg">没有找到订阅数据</p>
            <p className="mt-1">尝试使用不同的搜索条件</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredSubscriptions.map((subscription) => (
              <SubscriptionItem
                key={subscription.id}
                subscription={subscription}
                isHighlighted={highlightedNames.includes(subscription.name)}
                onToggleHighlight={handleToggleHighlight}
              />
            ))}
          </div>
        )}
      </div>

      {/* 分页区 */}
      {pagination && filteredSubscriptions.length > 0 && !searchTerm && (
        <Pagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

// 主页面组件
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-gray-50">
        <SubscriptionsApp />
        <Toaster position="top-right" />
      </main>
    </QueryClientProvider>
  );
}
