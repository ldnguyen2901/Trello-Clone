import express from 'express';
import exitHook from 'async-exit-hook';
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb';

const START_SERVER = () => {
  const app = express();
  const hostname = 'localhost';
  const port = 8017;

  app.get('/', async (req, res) => {
    // Test Absolute import mapOrder
    console.log(await GET_DB().listCollections().toArray());

    res.end('<h1>Hello World!</h1><hr>');
  });

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Welcome, It's running at http://${hostname}:${port}/`);
  });

  //Thực hiện các tác vụ cleanup trước kh dừng server
  exitHook(() => {
    console.log('\n4. Disconnecting from MongoDB Cloud Atlas...`);');
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
