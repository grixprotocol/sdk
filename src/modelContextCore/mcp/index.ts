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
import { GetAssetPriceParams, getPerpsAssetPriceMcp } from './tools/perps/getAssetPrice/handler.js';
import { getPerpsTradingFeeMcp, GetTradingFeeParams } from './tools/perps/getTradingFee/handler.js';
import {
  GetNextFundingRateParams,
  getPerpsNextFundingRateMcp,
} from './tools/perps/getNextFundingRate/handler.js';
import { perpsAssetPriceSchemaMcp } from './tools/perps/getAssetPrice/schema.js';
import { perpsTradingFeeSchemaMcp } from './tools/perps/getTradingFee/schema.js';
import { perpsNextFundingRateSchemaMcp } from './tools/perps/getNextFundingRate/schema.js';
import { GetCurrentFundingRateParams } from './tools/perps/getCurrentFundingRate/handler.js';
import { getPerpsCurrentFundingRateMcp } from './tools/perps/getCurrentFundingRate/handler.js';
import { perpsCurrentFundingRateSchemaMcp } from './tools/perps/getCurrentFundingRate/schema.js';
import {
  getPowerTradeExpiriesPerSymbolMcp,
  GetPowerTradeExpiriesPerSymbolMcpArgs,
} from './tools/altcoinsDerivatives/protocols/powerTrade/options/getPowerTradeExpiriesPerSymbol/handler.js';
import { getPowerTradeCurrenciesTradingStatisticsMcp } from './tools/altcoinsDerivatives/protocols/powerTrade/getPowerTradeCurrenciesTradingStatistics/handler.js';
import { getPowerTradeTradableEntitiesMcp } from './tools/altcoinsDerivatives/protocols/powerTrade/getPowerTradeTradableEntities/handler.js';
import { GetPowerTradeStrikesPerSymbolMcpArgs } from './tools/altcoinsDerivatives/protocols/powerTrade/options/getPowerTradeStrikesPerSymbol/handler.js';
import { getPowerTradeStrikesPerSymbolMcp } from './tools/altcoinsDerivatives/protocols/powerTrade/options/getPowerTradeStrikesPerSymbol/handler.js';
import { getPowerTradeTradableEntitiesSchemaMcp } from './tools/altcoinsDerivatives/protocols/powerTrade/getPowerTradeTradableEntities/schema.js';
import { getPowerTradeCurrenciesTradingStatisticsSchemaMcp } from './tools/altcoinsDerivatives/protocols/powerTrade/getPowerTradeCurrenciesTradingStatistics/schema.js';
import { getPowerTradeExpiriesPerSymbolSchemaMcp } from './tools/altcoinsDerivatives/protocols/powerTrade/options/getPowerTradeExpiriesPerSymbol/schema.js';
import { getPowerTradeStrikesPerSymbolSchemaMcp } from './tools/altcoinsDerivatives/protocols/powerTrade/options/getPowerTradeStrikesPerSymbol/schema.js';

export const createMCPService = (grixSdkInstance: GrixSDK): MCPService => ({
  handleOperation: (name, args) => handleOperation(grixSdkInstance, name, args),
  getOptionsDataMcp: (args) => getOptionsDataMcp(grixSdkInstance, args),
  getSignalsDataMcp: (args) => getSignalsDataMcp(grixSdkInstance, args),
  getPerpsPredictedFundingsMcp: (args) =>
    getPerpsPredictedFundingsMcp(grixSdkInstance, args as unknown as GetPredictedFundingsRequest),
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
  getPerpsAssetPriceMcp: (args) =>
    getPerpsAssetPriceMcp(grixSdkInstance, args as unknown as GetAssetPriceParams),
  getPerpsTradingFeeMcp: (args) =>
    getPerpsTradingFeeMcp(grixSdkInstance, args as unknown as GetTradingFeeParams),
  getPerpsNextFundingRateMcp: (args) =>
    getPerpsNextFundingRateMcp(grixSdkInstance, args as unknown as GetNextFundingRateParams),
  getPerpsCurrentFundingRateMcp: (args) =>
    getPerpsCurrentFundingRateMcp(grixSdkInstance, args as unknown as GetCurrentFundingRateParams),
  getPowerTradeTradableEntitiesMcp: () => getPowerTradeTradableEntitiesMcp(grixSdkInstance),
  getPowerTradeCurrenciesTradingStatisticsMcp: () =>
    getPowerTradeCurrenciesTradingStatisticsMcp(grixSdkInstance),
  getPowerTradeExpiriesPerSymbolMcp: (args) =>
    getPowerTradeExpiriesPerSymbolMcp(
      grixSdkInstance,
      args as unknown as GetPowerTradeExpiriesPerSymbolMcpArgs
    ),
  getPowerTradeStrikesPerSymbolMcp: (args) =>
    getPowerTradeStrikesPerSymbolMcp(
      grixSdkInstance,
      args as unknown as GetPowerTradeStrikesPerSymbolMcpArgs
    ),

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
    {
      name: 'perpsAssetPrice',
      schema: perpsAssetPriceSchemaMcp,
      description: 'Schema for perps asset price retrieval',
    },
    {
      name: 'perpsTradingFee',
      schema: perpsTradingFeeSchemaMcp,
      description: 'Schema for perps trading fee retrieval',
    },
    {
      name: 'perpsNextFundingRate',
      schema: perpsNextFundingRateSchemaMcp,
      description: 'Schema for perps next funding rate retrieval',
    },
    {
      name: 'perpsCurrentFundingRate',
      schema: perpsCurrentFundingRateSchemaMcp,
      description: 'Schema for perps current funding rate retrieval',
    },
    {
      name: 'powerTradeTradableEntities',
      schema: getPowerTradeTradableEntitiesSchemaMcp,
      description:
        'Schema for altcoins derivatives tradable entities retrieval from the powerTrade protocol',
    },
    {
      name: 'powerTradeCurrenciesTradingStatistics',
      schema: getPowerTradeCurrenciesTradingStatisticsSchemaMcp,
      description:
        'Schema for altcoins derivatives currencies trading statistics retrieval from the powerTrade protocol',
    },
    {
      name: 'powerTradeExpiriesPerSymbol',
      schema: getPowerTradeExpiriesPerSymbolSchemaMcp,
      description:
        'Schema for altcoins derivatives expiries per symbol retrieval from the powerTrade protocol',
    },
    {
      name: 'powerTradeStrikesPerSymbol',
      schema: getPowerTradeStrikesPerSymbolSchemaMcp,
      description:
        'Schema for altcoins derivatives strikes per symbol retrieval from the powerTrade protocol',
    },
  ],
});

export type { MCPService, MCPSchema };
