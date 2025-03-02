export type MarketDataInput = {
  type: string;
  description: string;
  data: unknown;
  metadata?: Record<string, unknown>;
};

export type AIAnalysisConfig = {
  apiKey?: string;
  model?: string;
  temperature?: number;
};

// Enums matching the trade agent system
export enum PositionType {
  long = 'long',
  short = 'short',
}

export enum ActionType {
  open = 'open',
  close = 'close',
}

export enum InstrumentType {
  asset = 'asset',
  option = 'option',
}

// Signal type matching the trade agent system
export type Signal = {
  action_type: ActionType;
  position_type: PositionType;
  instrument: string;
  instrument_type: InstrumentType;
  target_position_id: number | null;
  size: number;
  expected_instrument_price_usd: number;
  expected_total_price_usd: number;
  reason: string;
  confidence_score: number;
};

export type TradeAnalysisParams = {
  dataPoints: MarketDataInput[];
  tradeConfig: {
    budget_usd: number;
    trade_window_ms: number;
    user_prompt?: string;
  };
};

export type AIAnalysisParams =
  | TradeAnalysisParams
  | {
      dataPoints: MarketDataInput[];
      objective: {
        task: string;
        outputFormat?: unknown;
      };
    };

export type AIAnalysisResponse = {
  signals?: Signal[];
  result?: unknown;
  metadata: {
    model: string;
    timestamp: string;
    processedDataTypes: string[];
  };
};
