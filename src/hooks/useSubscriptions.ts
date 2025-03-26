import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { fetchSubscriptions } from '../services/api';
import { getHighlightedNames, toggleHighlightName } from '../services/storage';
import { ApiResponse } from '../types';

export const useSubscriptions = () => {
  const [page, setPage] = useState(1);
  const [highlightedNames, setHighlightedNames] = useState<string[]>([]);

  // 从本地存储加载高亮名称
  useEffect(() => {
    setHighlightedNames(getHighlightedNames());
  }, []);

  // 获取订阅数据
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['subscriptions', page],
    queryFn: () => fetchSubscriptions(page),
  });

  // 错误处理
  useEffect(() => {
    if (isError && error) {
      toast.error('获取数据失败，请稍后重试');
      console.error('Failed to fetch subscriptions:', error);
    }
  }, [isError, error]);

  // 切换高亮状态
  const handleToggleHighlight = (name: string) => {
    const updated = toggleHighlightName(name);
    setHighlightedNames(updated);
    toast.success(`${updated.includes(name) ? '已添加' : '已移除'}高亮`);
  };

  // 改变页码
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // 获取分页信息和订阅数据
  const responseData = data as ApiResponse | undefined;
  const pagination = responseData?.result?.pagination;
  const subscriptions = responseData?.result?.data || [];

  return {
    subscriptions,
    pagination,
    page,
    isLoading,
    isError,
    error,
    highlightedNames,
    handleToggleHighlight,
    handlePageChange,
    refetch
  };
}; 
