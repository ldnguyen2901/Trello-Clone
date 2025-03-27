import axios from 'axios';
import { API_ROOT } from '~/utils/constants';
/**
 * Tất cả function bên dưới chỉ request và lấy data từ response luôn, mà không có try catch hay then catch gì cả để bắt lỗi
 * Lý do là ở phía FE không cần thiết làm như vậy đối với mọi request bới nó sẽ gây ra việc dư thừa code catch lỗi quá nhiểu
 * Giải pháp Clean Code gọn gàng đó là chúng ta sẽ cathc lỗi tập trung tại một nơi bằng cách tận dụng một thứ cực kỳ mnah5 mẽ trong axios là Interceptors
 * Hiểu dơn giản Interceptors là cách mà chúng ta sẽ đánh chặn vào giữa request hoặc response để xứ lý logic mà chúng ta muốn
 */

// Boards
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
  // Lưu ý: axios sẽ trả kết quả về qua property của nó là data
  return response.data;
};

// Columns
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData);
  return response.data;
};

// Cards
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData);
  return response.data;
};