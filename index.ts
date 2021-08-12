import leads from './leads/ui/express-leads-router'
import config from './env-config';

import express from 'express';
import cors from 'cors';
import MongooseLeadsRepository from "./leads/infra/mongoose-leads-repository";
import rabbitMqConsumer from './leads/ui/rabbitmq-consumer';

const app = express();

app.use(cors());
app.use(express.json());

const repository = new MongooseLeadsRepository();

app.use('/leads', leads(repository));

app.listen(config.serverPort, () => {
  console.log(`Example app listening at http://localhost:${config.serverPort}`);
});

rabbitMqConsumer(repository);
