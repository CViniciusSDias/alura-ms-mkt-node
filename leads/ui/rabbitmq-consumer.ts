import MongooseLeadsRepository from "../infra/mongoose-leads-repository";
import amqplib from "amqplib";
import config from "../../env-config";
import ConvertLead from "../application/convert-lead";

export default (repository: MongooseLeadsRepository) => {
    amqplib.connect({
        hostname: config.rabbitmqHost,
        port: <number> config.rabbitmqPort,
        username: config.rabbitmqUser,
        password: config.rabbitmqPassword,
    })
        .then(conn => conn.createChannel())
        .then(async channel => {
            await channel.assertExchange('client_enrolled', 'fanout', { autoDelete: false });
            await channel.assertQueue('lead_convertion', { autoDelete: false });
            await channel.bindQueue('lead_convertion', 'client_enrolled', '');

            return channel;
        })
        .then(channel => channel.consume('lead_convertion', msg => {
            const properties = JSON.parse(<string> msg?.content.toString());
            const useCase = new ConvertLead(repository);
            useCase.execute(properties.email);
        }));
}
