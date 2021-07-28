import leads from './leads/ui/express-leads-router'

import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());
app.use('/leads', leads);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});