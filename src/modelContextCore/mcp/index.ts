import { getOptionsDataMcp } from './tools/options/handler.js';
import { getSignalsDataMcp } from './tools/signals/handler.js';
import { handleOperation } from './tools/operations/handler.js';
import { optionSchemaMcp } from './tools/options/schema.js';
import { signalSchemaMcp } from './tools/signals/schema.js';
import type { MCPService, MCPSchema } from './types/index.js';
import {
  GetAssetContextsRequest,
  GetOpenInterestCapsRequest,
  GetPredictedFundingsRequest,
  GetPairsParams,
  GrixSDK,
  GetHistoricalFundingRatesRequest,
  GetAssetPricePredictionParams,
} from 'src/index.js';
import { getTradingIndicatorsSchemaMcp } from './tools/trading-indicators/schema.js';
import { getPerpsPredictedFundingsSchemaMcp } from './tools/perps/getPerpsPredictedFundings/schema.js';
import { getPerpsOpenInterestCapsSchemaMcp } from './tools/perps/getPerpsOpenInterestCaps/schema.js';
import { getPerpsAssetContextsSchemaMcp } from './tools/perps/getPerpsAssetContexts/schema.js';
import { getTradingIndicatorsMcp } from './tools/trading-indicators/handler.js';
import { getPerpsPredictedFundingsMcp } from './tools/perps/getPerpsPredictedFundings/handler.js';
import { getPerpsOpenInterestCapsMcp } from './tools/perps/getPerpsOpenInterestCaps/handler.js';
import { getPerpsAssetContextsMcp } from './tools/perps/getPerpsAssetContexts/handler.js';
import { getPerpsPairsMcp } from './tools/perps/getPairs/handler.js';
import { perpsPairsSchemaMcp } from './tools/perps/getPairs/schema.js';
import { getPerpsHistoricalFundingRateMcp } from './tools/perps/getPerpsHistoricalFundingRates/handler.js';
import { getAssetPricePredictionsSchemaMcp } from './tools/assetPricePredictions/schema.js';
import { getAssetPricePredictionsMcp } from './tools/assetPricePredictions/handler.js';

export const createMCPService = (grixSdkInstance: GrixSDK): MCPService => ({
  getOptionsDataMcp: (args) => getOptionsDataMcp(grixSdkInstance, args),
  getSignalsDataMcp: (args) => getSignalsDataMcp(grixSdkInstance, args),
  getPerpsPredictedFundingsMcp: (args) =>
    getPerpsPredictedFundingsMcp(grixSdkInstance, args as unknown as GetPredictedFundingsRequest),
  handleOperation: (name, args) => handleOperation(grixSdkInstance, name, args),
  getTradingIndicatorsMcp: (args) => getTradingIndicatorsMcp(grixSdkInstance, args),
  getPerpsOpenInterestCapsMcp: (args) =>
    getPerpsOpenInterestCapsMcp(grixSdkInstance, args as unknown as GetOpenInterestCapsRequest),
  getPerpsAssetContextsMcp: (args) =>
    getPerpsAssetContextsMcp(grixSdkInstance, args as unknown as GetAssetContextsRequest),
  getPerpsPairsMcp: (args) => getPerpsPairsMcp(grixSdkInstance, args as unknown as GetPairsParams),
  getPerpsHistoricalFundingRateMcp: (args) =>
    getPerpsHistoricalFundingRateMcp(
      grixSdkInstance,
      args as unknown as GetHistoricalFundingRatesRequest
    ),
  getAssetPricePredictionsMcp: (args) =>
    getAssetPricePredictionsMcp(grixSdkInstance, args as unknown as GetAssetPricePredictionParams),

  schemas: [
    {
      name: 'options',
      schema: optionSchemaMcp,
      description: 'Schema for options data retrieval',
    },
    {
      name: 'signals',
      schema: signalSchemaMcp,
      description: 'Schema for trading signals generation',
    },
    {
      name: 'perpsPredictedFundings',
      schema: getPerpsPredictedFundingsSchemaMcp,
      description: 'Schema for perps predicted fundings retrieval',
    },
    {
      name: 'tradingIndicators',
      schema: getTradingIndicatorsSchemaMcp,
      description: 'Schema for trading indicators retrieval',
    },
    {
      name: 'perpsGetPairs',
      schema: perpsPairsSchemaMcp,
      description: 'Schema for perps pairs retrieval',
    },
    {
      name: 'perpsAssetContexts',
      schema: getPerpsAssetContextsSchemaMcp,
      description: 'Schema for perps asset contexts retrieval',
    },

    {
      name: 'perpsOpenInterestCaps',
      schema: getPerpsOpenInterestCapsSchemaMcp,
      description: 'Schema for perps open interest caps retrieval',
    },
    {
      name: 'perpsAssetContexts',
      schema: getPerpsAssetContextsSchemaMcp,
      description: 'Schema for perps asset contexts retrieval',
    },
    {
      name: 'assetPricePredictions',
      schema: getAssetPricePredictionsSchemaMcp,
      description: 'Schema for asset price predictions retrieval',
    },
  ],
});

export type { MCPService, MCPSchema };
