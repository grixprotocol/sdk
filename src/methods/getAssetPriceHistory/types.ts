import { UnderlyingAsset } from '../../globals';

export type AssetPriceHistoryGetParams = {
  assets: UnderlyingAsset[];
  granularityMs: number;
  contextWindowMs: number;
};

export type AssetPriceHistoryGetResponse = {
  assetPriceHistory: {
    [asset: string]: {
      timestamp: number;
      price: number;
    }[];
  };
};
