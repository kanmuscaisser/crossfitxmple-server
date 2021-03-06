/**
 * # [crossfitxmple-server](https://github.com/kanmuscaisser/crossfitxmple-server)
 *
 * Copyright (c) 2022 kanmuscaisser. All Right Reserved.
 * This software is the proprietary information of kanmuscaisser
 * Use is subject to strict licensing terms.
 */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors'
import { config } from '../config/index.js';
import { router } from './routes/index.js';
import { notFoundHandler } from './util/middleware/notFoundHandler.js'
import { logErrors, wrapErrors, errorHandler } from './util/middleware/errorHandlers.js'

function getServer() {
  const app = express();
  app.use(cors())  
  app.use(bodyParser.json());

  app.use(morgan("combined", { immediate: true }));

  router(app);

  app.use(notFoundHandler);

  // Error middlewares
  app.use(logErrors);
  app.use(wrapErrors);
  app.use(errorHandler);

  return app;
}

function runServer({ port = config.port, host = config.host }, callback) {
  const app = getServer();
  app.server = app.listen(port, host, err => {
    console.log(`crossfitxmple server listening on http://${host}:${port}`);
    // Tell neught2 that the server is now up and running
    if (!err && process.send) {
      process.send("online");
    }
    callback(err, app);
  });
}

export { runServer, getServer }
