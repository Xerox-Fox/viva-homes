import {
  Injectable,
  OnModuleInit,
} from '@nestjs/common';

import { kafka } from './kafka.client';


@Injectable()
export class ConsumerService
implements OnModuleInit {


  async onModuleInit() {

    const consumer = kafka.consumer({
      groupId: 'viva-homes-group',
    });


    await consumer.connect();


    await consumer.subscribe({
      topic: 'user.created',
      fromBeginning: false,
    });


    await consumer.run({

      eachMessage: async ({message}) => {

        console.log(
          message.value?.toString()
        );

      },

    });

  }
}