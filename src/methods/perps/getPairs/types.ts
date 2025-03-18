export interface GetPairsParams {
  protocol: string;
  baseAsset?: string;
}

export interface GetPairsResponse {
  pairs: string[];
}
