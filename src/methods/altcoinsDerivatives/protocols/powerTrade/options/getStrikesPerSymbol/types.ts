export interface StrikePrice {
  strike: string;
}

export interface StrikesPerSymbolGetParams {
  symbol: string;
}

export type StrikesPerSymbolGetResponse = StrikePrice[];
