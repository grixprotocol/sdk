import { PositionType } from '../../globals/enums.js';

export type OptionPriceGetParams = {
  optionKey: string;
  positionType?: PositionType;
};

export type OptionPriceGetResponse = {
  usdPrice: string;
  availableContractAmount: string;
  updatedAt: string;
  //TODO: Add protocol
};
