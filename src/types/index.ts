// 订阅数据类型定义
export interface Subscription {
  id: number;
  name: string;
  origin_name: string;
  url: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

// 分页信息类型定义
export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// API响应类型定义
export interface ApiResponse {
  result: {
    data: Subscription[];
    pagination: Pagination;
  };
} 
