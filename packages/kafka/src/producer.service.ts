import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';

import {
  Producer,
  ProducerRecord,
} from 'kafkajs';

import { kafka } from './kafka.client';


@Injectable()
export class ProducerService
implements OnModuleInit, OnApplicationShutdown {

  private producer: Producer = kafka.producer();


  async onModuleInit() {
    await this.producer.connect();
    console.log('Kafka Producer Connected');
  }


  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }


  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}