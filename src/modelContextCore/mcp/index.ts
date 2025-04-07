import { getOptionsDataMcp } from './tools/options/handler.js';
import { getSignalsDataMcp } from './tools/signals/handler.js';
import { handleOperation } from './tools/operations/handler.js';
import { optionSchemaMcp } from './tools/options/schema.js';
import { signalSchemaMcp } from './tools/signals/schema.js';
import type { MCPService, MCPSchema } from './types/index.js';
import {
  GetAssetContextsRequest,
  GetOpenInterestCapsRequest,
  GetPairsParams,
  GrixSDK,
  GetHistoricalFundingRatesRequest,
  GetAssetPricePredictionParams,
} from 'src/index.js';
import { getTradingIndicatorsSchemaMcp } from './tools/trading-indicators/schema.js';
import { getPerpsOpenInterestCapsSchemaMcp } from './tools/perps/getPerpsOpenInterestCaps/schema.js';
import { getPerpsAssetContextsSchemaMcp } from './tools/perps/getPerpsAssetContexts/schema.js';
import { getTradingIndicatorsMcp } from './tools/trading-indicators/handler.js';
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
  getAltcoinsOptionsExpiriesPerSymbolMcp,
  GetAltcoinsOptionsExpiriesPerSymbolMcpArgs,
} from './tools/altcoinsDerivatives/protocols/powerTrade/options/getPowerTradeExpiriesPerSymbol/handler.js';
import { getAltcoinsOptionsCurrenciesTradingStatisticsMcp } from './tools/altcoinsDerivatives/protocols/powerTrade/getPowerTradeCurrenciesTradingStatistics/handler.js';
import { getAltcoinsOptionsTradableEntitiesMcp } from './tools/altcoinsDerivatives/protocols/powerTrade/getPowerTradeTradableEntities/handler.js';
import { GetAltcoinsOptionsStrikesPerSymbolMcpArgs } from './tools/altcoinsDerivatives/protocols/powerTrade/options/getPowerTradeStrikesPerSymbol/handler.js';
import { getAltcoinsOptionsStrikesPerSymbolMcp } from './tools/altcoinsDerivatives/protocols/powerTrade/options/getPowerTradeStrikesPerSymbol/handler.js';
import { getAltcoinsOptionsTradableEntitiesSchemaMcp } from './tools/altcoinsDerivatives/protocols/powerTrade/getPowerTradeTradableEntities/schema.js';
import { getAltcoinsOptionsCurrenciesTradingStatisticsSchemaMcp } from './tools/altcoinsDerivatives/protocols/powerTrade/getPowerTradeCurrenciesTradingStatistics/schema.js';
import { getAltcoinsOptionsExpiriesPerSymbolSchemaMcp } from './tools/altcoinsDerivatives/protocols/powerTrade/options/getPowerTradeExpiriesPerSymbol/schema.js';
import { getAltcoinsOptionsStrikesPerSymbolSchemaMcp } from './tools/altcoinsDerivatives/protocols/powerTrade/options/getPowerTradeStrikesPerSymbol/schema.js';

export const createMCPService = (grixSdkInstance: GrixSDK): MCPService => ({
  handleOperation: (name, args) => handleOperation(grixSdkInstance, name, args),
  getOptionsDataMcp: (args) => getOptionsDataMcp(grixSdkInstance, args),
  getSignalsDataMcp: (args) => getSignalsDataMcp(grixSdkInstance, args),
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
  getAltcoinsOptionsTradableEntitiesMcp: () =>
    getAltcoinsOptionsTradableEntitiesMcp(grixSdkInstance),
  getAltcoinsOptionsCurrenciesTradingStatisticsMcp: () =>
    getAltcoinsOptionsCurrenciesTradingStatisticsMcp(grixSdkInstance),
  getAltcoinsOptionsExpiriesPerSymbolMcp: (args) =>
    getAltcoinsOptionsExpiriesPerSymbolMcp(
      grixSdkInstance,
      args as unknown as GetAltcoinsOptionsExpiriesPerSymbolMcpArgs
    ),
  getAltcoinsOptionsStrikesPerSymbolMcp: (args) =>
    getAltcoinsOptionsStrikesPerSymbolMcp(
      grixSdkInstance,
      args as unknown as GetAltcoinsOptionsStrikesPerSymbolMcpArgs
    ),

  schemas: [
    {
      name: optionSchemaMcp.name,
      schema: optionSchemaMcp,
      description: optionSchemaMcp.description,
    },
    {
      name: signalSchemaMcp.name,
      schema: signalSchemaMcp,
      description: signalSchemaMcp.description,
    },
    {
      name: getTradingIndicatorsSchemaMcp.name,
      schema: getTradingIndicatorsSchemaMcp,
      description: getTradingIndicatorsSchemaMcp.description,
    },
    {
      name: perpsPairsSchemaMcp.name,
      schema: perpsPairsSchemaMcp,
      description: perpsPairsSchemaMcp.description,
    },
    {
      name: getPerpsAssetContextsSchemaMcp.name,
      schema: getPerpsAssetContextsSchemaMcp,
      description: getPerpsAssetContextsSchemaMcp.description,
    },
    {
      name: getPerpsOpenInterestCapsSchemaMcp.name,
      schema: getPerpsOpenInterestCapsSchemaMcp,
      description: getPerpsOpenInterestCapsSchemaMcp.description,
    },
    {
      name: getAssetPricePredictionsSchemaMcp.name,
      schema: getAssetPricePredictionsSchemaMcp,
      description: getAssetPricePredictionsSchemaMcp.description,
    },
    {
      name: perpsAssetPriceSchemaMcp.name,
      schema: perpsAssetPriceSchemaMcp,
      description: perpsAssetPriceSchemaMcp.description,
    },
    {
      name: perpsTradingFeeSchemaMcp.name,
      schema: perpsTradingFeeSchemaMcp,
      description: perpsTradingFeeSchemaMcp.description,
    },
    {
      name: perpsNextFundingRateSchemaMcp.name,
      schema: perpsNextFundingRateSchemaMcp,
      description: perpsNextFundingRateSchemaMcp.description,
    },
    {
      name: perpsCurrentFundingRateSchemaMcp.name,
      schema: perpsCurrentFundingRateSchemaMcp,
      description: perpsCurrentFundingRateSchemaMcp.description,
    },
    {
      name: getAltcoinsOptionsTradableEntitiesSchemaMcp.name,
      schema: getAltcoinsOptionsTradableEntitiesSchemaMcp,
      description: getAltcoinsOptionsTradableEntitiesSchemaMcp.description,
    },
    {
      name: getAltcoinsOptionsCurrenciesTradingStatisticsSchemaMcp.name,
      schema: getAltcoinsOptionsCurrenciesTradingStatisticsSchemaMcp,
      description: getAltcoinsOptionsCurrenciesTradingStatisticsSchemaMcp.description,
    },
    {
      name: getAltcoinsOptionsExpiriesPerSymbolSchemaMcp.name,
      schema: getAltcoinsOptionsExpiriesPerSymbolSchemaMcp,
      description: getAltcoinsOptionsExpiriesPerSymbolSchemaMcp.description,
    },
    {
      name: getAltcoinsOptionsStrikesPerSymbolSchemaMcp.name,
      schema: getAltcoinsOptionsStrikesPerSymbolSchemaMcp,
      description: getAltcoinsOptionsStrikesPerSymbolSchemaMcp.description,
    },
  ],
});

export type { MCPService, MCPSchema };
