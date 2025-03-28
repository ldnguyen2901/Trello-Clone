import { StatusCodes } from 'http-status-codes';
import { boardService } from '~/services/boardService';
const createNew = async (req, res, next) => {
  try {
    // console.log(req.body);

    // Điều hướng dữ liệu tới service để xử lý
    const createdBoard = await boardService.createNew(req.body);
    // Có kế quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdBoard);
    // res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new board' });
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  try {
    // console.log('req.params: ', req.params);
    const boardId = req.params.id;

    const board = await boardService.getDetails(boardId);

    res.status(StatusCodes.OK).json(board);
    // res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new board' });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id;

    const updateBoard = await boardService.update(boardId, req.body);

    res.status(StatusCodes.OK).json(updateBoard);
    // res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new board' });
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
  getDetails,
  update,
};
