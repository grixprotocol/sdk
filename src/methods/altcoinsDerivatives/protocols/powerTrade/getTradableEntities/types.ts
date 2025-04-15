export interface TradableEntity {
  id: string | number;
  symbol: string;
  base_volume: string;
  volume: string;
  price_change: number | null;
  low_24: number | null;
  high_24: number | null;
  last_price: number | null;
  open_interest: string;
  best_bid: number | null;
  best_ask: number | null;
  index_price: string;
  product_type: string;
}

export type TradableEntitiesGetResponse = TradableEntity[];

export interface TradableEntitiesApiResponse {
  data: TradableEntity[];
}
