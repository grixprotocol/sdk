import { UnderlyingAsset } from '../../globals/enums.js';

export type AssetPriceHistoryGetParams = {
  assets: UnderlyingAsset[];
  startTime: number;
  endTime: number;
};

export type AssetPriceHistoryGetResponse = {
  prices: {
    [key: string]: {
      [timestamp: string]: number;
    };
  };
};
