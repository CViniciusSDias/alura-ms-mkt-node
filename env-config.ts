export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://mkt-usuario:mkt-senha@mongo-mkt:27017/mkt?authSource=admin',
    serverPort: process.env.SERVER_PORT || 3000,
};