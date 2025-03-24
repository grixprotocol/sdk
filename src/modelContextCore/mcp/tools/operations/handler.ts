import {
  GrixSDK,
  GetTradingIndicatorsRequest,
  GetPredictedFundingsRequest,
  GetOpenInterestCapsRequest,
  GetAssetContextsRequest,
  GetPairsParams,
  GetHistoricalFundingRatesRequest,
} from 'src/index.js';
import { getOptionsDataMcp } from '../options/handler.js';
import { getSignalsDataMcp } from '../signals/handler.js';
import { getTradingIndicatorsMcp } from '../trading-indicators/handler.js';
import { getPerpsPredictedFundingsMcp } from '../perps/getPerpsPredictedFundings/handler.js';
import { getPerpsOpenInterestCapsMcp } from '../perps/getPerpsOpenInterestCaps/handler.js';
import { getPerpsAssetContextsMcp } from '../perps/getPerpsAssetContexts/handler.js';
import { getPerpsPairsMcp } from '../perps/getPairs/handler.js';
import { getPerpsHistoricalFundingRateMcp } from '../perps/getPerpsHistoricalFundingRates/handler.js';
export const handleOperation = async (
  grixSdkInstance: GrixSDK,
  name: string,
  args?: Record<string, unknown>
): Promise<{ content: { type: string; text: string }[] }> => {
  if (name === 'options') {
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
  } else if (name === 'tradingIndicators') {
    if (!args) {
      throw new Error('tradingIndicators: Missing required parameters');
    }
    return await getTradingIndicatorsMcp(
      grixSdkInstance,
      args as unknown as GetTradingIndicatorsRequest
    );
  } else if (name === 'getPerpsPredictedFundings') {
    if (!args) {
      throw new Error('getPerpsPredictedFundings: Missing required parameters');
    }
    return await getPerpsPredictedFundingsMcp(
      grixSdkInstance,
      args as unknown as GetPredictedFundingsRequest
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
  }

  throw new Error(`Unknown tool: ${name}`);
};
