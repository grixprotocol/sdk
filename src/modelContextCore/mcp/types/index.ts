import { GetTradingIndicatorsRequest } from 'src/methods/tradingIndicators/types.js';
import { GetAssetPriceParams } from 'src/modelContextCore/mcp/tools/perps/getAssetPrice/handler.js';
import { GetTradingFeeParams } from 'src/modelContextCore/mcp/tools/perps/getTradingFee/handler.js';
import { GetNextFundingRateParams } from 'src/modelContextCore/mcp/tools/perps/getNextFundingRate/handler.js';
import { GetTradingFeeResponse } from 'src/methods/perps/getTradingFee/types.js';
import { GetCurrentFundingRateParams } from '../tools/perps/getCurrentFundingRate/handler.js';
import { GetCurrentFundingRateResponse } from 'src/methods/perps/getCurrentFundingRate/types.js';
import {
  LodeGetNextFundingRateResponse,
  HyperliquidGetNextFundingRateResponse,
} from 'src/methods/perps/getNextFundingRate/types.js';
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
  getPerpsOpenInterestCapsMcp: (args: Record<string, unknown>) => Promise<MCPResponse>;
  getPerpsAssetContextsMcp: (args: Record<string, unknown>) => Promise<MCPResponse>;
  getPerpsPairsMcp: (args: Record<string, unknown>) => Promise<MCPResponse>;
  getPerpsHistoricalFundingRateMcp: (args: Record<string, unknown>) => Promise<MCPResponse>;
  getAssetPricePredictionsMcp: (args: Record<string, unknown>) => Promise<MCPResponse>;
  getPerpsAssetPriceMcp: (
    args: GetAssetPriceParams
  ) => Promise<
    { content: { type: string; text: string }[] } | { content: { type: string; text: number }[] }
  >;
  getPerpsTradingFeeMcp: (
    args: GetTradingFeeParams
  ) => Promise<
    | { content: { type: string; text: string }[] }
    | { content: { type: string; text: GetTradingFeeResponse[] }[] }
  >;
  getPerpsNextFundingRateMcp: (args: GetNextFundingRateParams) => Promise<
    | { content: { type: string; text: string }[] }
    | {
        content: {
          type: string;
          text: LodeGetNextFundingRateResponse | HyperliquidGetNextFundingRateResponse;
        }[];
      }
  >;
  getPerpsCurrentFundingRateMcp: (
    args: GetCurrentFundingRateParams
  ) => Promise<
    | { content: { type: string; text: string }[] }
    | { content: { type: string; text: GetCurrentFundingRateResponse }[] }
  >;
  getAltcoinsOptionsTradableEntitiesMcp: () => Promise<{
    content: { type: string; text: string }[];
  }>;
  getAltcoinsOptionsCurrenciesTradingStatisticsMcp: () => Promise<{
    content: { type: string; text: string }[];
  }>;
  getAltcoinsOptionsExpiriesPerSymbolMcp: (
    args: Record<string, unknown>
  ) => Promise<{ content: { type: string; text: string }[] }>;
  getAltcoinsOptionsStrikesPerSymbolMcp: (
    args: Record<string, unknown>
  ) => Promise<{ content: { type: string; text: string }[] }>;
  schemas: MCPSchema[];
}

export interface MCPResponse {
  content: { type: string; text: string }[];
}
