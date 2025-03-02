export enum PositionType {
  long = 'long',
  short = 'short',
}

export enum ActionType {
  open = 'open',
  close = 'close',
}

export enum PriceType {
  ask = 'ask',
  bid = 'bid',
}

export enum OptionType {
  call = 'call',
  put = 'put',
}

export enum ExpiryType {
  zeroday = 'zeroday',
  vanilla = 'vanilla',
}

export enum OrderType {
  limit = 'limit',
  market = 'market',
}

export enum UnderlyingAsset {
  BTC = 'BTC',
  ETH = 'ETH',
}

export enum PaymentToken {
  WETH = 'WETH',
  USDC = 'USDC',
}
