import { slugify } from '~/utils/formatters';
import { columnModel } from '~/models/columnModel';


const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tuỳ đặc thù dự án
    const newColumn = {
      ...reqBody,
    };

    // Gọi tới tầng Model đê xử lý lưu bản ghi newColumn vào database
    const createdColumn = await columnModel.createNew(newColumn);
    // console.log(createdColumn);

    // Lấy bản ghi column sau khi gọi (tuỳ mục đích dự án mà có cần ước này hay không)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId);
    // console.log(getNewColumn);

    // ...

    // Trả kết quả về, trong Service luôn phải có return
    return getNewColumn;
  } catch (error) {
    throw error;
  }
};

export const columnService = {
  createNew,
};
