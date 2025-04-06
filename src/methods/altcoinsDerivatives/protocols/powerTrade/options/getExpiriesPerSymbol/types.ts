export interface ExpiriesPerSymbolGetParams {
  symbol: string;
}

export interface ExpiriesPerSymbolGetResponse {
  expiries: ExpiryDate[];
}

export interface ExpiryDate {
  expiry: string;
}
