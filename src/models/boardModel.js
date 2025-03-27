import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { GET_DB } from '~/config/mongodb';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';
import { BOARD_TYPES } from '~/utils/constants';
import { columnModel } from './columnModel';
import { cardModel } from './cardModel';

// Define Collection (Name & Schema)
const BOARD_COLLECTION_NAME = 'boards';
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(100).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),

  // Lưu ý các item trong mảng columnOrderIds là ObjectId nên cần thêm pattern cho chuẩn
  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false),
});

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
    // console.log('validData:', validData);

    const createdBoard = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .insertOne(validData);
    return createdBoard;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    // console.log(id);
    // console.log(typeof id);
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

// Query tổng hợp (aggregate) để lấy toàn bộ Columns và Cards thuộc về Board
const getDetails = async (id) => {
  try {
    // Tạm thời giống hệt hàm findOneById - và sẽ update phần aggregate tiếp
    // const result = await GET_DB()
    //   .collection(BOARD_COLLECTION_NAME)
    //   .findOne({ _id: new ObjectId(id) });

    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .aggregate([
        { $match: { _id: new ObjectId(id), _destroy: false } },
        {
          $lookup: {
            from: columnModel.COLUMN_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns',
          },
        },
        {
          $lookup: {
            from: cardModel.CARD_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards',
          },
        },
      ])
      .toArray();
    // console.log('result:', result);
    return result[0] || null;

    // return result;
  } catch (error) {
    throw new Error(error);
  }
};

// Nhiệm vụ của func này là push một giá trị columnId vào cuổi mảng columnOrderIds
const pushColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(column.boardId) },
        { $push: { columnOrderIds: new ObjectId(column._id) } },
        { returnDocument: 'after' },
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  pushColumnOrderIds,
};
