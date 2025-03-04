import { slugify } from '~/utils/formatters';

const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tuỳ đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    // Trả kết quả về, trong Service luôn phải có return
    return newBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
};
