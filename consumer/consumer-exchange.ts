const AWS = require('aws-sdk');
AWS.config.update({region: process.env.SQS_REGION});

import axios, { AxiosResponse } from 'axios';
import { Squiss, Message } from 'squiss-ts';
import { IExchangeRes } from './interfaces/exchange.response';
import { IExchangeMessage } from './interfaces/exchange.message';
import { IExchangeEmailBody } from './interfaces/email.body';

const squiss = new Squiss({
  awsConfig : {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
  },
  queueName: process.env.SQS_QUEUE_NAME,
  bodyFormat: 'json',
  maxInFlight: 15,
});


squiss.on('message', async (message: Message) => {

  try {
    const exchangeData : IExchangeMessage  = message.body.message.exchangeDTO;
    const exchangeRes  : AxiosResponse<IExchangeRes>  = await axios.get(`${process.env.OPEN_EXCHANGE_URL}/${exchangeData.amount}/${exchangeData.from}/${exchangeData.to}`,
                          {
                            params: {
                              app_id: process.env.API_KEY_OPEN_EXCHANGE
                            }
                          })
    console.log(exchangeRes)
    // const emailData: IExchangeEmailBody = {
    //   customerEmail : exchangeData.customerEmail,
    //   rate : exchangeRes.data.response,
    //   query: exchangeRes.data.request
    // }  
    // await sendEmail(emailData)

    message.del()
  } catch (error) {
    console.log(error.toJSON())
  }
});


squiss.on('error', function(error){
  console.log({error});
});


squiss.start();

function sendEmail(emailData: IExchangeEmailBody) {
  var params = {
    Destination: {
      ToAddresses: [
        emailData.customerEmail
      ]
    },
    Source:  emailData.customerEmail, 
    Template: 'test', 
    TemplateData: JSON.stringify(emailData)
  };
  
  return new AWS.SES({apiVersion: '2010-12-01'}).sendTemplatedEmail(params).promise();
}