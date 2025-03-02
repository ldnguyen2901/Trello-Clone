import express from 'express';
import { log } from 'node:console';
import { CONNECT_DB, GET_DB } from '~/config/mongodb';
import { mapOrder } from '~/utils/sorts.js';

const START_SERVER = () => {
  const punycode = require('node:punycode');
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
    console.log(`Hello, It's running at http://${hostname}:${port}/`);
  });
};

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
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
