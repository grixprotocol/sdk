export interface GetCurrentFundingRateRequest {
  protocol: string;
  pair: string;
}

export type GetCurrentFundingRateResponse = number;
