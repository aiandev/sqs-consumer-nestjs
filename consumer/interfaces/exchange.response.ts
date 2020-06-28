export interface IExchangeRes {
  disclaimer: String;
  license: String;
  request: IExchangeReq;
  meta: IMetaRes;
  response: Number;
}

export interface IExchangeReq {
  query?: String;
  amount: Number;
  from: String;
  to: String;
}

export interface IMetaRes {
  timestamp: Number;
  rate: Number;
}
