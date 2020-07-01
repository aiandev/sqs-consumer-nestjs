import { IExchangeReq } from "./exchange.response";

export interface IExchangeEmailBody {
     customerEmail: string,
     rate: Number,
     query: IExchangeReq
}