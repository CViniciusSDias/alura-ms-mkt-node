import leads from './leads/ui/express-leads-router'
import config from './env-config';

import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/leads', leads);

app.listen(config.serverPort, () => {
  console.log(`Example app listening at http://localhost:${config.serverPort}`);
});