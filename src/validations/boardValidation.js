import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(100).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });

  try {
    // set abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi (v52)
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    // Validation thành công, tiếp tục xử lý request tiếp theo.
    next();
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)

    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message,
    // });
  }
};

export const boardValidation = {
  createNew,
};
