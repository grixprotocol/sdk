export type PositionType = {
  long: 'long';
  short: 'short';
};

export const PositionType: PositionType = {
  long: 'long',
  short: 'short',
};

export type OptionPriceGetParams = {
  optionKey: string;
  positionType?: keyof PositionType;
};

export type OptionPriceGetResponse = {
  usdPrice: string;
  availableContractAmount: string;
  updatedAt: string;
};
