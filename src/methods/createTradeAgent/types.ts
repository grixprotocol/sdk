import { TradeAgentSignalRequestConfig } from '../requestTradeAgentSignals/types';

export type TradeAgentConfig = {
  agent_name: string;
  is_simulation: boolean;
  signal_request_config: TradeAgentSignalRequestConfig;
};

export type CreateTradeAgentRequest = {
  ownerAddress: string;
  config: TradeAgentConfig;
};

export type CreateTradeAgentResponse = {
  agentId: string;
};
