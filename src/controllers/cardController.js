import { StatusCodes } from 'http-status-codes';
import { cardService } from '~/services/cardService';
const createNew = async (req, res, next) => {
  try {
    // console.log(req.body);

    // Điều hướng dữ liệu tới service để xử lý
    const createdCard = await cardService.createNew(req.body);
    // Có kế quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdCard);
    // res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new card' });
  } catch (error) {
    next(error);
  }
};

export const cardController = {
  createNew,
};
