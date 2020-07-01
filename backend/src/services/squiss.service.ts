import { Injectable } from '@nestjs/common';
import { Squiss } from 'squiss-ts';

@Injectable()
export class SquissService {
  
    public squiss;

    constructor(){
      this.squiss = new Squiss({
        awsConfig:  {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_DEFAULT_REGION,
        },
        queueName: process.env.SQS_QUEUE_NAME,
        bodyFormat: 'json',
        maxInFlight: 15
      });
    }
}
