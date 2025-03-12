import { Signal } from '../generateTradingSignals/types';

export type TradeAgentSignalRequestConfig = {
  budget_usd: string;
  assets: string[];
  context_window_ms: number;
  input_data: string[];
  protocols: string[];
  trade_window_ms: number;
  user_prompt?: string;
};

export type TradeAgentSignalRequest = {
  config: TradeAgentSignalRequestConfig;
};

export type TradeAgentSignalResponse = {
  signals: Signal[];
  metadata: {
    tradeAgentId: number;
    timestamp: string;
    processedDataTypes: string[];
  };
};
