import * as amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://rabbitmq-app';
const QUEUE_NAME = 'rubiks_solutions';

let connection: amqp.ChannelModel | null = null;
let channel: amqp.Channel | null = null;

async function getChannel(): Promise<amqp.Channel> {
    if (channel) return channel;

    try {
        if (!connection) {
            connection = await amqp.connect(RABBITMQ_URL);
            const conn = connection;
            conn.on('error', (err) => {
                console.error('RabbitMQ connection error:', err);
                connection = null;
                channel = null;
            });
            conn.on('close', () => {
                console.warn('RabbitMQ connection closed');
                connection = null;
                channel = null;
            });
        }

        const conn = connection;
        if (!conn) throw new Error('RabbitMQ connection not established');
        console.log('Connected to RabbitMQ at', RABBITMQ_URL);

        // Create a confirm channel for guaranteed delivery
        channel = await conn.createConfirmChannel();
        console.log('RabbitMQ confirm channel created');
        console.log('Publisher confirms enabled');

        await channel.assertQueue(QUEUE_NAME, { durable: true });
        return channel;
    } catch (err) {
        console.error('Failed to connect to RabbitMQ:', err);
        throw err;
    }
}

export async function publishSolution(data: any): Promise<boolean> {
    try {
        const ch = await getChannel();
        const msg = JSON.stringify(data);
        console.log('Publishing to RabbitMQ:', msg);

        // With publisher confirms enabled, this will wait for broker acknowledgment
        await ch.sendToQueue(QUEUE_NAME, Buffer.from(msg), { persistent: true });
        console.log('Message confirmed by RabbitMQ broker');
        return true;
    } catch (err) {
        console.error('Error publishing to RabbitMQ:', err);
        return false;
    }
}
