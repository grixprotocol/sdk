import OpenAI from 'openai';
import type {
  AIAnalysisParams,
  AIAnalysisResponse,
  AIAnalysisConfig,
  MarketDataInput,
} from './types.js';
import { prepareApiConfig } from './helpers/config.js';
import { buildMessages, isTradeAnalysisParams } from './helpers/messaging.js';
import { processResponse } from './helpers/processing.js';
import { callOpenAiApi } from './helpers/messaging.js';

type ObjectiveParams = {
  dataPoints: MarketDataInput[];
  objective: {
    task: string;
    outputFormat?: unknown;
  };
};

/**
 * Main function for analyzing market data and generating trading signals
 */
export async function generateTradingSignals(
  params: AIAnalysisParams,
  config: AIAnalysisConfig = {}
): Promise<AIAnalysisResponse> {
  try {
    // Prepare the API client and config
    const apiConfig = prepareApiConfig(config);
    const openai = new OpenAI({ apiKey: apiConfig.apiKey });

    // Build prompts and messages
    const messages = buildMessages(params);

    // Determine if we should use JSON format
    const hasObjectiveWithFormat =
      !isTradeAnalysisParams(params) &&
      'objective' in params &&
      Boolean((params as ObjectiveParams).objective.outputFormat);

    // Call OpenAI API
    const content = await callOpenAiApi(
      openai,
      messages,
      apiConfig.model,
      apiConfig.temperature,
      isTradeAnalysisParams(params) || hasObjectiveWithFormat
    );

    // Process the response
    return processResponse(content, params, apiConfig.model);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate trading signals: ${error.message}`);
    }
    throw new Error('Failed to generate trading signals: Unknown error');
  }
}
