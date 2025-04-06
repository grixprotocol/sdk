export type CurrenciesTradingStatisticsGetResponse = CurrencyInfo[];

export interface CurrencyInfo {
  id: number;
  symbol: string;
  volume: string;
  volume_option: string;
  volume_future: string;
  volume_perpetual: string;
  volume_spot: string;
  price_change: string;
  low_24: string;
  high_24: string;
  open_interest: string;
  index_price: string;
}
