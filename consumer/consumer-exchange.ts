require('dotenv').config(); // TODO: find better that this soultion
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Squiss, Message } from 'squiss-ts';
import { IExchangeRes } from './interfaces/exchange.response';

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
};

const squiss = new Squiss({
  awsConfig,
  queueName: process.env.QUEUE_EXCHANGE_NAME,
  bodyFormat: 'json',
  maxInFlight: 15,
});

const baseURL = process.env.OPEN_EXCHANGE_URL;

// TODO: Should get batch messages to process them parallelly
squiss.on('message', (message: Message) => {

  const exchangeData = message.body.message.ExchangeDTO;

  axios
    .get(
      `${baseURL}/${exchangeData.amount}/${exchangeData.from}/${exchangeData.to}?app_id=${process.env.API_KEY_OPEN_EXCHANGE}`,
    )
    .then((response: AxiosResponse<IExchangeRes>) => {
      const { data } = response;
      console.log('sending email')
      // we will not use async/await here
      // sendEmail(data, exchangeData): we can create another consumer
    })
    .catch((err: AxiosError) => {
      console.log('error fetching')
      console.log({ err }); // TODO: handle error or in squiss.on('error')
    });

  message.del();
});

// - Create a dummy async function that will send the email, no need to actually send it
// function sendEmail(exchangeResponse , exchangeDataReq){
//    return new Promise((resolve ,reject) => {
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         return  reject(error)
//       } else {
//         console.log('Email sent: ' + info.response);
//         return resolve()
//       }
//     });
//   })
// }

squiss.start();
