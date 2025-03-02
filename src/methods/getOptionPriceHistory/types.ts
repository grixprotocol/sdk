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
  // Single option retrieval
  optionkey?: string;

  // Filtering by entity columns
  status?: string;
  underlyingAsset?: string;
  expiryMin?: number;
  expiryMax?: number;
  strikeMin?: number;
  strikeMax?: number;
  optionType?: string;

  // Pagination
  limit?: number;
  offset?: number;
};

export type ProcessedOptionPriceHistory = {
  optionKey: string;
  priceHistory: ProcessedBidAskSnapshot[];
};

export type OptionPriceHistoryGetResponse = {
  results: ProcessedOptionPriceHistory[];
  pagination?: {
    total: number;
    limit: number;
    offset: number;
  };
};
