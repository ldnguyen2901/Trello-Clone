import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { BOARD_TYPES } from '~/utils/constants';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(100).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string()
      .valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
      .required(),
  });

  try {
    // set abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi (v52)
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    // Validation thành công, tiếp tục xử lý request tiếp theo.
    next();
  } catch (error) {
    const errorMessage = new Error(error).message;
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage,
    );
    next(customError);

    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message,
    // });
  }
};

const update = async (req, res, next) => {
  // Lưu ý không dùng require trong trường hợp Update
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(100).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE),
    columnOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    ),
  });

  try {
    // Chỉ định abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi
    // Đối với trường hợp update, cho phép Unknow để không cần đẩy một số field lên
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    next();
  } catch (error) {
    const errorMessage = new Error(error).message;
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage,
    );
    next(customError);

    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message,
    // });
  }
};

const moveCardToDifferentColumn = async (req, res, next) => {
  const correctCondition = Joi.object({
    currentCardId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),

    prevColumnId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    prevCardOrderIds: Joi.array()
      .required()
      .items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      ),

    nextColumnId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    nextCardOrderIds: Joi.array()
      .required()
      .items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      ),
  });

  try {
    // Chỉ định abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    const errorMessage = new Error(error).message;
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage,
    );
    next(customError);

    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message,
    // });
  }
};

export const boardValidation = {
  createNew,
  update,
  moveCardToDifferentColumn,
};
