import OpenAI from 'openai';
import type { AIAnalysisParams, TradeAnalysisParams, MarketDataInput } from '../types.js';
import { getSystemInstructions, getGeneralInstructions } from '../systemInstructions.js';
import { formatTradeWindow } from '../../../utils/dateUtils.js';

// Define type for non-trade analysis params
export type ObjectiveAnalysisParams = {
  dataPoints: MarketDataInput[];
  objective: {
    task: string;
    outputFormat?: unknown;
  };
};

/**
 * Helper function to determine if we're dealing with trade analysis parameters
 */
export const isTradeAnalysisParams = (params: AIAnalysisParams): params is TradeAnalysisParams => {
  return 'tradeConfig' in params;
};

/**
 * Helper function to determine if we're dealing with objective analysis parameters
 */
export const isObjectiveAnalysisParams = (
  params: AIAnalysisParams
): params is ObjectiveAnalysisParams => {
  return 'objective' in params;
};

/**
 * Build messages for the OpenAI API based on the type of analysis
 */
export function buildMessages(params: AIAnalysisParams): OpenAI.Chat.ChatCompletionMessageParam[] {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

  if (isTradeAnalysisParams(params)) {
    // Trade analysis mode
    buildTradeAnalysisMessages(params, messages);
  } else {
    // General analysis mode
    buildGeneralAnalysisMessages(params, messages);
  }

  return messages;
}

/**
 * Build messages for trade analysis mode
 */
function buildTradeAnalysisMessages(
  params: TradeAnalysisParams,
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
) {
  const { budget_usd, trade_window_ms, user_prompt } = params.tradeConfig;

  // System instructions for trade signals
  messages.push({
    role: 'system',
    content: getSystemInstructions(budget_usd),
  });

  // Add data points
  params.dataPoints.forEach((dp) => {
    messages.push({
      role: 'user',
      content: `${dp.type}: ${dp.description}\n${JSON.stringify(dp.data, null, 2)}${dp.metadata ? `\nAdditional Context: ${JSON.stringify(dp.metadata, null, 2)}` : ''}`,
    });
  });

  // Add trading timeframe
  messages.push({
    role: 'user',
    content: `Trading timeframe: I plan to hold positions for ${formatTradeWindow(trade_window_ms)}. Please consider this timeframe when generating signals.`,
  });

  // Add budget
  messages.push({
    role: 'user',
    content: `My budget for trading is: ${budget_usd} USD. Please give me a few signal options based on this budget.`,
  });

  // Add custom user prompt if provided
  if (user_prompt) {
    messages.push({
      role: 'user',
      content: user_prompt,
    });
  }
}

/**
 * Build messages for general analysis mode
 */
function buildGeneralAnalysisMessages(
  params: AIAnalysisParams & { objective: { task: string; outputFormat?: unknown } },
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
) {
  messages.push({
    role: 'system',
    content: getGeneralInstructions(params.objective.task, params.objective.outputFormat),
  });

  // Add data points
  const formattedDataPoints = params.dataPoints
    .map((dp) => {
      return `Data Type: ${dp.type}
Description: ${dp.description}
Data: ${JSON.stringify(dp.data, null, 2)}
${dp.metadata ? `Additional Context: ${JSON.stringify(dp.metadata, null, 2)}` : ''}`;
    })
    .join('\n\n---\n\n');

  messages.push({
    role: 'user',
    content: formattedDataPoints,
  });
}

/**
 * Call the OpenAI API and get the response content
 */
export async function callOpenAiApi(
  openai: OpenAI,
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  model: string,
  temperature: number,
  useJsonFormat: boolean
): Promise<string> {
  // When in trade analysis mode, always ensure we're using JSON format
  // and add a final reminder to return an array
  if (useJsonFormat) {
    // Add a final reminder message to return data in array format
    messages.push({
      role: 'user',
      content:
        'IMPORTANT: Your response MUST contain at least 2 trading signals. You can format them either as an object with a "signals" array property OR as a direct array of signal objects. Each signal must include ALL the required fields mentioned in the instructions.',
    });
  }

  const response = await openai.chat.completions.create({
    model,
    temperature,
    messages,
    response_format: useJsonFormat ? { type: 'json_object' } : undefined,
  });

  return response.choices[0]?.message?.content || '';
}
