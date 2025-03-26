import React from 'react';
import { Pagination as PaginationType } from '../types';

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange }) => {
  const { current, totalPages } = pagination;

  // 计算要显示的页码按钮
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    // 始终显示当前页
    let startPage = Math.max(1, current - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // 调整起始页，以确保我们始终显示最大数量的页面
    if (endPage - startPage + 1 < maxPagesToShow && startPage > 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex justify-center mt-6">
      <ul className="flex items-center gap-2">
        {/* 首页按钮 */}
        {current > 1 && (
          <li>
            <button
              onClick={() => onPageChange(1)}
              className="flex items-center justify-center w-10 h-10 border rounded bg-white text-gray-700 hover:bg-gray-50"
              aria-label="Go to first page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        )}
        
        {/* 上一页按钮 */}
        {current > 1 && (
          <li>
            <button
              onClick={() => onPageChange(current - 1)}
              className="flex items-center justify-center w-10 h-10 border rounded bg-white text-gray-700 hover:bg-gray-50"
              aria-label="Go to previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        )}
        
        {/* 页码按钮 */}
        {pageNumbers.map(pageNumber => (
          <li key={pageNumber}>
            <button
              onClick={() => onPageChange(pageNumber)}
              className={`flex items-center justify-center w-10 h-10 border rounded ${
                pageNumber === current
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={pageNumber === current ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        
        {/* 下一页按钮 */}
        {current < totalPages && (
          <li>
            <button
              onClick={() => onPageChange(current + 1)}
              className="flex items-center justify-center w-10 h-10 border rounded bg-white text-gray-700 hover:bg-gray-50"
              aria-label="Go to next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        )}
        
        {/* 最后一页按钮 */}
        {current < totalPages && (
          <li>
            <button
              onClick={() => onPageChange(totalPages)}
              className="flex items-center justify-center w-10 h-10 border rounded bg-white text-gray-700 hover:bg-gray-50"
              aria-label="Go to last page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10 4.293 14.293a1 1 0 000 1.414zm6 0a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L14.586 10l-4.293 4.293a1 1 0 000 1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination; 
