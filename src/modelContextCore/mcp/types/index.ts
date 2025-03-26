import { GetTradingIndicatorsRequest } from 'src/methods/tradingIndicators/types.js';

export interface MCPSchema {
  name: string;
  schema: Record<string, unknown>;
  description: string;
}

export interface MCPService {
  getOptionsDataMcp: (
    args: Record<string, unknown>
  ) => Promise<{ content: { type: string; text: string }[] }>;
  getSignalsDataMcp: (
    args: Record<string, unknown>
  ) => Promise<{ content: { type: string; text: string }[] }>;
  handleOperation: (
    name: string,
    args?: Record<string, unknown>
  ) => Promise<{ content: { type: string; text: string }[] }>;
  getTradingIndicatorsMcp: (
    args: GetTradingIndicatorsRequest
  ) => Promise<{ content: { type: string; text: string }[] }>;
  getPerpsPredictedFundingsMcp: (args: Record<string, unknown>) => Promise<MCPResponse>;
  getPerpsOpenInterestCapsMcp: (args: Record<string, unknown>) => Promise<MCPResponse>;
  getPerpsAssetContextsMcp: (args: Record<string, unknown>) => Promise<MCPResponse>;
  getPerpsPairsMcp: (args: Record<string, unknown>) => Promise<MCPResponse>;
  getPerpsHistoricalFundingRateMcp: (args: Record<string, unknown>) => Promise<MCPResponse>;
  getAssetPricePredictionsMcp: (args: Record<string, unknown>) => Promise<MCPResponse>;
  schemas: MCPSchema[];
}

export interface MCPResponse {
  content: { type: string; text: string }[];
}
