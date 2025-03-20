export interface GetRsiRequest {
  exchange: string;
  symbol: string;
  interval: string;
}

export interface RsiResponse {
  value: number;
}

export interface GetEmaRequest {
  exchange: string;
  symbol: string;
  interval: string;
}

export interface EmaResponse {
  value: number;
}

export interface GetMacdRequest {
  exchange: string;
  symbol: string;
  interval: string;
}

export interface MacdResponse {
  valueMACD: number;
  valueMACDSignal: number;
  valueMACDHist: number;
}

export interface GetTradingIndicatorsRequest {
  exchange: string;
  symbol: string;
  interval: string;
}

export interface GetTradingIndicatorsResponse {
  rsi: RsiResponse;
  ema: EmaResponse;
  macd: MacdResponse;
}
