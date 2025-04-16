export interface GetNextFundingRateRequest {
  protocol: string;
}

export interface LodeGetNextFundingRateResponse {
  fundingRate: string;
}

interface VenueRate {
  fundingRate: string;
  nextFundingTime: number;
  fundingIntervalHours?: number;
}

interface Venue {
  name: string;
  rate: VenueRate;
}

interface AssetFundingRate {
  asset: string;
  venues: Venue[];
}

export type HyperliquidGetNextFundingRateResponse = Array<AssetFundingRate>;
