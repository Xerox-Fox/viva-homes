import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'viva-homes',
  brokers: [
    process.env.KAFKA_BROKER ?? 'localhost:9092',
  ],
});