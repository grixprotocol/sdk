import {
  GrixSDK,
  GetTradingIndicatorsRequest,
  GetOpenInterestCapsRequest,
  GetAssetContextsRequest,
  GetPairsParams,
  GetHistoricalFundingRatesRequest,
  GetAssetPricePredictionParams,
} from 'src/index.js';
import { getOptionsDataMcp } from '../options/handler.js';
import { getSignalsDataMcp } from '../signals/handler.js';
import { getTradingIndicatorsMcp } from '../trading-indicators/handler.js';
import { getPerpsOpenInterestCapsMcp } from '../perps/getPerpsOpenInterestCaps/handler.js';
import { getPerpsAssetContextsMcp } from '../perps/getPerpsAssetContexts/handler.js';
import { getPerpsPairsMcp } from '../perps/getPairs/handler.js';
import { getPerpsHistoricalFundingRateMcp } from '../perps/getPerpsHistoricalFundingRates/handler.js';
import { getAssetPricePredictionsMcp } from '../assetPricePredictions/handler.js';
import { GetAssetPriceParams } from '../perps/getAssetPrice/handler.js';
import { GetTradingFeeParams } from '../perps/getTradingFee/handler.js';
import { getPerpsAssetPriceMcp } from '../perps/getAssetPrice/handler.js';
import { GetNextFundingRateParams } from '../perps/getNextFundingRate/handler.js';
import { getPerpsTradingFeeMcp } from '../perps/getTradingFee/handler.js';
import { getPerpsNextFundingRateMcp } from '../perps/getNextFundingRate/handler.js';
import {
  GetCurrentFundingRateParams,
  getPerpsCurrentFundingRateMcp,
} from '../perps/getCurrentFundingRate/handler.js';
import { getAltcoinsOptionsTradableEntitiesMcp } from '../altcoinsDerivatives/protocols/powerTrade/getPowerTradeTradableEntities/handler.js';
import { getAltcoinsOptionsCurrenciesTradingStatisticsMcp } from '../altcoinsDerivatives/protocols/powerTrade/getPowerTradeCurrenciesTradingStatistics/handler.js';
import {
  getAltcoinsOptionsExpiriesPerSymbolMcp,
  GetAltcoinsOptionsExpiriesPerSymbolMcpArgs,
} from '../altcoinsDerivatives/protocols/powerTrade/options/getPowerTradeExpiriesPerSymbol/handler.js';
import {
  getAltcoinsOptionsStrikesPerSymbolMcp,
  GetAltcoinsOptionsStrikesPerSymbolMcpArgs,
} from '../altcoinsDerivatives/protocols/powerTrade/options/getPowerTradeStrikesPerSymbol/handler.js';
import { usageGuideToolHandler, GuidanceParamsType } from '../usageGuideTool/handler.js';
export const handleOperation = async (
  grixSdkInstance: GrixSDK,
  name: string,
  args?: Record<string, unknown>
): Promise<{ content: { type: string; text: string }[] }> => {
  if (name === 'getDefiOptions') {
    if (!args) {
      throw new Error('Missing required parameters: asset, optionType, or positionType');
    }
    try {
      return await getOptionsDataMcp(grixSdkInstance, args);
    } catch (error) {
      const err = error as Error;
      return {
        content: [
          {
            type: 'text',
            text: `Failed to fetch options data. Error: ${
              err.message
            }. Args: ${JSON.stringify(args)}`,
          },
        ],
      };
    }
  } else if (name === 'generateSignals') {
    if (!args) {
      throw new Error('generateSignals: Missing required parameters');
    }
    return await getSignalsDataMcp(grixSdkInstance, args);
  } else if (name === 'getTradingIndicators') {
    if (!args) {
      throw new Error('getTradingIndicators: Missing required parameters');
    }
    return await getTradingIndicatorsMcp(
      grixSdkInstance,
      args as unknown as GetTradingIndicatorsRequest
    );
  } else if (name === 'getPerpsOpenInterestCaps') {
    if (!args) {
      throw new Error('getPerpsOpenInterestCaps: Missing required parameters');
    }
    return await getPerpsOpenInterestCapsMcp(
      grixSdkInstance,
      args as unknown as GetOpenInterestCapsRequest
    );
  } else if (name === 'getPerpsAssetContexts') {
    if (!args) {
      throw new Error('getPerpsAssetContexts: Missing required parameters');
    }
    return await getPerpsAssetContextsMcp(
      grixSdkInstance,
      args as unknown as GetAssetContextsRequest
    );
  } else if (name === 'getPerpsPairs') {
    if (!args) {
      throw new Error('getPerpsPairs: Missing required parameters');
    }
    return await getPerpsPairsMcp(grixSdkInstance, args as unknown as GetPairsParams);
  } else if (name === 'getPerpsHistoricalFundingRate') {
    if (!args) {
      throw new Error('getPerpsHistoricalFundingRate: Missing required parameters');
    }
    return await getPerpsHistoricalFundingRateMcp(
      grixSdkInstance,
      args as unknown as GetHistoricalFundingRatesRequest
    );
  } else if (name === 'getAssetPricePredictions') {
    if (!args) {
      throw new Error('getAssetPricePredictions: Missing required parameters');
    }
    return await getAssetPricePredictionsMcp(
      grixSdkInstance,
      args as unknown as GetAssetPricePredictionParams
    );
  } else if (name === 'getPerpsAssetPrice') {
    if (!args) {
      throw new Error('getPerpsAssetPrice: Missing required parameters');
    }
    return await getPerpsAssetPriceMcp(grixSdkInstance, args as unknown as GetAssetPriceParams);
  } else if (name === 'getPerpsTradingFee') {
    if (!args) {
      throw new Error('getPerpsTradingFee: Missing required parameters');
    }
    return await getPerpsTradingFeeMcp(grixSdkInstance, args as unknown as GetTradingFeeParams);
  } else if (name === 'getPerpsNextFundingRate') {
    if (!args) {
      throw new Error('getPerpsNextFundingRate: Missing required parameters');
    }
    return await getPerpsNextFundingRateMcp(
      grixSdkInstance,
      args as unknown as GetNextFundingRateParams
    );
  } else if (name === 'getPerpsCurrentFundingRate') {
    if (!args) {
      throw new Error('getPerpsCurrentFundingRate: Missing required parameters');
    }
    return await getPerpsCurrentFundingRateMcp(
      grixSdkInstance,
      args as unknown as GetCurrentFundingRateParams
    );
  } else if (name === 'getAltcoinsOptionsTradableEntities') {
    if (!args) {
      throw new Error('getAltcoinsOptionsTradableEntities: Missing required parameters');
    }
    return await getAltcoinsOptionsTradableEntitiesMcp(grixSdkInstance);
  } else if (name === 'getAltcoinsOptionsCurrenciesTradingStatistics') {
    if (!args) {
      throw new Error('getAltcoinsOptionsCurrenciesTradingStatistics: Missing required parameters');
    }
    return await getAltcoinsOptionsCurrenciesTradingStatisticsMcp(grixSdkInstance);
  } else if (name === 'getAltcoinsOptionsExpiriesPerSymbol') {
    if (!args) {
      throw new Error('getAltcoinsOptionsExpiriesPerSymbol: Missing required parameters');
    }
    return await getAltcoinsOptionsExpiriesPerSymbolMcp(
      grixSdkInstance,
      args as unknown as GetAltcoinsOptionsExpiriesPerSymbolMcpArgs
    );
  } else if (name === 'getAltcoinsOptionsStrikesPerSymbol') {
    if (!args) {
      throw new Error('getAltcoinsOptionsStrikesPerSymbol: Missing required parameters');
    }
    return await getAltcoinsOptionsStrikesPerSymbolMcp(
      grixSdkInstance,
      args as unknown as GetAltcoinsOptionsStrikesPerSymbolMcpArgs
    );
  } else if (name === 'getToolGuidance') {
    if (!args) {
      throw new Error('getToolGuidance: Missing required parameters');
    }
    return await usageGuideToolHandler(args as unknown as GuidanceParamsType);
  }

  throw new Error(`Unknown tool: ${name}`);
};
