export interface GetTradingFeeRequest {
  protocol: string;
}

export interface GetTradingFeeResponse {
  symbol: string;
  fee: string;
}
