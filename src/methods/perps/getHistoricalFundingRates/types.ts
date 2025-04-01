export interface GetHistoricalFundingRatesRequest {
  protocol?: string;
  pair?: string;
  daysBack?: number;
}

export interface HistoricalFundingRate {
  coin: string;
  fundingRate: string;
  premium: string;
  time: number;
}

export interface GetHistoricalFundingRatesResponse {
  historicalRates: HistoricalFundingRate[];
}
