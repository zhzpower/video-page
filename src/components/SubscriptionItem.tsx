import React from 'react';
import { Subscription } from '../types';

interface SubscriptionItemProps {
  subscription: Subscription;
  isHighlighted: boolean;
  onToggleHighlight: (name: string) => void;
}

const SubscriptionItem: React.FC<SubscriptionItemProps> = ({
  subscription,
  isHighlighted,
  onToggleHighlight
}) => {
  const { name, origin_name, url, source, createdAt, updatedAt } = subscription;
  
  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN') + ' ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  // 计算创建时间与更新时间的时间差（分钟）
  const getTimeDifference = () => {
    const created = new Date(createdAt).getTime();
    const updated = new Date(updatedAt).getTime();
    return Math.round((updated - created) / (1000 * 60));
  };

  const timeDiff = getTimeDifference();
  
  return (
    <div 
      className={`border rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md ${
        isHighlighted ? 'bg-yellow-50 border-yellow-300' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-lg font-medium ${isHighlighted ? 'text-yellow-700' : 'text-gray-800'}`}>
          {name}
        </h3>
        <button
          onClick={() => onToggleHighlight(name)}
          className={`p-2 rounded-full transition-colors ${
            isHighlighted 
              ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
          title={isHighlighted ? '取消高亮' : '高亮显示'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-3">{origin_name}</p>
      
      <div className="flex gap-2 mb-3">
        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
          {source}
        </span>
        {timeDiff > 0 && (
          <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
            更新用时: {timeDiff} 分钟
          </span>
        )}
      </div>
      
      <div className="text-sm text-gray-500 mb-3">
        <div>创建: {formatDate(createdAt)}</div>
        <div>更新: {formatDate(updatedAt)}</div>
      </div>
      
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full text-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors duration-200"
      >
        访问链接
      </a>
    </div>
  );
};

export default SubscriptionItem; 
