export interface GetHistoricalFundingRatesRequest {
  protocol?: string;
  pair?: string;
  startTime?: number;
  endTime?: number;
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
