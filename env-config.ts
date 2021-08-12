export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://mkt-usuario:mkt-senha@mongo-mkt:27017/mkt?authSource=admin',
    serverPort: process.env.SERVER_PORT || 3000,
    rabbitmqHost: process.env.RABBITMQ_HOST || 'rabbitmq',
    rabbitmqPort: process.env.RABBITMQ_PORT || 5672,
    rabbitmqUser: process.env.RABBITMQ_USERNAME || 'guest',
    rabbitmqPassword: process.env.RABBITMQ_PASSWORD || 'guest',
};
