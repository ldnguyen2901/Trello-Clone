import { slugify } from '~/utils/formatters';
import { boardModel } from '~/models/boardModel';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';
import { cloneDeep } from 'lodash';

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
    // console.log(boardId);

    const board = await boardModel.getDetails(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found');
    }

    // Bước 1: Deep clone board ra một cái mới để xử lý, không ảnh ưởng tới board ban daj692, tuỳ mục đích về sau mà có cần clone hay không?
    // JavaScript Primitive vs Reference Values
    const resBoard = cloneDeep(board);

    // Bước 2: Đưa card về đúng column
    resBoard.columns.forEach((column) => {
      // Cacg1 dybg2 .equals này là bởi vì ta hiểu ObjectId trong MongoDB có hỗ trợ phương thức .equals
      column.cards = resBoard.cards.filter((card) =>
        card.columnId.equals(column._id),
      );

      // // Các khác đơn giản là convert ObjectId về string bằng hàm toString của JavaScript
      // column.cards = resBoard.cards.filter(
      //   (card) => card.columnId.toString() === column._id.toString(),
      // );
    });

    // Bước 3: Xoá mảng cards khỏi board ban đầu
    delete resBoard.cards;

    return resBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
  getDetails,
};
