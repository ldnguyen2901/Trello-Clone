/* eslint-disable no-console */
import express from 'express';
import exitHook from 'async-exit-hook';
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb';
import { env } from '~/config/environment';
import { APIs_V1 } from '~/routes/v1';
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware';
import cors from 'cors';
import { corsOptions } from '~/config/cors';

const START_SERVER = () => {
  const app = express();

  app.use(cors(corsOptions));

  // Enable req.body json data
  app.use(express.json());

  // Use APIs V1
  app.use('/v1', APIs_V1);

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware);

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1><hr>');
  });

  // Môi trường Production
  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(
        `3.Production: ${env.AUTHOR}.\n   It's running at Port: ${process.env.PORT}`,
      );
    });
  } else {
    // Môi trường Local Dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(
        `3. Welcome back, ${env.AUTHOR}.\n   It's running at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`,
      );
    });
  }

  //Thực hiện các tác vụ cleanup trước kh dừng server
  exitHook(() => {
    console.log('\n4. Server is shutting down...`);');
    CLOSE_DB().then(() => {
      console.log('5. Disconnected from MongoDB Cloud Atlas');
    });
  });
};

// Example usage:
// CONNECT_DB()
//   .then(() => console.log(`Connected to MongoDB Cloud Atlas!`))
//   .then(() => START_SERVER())
//   .catch(error =>{
//     console.error(`Error connecting to MongoDB:`, error);
//     process.exit(0);
//   });

// Better version to connect to MongoDB | IIFE
(async () => {
  try {
    console.log('1. Connecting to MongoDB...');
    await CONNECT_DB();
    console.log('2. Connected to MongoDB!');
    // Khởi động sau khi back-end đã kết nối thành công
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
