import { UnderlyingAsset } from 'src/globals/enums.js';

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
