export type Quote = {
  protocol: string;
  price: number;
  liquidity?: number;
  implied_volatility?: string;
};

export type BidAskSnapshot = {
  bids: Quote[];
  asks: Quote[];
  underlying_price?: string;
  risk_free_rate?: string;
};

export type ProcessedBidAskSnapshot = {
  date: string;
  snapshot: BidAskSnapshot;
};

export type OptionPriceHistoryGetParams = {
  optionKeys: string[];
  granularityMs: number;
  contextWindowMs: number;
};

export type ProcessedOptionPriceHistory = {
  option_key: string;
  price_history: ProcessedBidAskSnapshot[];
};

export type OptionPriceHistoryGetResponse = ProcessedOptionPriceHistory[];
