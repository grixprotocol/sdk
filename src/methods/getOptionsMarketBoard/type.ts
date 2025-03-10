import { UnderlyingAsset, OptionType, PositionType } from '../../globals';

export type TradeBoardGetParams = {
  asset: UnderlyingAsset;
  optionType: OptionType;
  positionType: PositionType;
};

export type TradeBoardData = {
  optionId: number;
  symbol: string;
  type: string;
  expiry: string;
  strike: number;
  protocol: string;
  marketName: string;
  contractPrice: number;
  availableAmount: string;
};

export type TradeBoardGetResponse = {
  results: TradeBoardData[];
  pagination?: {
    total: number;
    limit: number;
    offset: number;
  };
};
