export interface GetAssetContextsRequest {
  protocol?: string;
  pair?: string;
}

export interface GetAssetContextsResponse {
  assetContexts: AssetContext[];
}

export interface AssetContext {
  assetContexts: {
    perpsMeta: PerpsMeta;
    assetCtx: AssetCtx;
  };
}

export interface PerpsMeta {
  szDecimals: number;
  name: string;
  maxLeverage: number;
}

export interface AssetCtx {
  funding: string;
  openInterest: string;
  prevDayPx: string;
  dayNtlVlm: string;
  premium: string;
  oraclePx: string;
  markPx: string;
  midPx: string;
  impactPxs: string[];
  dayBaseVlm: string;
}
