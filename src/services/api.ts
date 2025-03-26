import axios from 'axios';
import { ApiResponse } from '../types';

const API_BASE_URL = 'https://db.video.zhz99.cn/api';

export const fetchSubscriptions = async (page: number = 1): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/subscriptions?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    throw error;
  }
}; 
