import { slugify } from '~/utils/formatters';
import { cardModel } from '~/models/cardModel';

const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tuỳ đặc thù dự án
    const newCard = {
      ...reqBody,
    };

    // Gọi tới tầng Model đê xử lý lưu bản ghi newCard vào database
    const createdCard = await cardModel.createNew(newCard);
    // console.log(createdCard);

    // Lấy bản ghi card sau khi gọi (tuỳ mục đích dự án mà có cần ước này hay không)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId);
    // console.log(getNewCard);

    // ...

    // Trả kết quả về, trong Service luôn phải có return
    return getNewCard;
  } catch (error) {
    throw error;
  }
};

export const cardService = {
  createNew,
};
