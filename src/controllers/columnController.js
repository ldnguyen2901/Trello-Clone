import { StatusCodes } from 'http-status-codes';
import { columnService } from '~/services/columnService';
const createNew = async (req, res, next) => {
  try {
    // console.log(req.body);

    // Điều hướng dữ liệu tới service để xử lý
    const createdColumn = await columnService.createNew(req.body);
    // Có kế quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdColumn);
    // res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new column' });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const columnId = req.params.id;

    const updateColumn = await columnService.update(columnId, req.body);

    res.status(StatusCodes.OK).json(updateColumn);
    // res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new board' });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const columnId = req.params.id;
    const result = await columnService.deleteItem(columnId);

    res.status(StatusCodes.OK).json(result);
    // res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new board' });
  } catch (error) {
    next(error);
  }
};

export const columnController = {
  createNew,
  update,
  deleteItem,
};
