import express from 'express';
import { config } from './config/index.js';
import { router } from './routes/index.js'

const app = express();
router(app);


app.listen(config.port, () => {
  console.log(`crossfitxmple server listening on http://localhost:${config.port}`);
})
