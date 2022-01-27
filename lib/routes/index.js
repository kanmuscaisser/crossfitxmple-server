import express from 'express';
import { config } from '../../config/index.js';
import { router as eventsRouter } from './events.router.js'

function router(app) {
  const router = express.Router();
  app.use(config.baseRoute, router);

  router.use('/events', eventsRouter);
}

export { router };
