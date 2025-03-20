export interface GetPredictedFundingsRequest {
  protocol: string;
}

export interface PredictedFundingRate {
  fundingRate: string;
  nextFundingTime: number;
}

export interface VenuePredictedFunding {
  venue: string;
  prediction: PredictedFundingRate | null;
}

export interface AssetPredictedFunding {
  asset: string;
  venues: VenuePredictedFunding[];
}

export interface GetPredictedFundingsResponse {
  predictions: AssetPredictedFunding[];
}
