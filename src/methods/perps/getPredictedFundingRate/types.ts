export interface GetPredictedFundingsRequest {
  protocol: string;
}

export interface PredictedFundingRate {
  fundingRate: string;
  nextFundingTime: number;
  fundingIntervalHours?: number;
}

export interface VenuePredictedFunding {
  name: string;
  rate: PredictedFundingRate | null;
}

export interface AssetPredictedFunding {
  asset: string;
  venues: VenuePredictedFunding[];
}

export interface GetPredictedFundingsResponse {
  predictions: AssetPredictedFunding[];
}
