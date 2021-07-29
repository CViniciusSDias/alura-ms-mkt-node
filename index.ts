import leads from './leads/ui/express-leads-router'
import config from './env-config';

import express from 'express';
const app = express();

app.use(express.json());
app.use('/leads', leads);

app.listen(config.serverPort, () => {
  console.log(`Example app listening at http://localhost:${config.serverPort}`);
});