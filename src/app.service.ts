import { Injectable } from '@nestjs/common';
import { ExchangeDTO } from './dto/exhange.dto';
import { Squiss, IMessageToSend} from 'squiss-ts';

@Injectable()
export class AppService {

  private awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION,
  };
  // TODO: move in separate services and inject it in constructor 
  private squiss = new Squiss({
    awsConfig: this.awsConfig,
    queueName: process.env.QUEUE_EXCHANGE_NAME,
    bodyFormat: 'json',
    maxInFlight: 15
  });

  async sendConversion(exchangeDTO: ExchangeDTO)  {

    const messageToSend: IMessageToSend = {
      name: 'exchange',
      message: {
        exchangeDTO
      },
    }

    await this.squiss.sendMessage(messageToSend);

    return 'Inserted in SQS'; // TODO: handle the reponse better 
  }
  
}
