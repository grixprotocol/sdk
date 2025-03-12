import { TradeAgentConfig } from '../createTradeAgent/types';
import { Signal } from '../generateTradingSignals/types';

export type GetTradeSignalsParams = {
  agentId?: string;
  address?: string;
};

export type SignalRequest = {
  id: string;
  progress: 'completed' | 'analyzingData';
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
  signals: {
    id: string;
    signal: Signal;
    created_at: string;
    updated_at: string;
  }[];
};

export type TradeAgent = {
  id: string;
  config: TradeAgentConfig;
  status: 'active' | 'failed';
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
  signal_requests: SignalRequest[];
};

export type GetTradeSignalsResponse = {
  personalAgents: TradeAgent[];
  publicAgents: TradeAgent[];
};
