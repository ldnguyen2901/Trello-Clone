import express from 'express';

import { mapOrder } from '~/utils/sorts.js';

const START_SERVER = () => {
  const punycode = require('node:punycode'); 
  const app = express();
  const hostname = 'localhost';
  const port = 8017;

  app.get('/', async(req, res) => {
    // Test Absolute import mapOrder
    console.log(await GET_DB().listCollections().toArray());
    
    res.end('<h1>Hello World!</h1><hr>');
  });

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello, It's running at http://${hostname}:${port}/`);
  })

  
};

START_SERVER();

