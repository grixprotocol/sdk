export interface ExpiriesPerSymbolGetParams {
  symbol: string;
}

export type ExpiriesPerSymbolGetResponse = ExpiryDate[];

export interface ExpiryDate {
  expiry: string;
}
