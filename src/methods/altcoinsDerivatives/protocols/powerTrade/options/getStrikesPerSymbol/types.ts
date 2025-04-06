export interface StrikePrice {
  strike: string;
}

export interface StrikesPerSymbolGetParams {
  symbol: string;
}

export interface StrikesPerSymbolGetResponse {
  strikes: StrikePrice[];
}
