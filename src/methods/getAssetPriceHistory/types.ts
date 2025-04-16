import { UnderlyingAsset } from 'src/globals/enums.js';

export type AssetPriceHistoryGetParams = {
  assets: UnderlyingAsset[];
  granularityMs: number;
  contextWindowMs: number;
};

export type AssetPriceHistoryGetResponse = {
  assetPriceHistory: {
    [asset: string]: {
      date: string;
      price: number;
    }[];
  };
};
