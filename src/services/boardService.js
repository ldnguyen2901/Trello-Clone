import { slugify } from '~/utils/formatters';
import { boardModel } from '~/models/boardModel';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';

const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tuỳ đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    // Gọi tới tầng Model đê xử lý lưu bản ghi newBoard vào database
    const createdBoard = await boardModel.createNew(newBoard);
    // console.log(createdBoard);

    // Lấy bản ghi board sau khi gọi (tuỳ mục đích dự án mà có cần ước này hay không)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
    // console.log(getNewBoard);

    // Trả kết quả về, trong Service luôn phải có return
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (boardId) => {
  try {
    console.log(boardId);
    
    const board = await boardModel.getDetails(boardId);
    if(!board) {
      throw new ApiError(StatusCodes.NOT_FOUND,'Board not found');
    }
    return board;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
  getDetails,
};
