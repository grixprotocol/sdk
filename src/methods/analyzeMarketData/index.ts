import OpenAI from 'openai';
import { z } from 'zod';
import type {
  AIAnalysisConfig,
  AIAnalysisParams,
  AIAnalysisResponse,
  TradeAnalysisParams,
  Signal,
  ActionType,
  PositionType,
  InstrumentType,
} from './types';
import { getSystemInstructions, getGeneralInstructions } from './systemInstructions';
import { formatTradeWindow } from '../../utils/dateUtils';

const DEFAULT_CONFIG = {
  model: 'gpt-4o',
  temperature: 0.1,
};

// Schema for validating signals
const signalSchema = z.object({
  action_type: z.enum(['open', 'close']),
  position_type: z.enum(['long', 'short']),
  instrument: z.string().min(1),
  instrument_type: z.enum(['asset', 'option']),
  target_position_id: z.number().nullable(),
  size: z.number().positive(),
  expected_instrument_price_usd: z.number().positive(),
  expected_total_price_usd: z.number().positive(),
  reason: z.string().min(3),
});

const signalArraySchema = z.array(signalSchema);

/**
 * Helper function to determine if we're dealing with trade analysis parameters
 */
const isTradeAnalysisParams = (params: AIAnalysisParams): params is TradeAnalysisParams => {
  return 'tradeConfig' in params;
};

/**
 * Helper function to convert validated schema to Signal type
 */
const convertToSignalType = (validatedData: z.infer<typeof signalSchema>[]): Signal[] => {
  return validatedData.map((signal) => ({
    action_type: signal.action_type as ActionType,
    position_type: signal.position_type as PositionType,
    instrument: signal.instrument,
    instrument_type: signal.instrument_type as InstrumentType,
    target_position_id: signal.target_position_id,
    size: signal.size,
    expected_instrument_price_usd: signal.expected_instrument_price_usd,
    expected_total_price_usd: signal.expected_total_price_usd,
    reason: signal.reason,
  }));
};

/**
 * Main function for analyzing market data and generating trading signals
 */
export async function analyzeMarketData(
  params: AIAnalysisParams,
  config: AIAnalysisConfig
): Promise<AIAnalysisResponse> {
  try {
    // Prepare the API client and config
    const apiConfig = prepareApiConfig(config);
    const openai = new OpenAI({ apiKey: apiConfig.apiKey });

    // Build prompts and messages
    const messages = buildMessages(params);

    // Call OpenAI API
    const content = await callOpenAiApi(
      openai,
      messages,
      apiConfig.model,
      apiConfig.temperature,
      isTradeAnalysisParams(params) || Boolean(params.objective.outputFormat)
    );

    // Process the response
    return processResponse(content, params, apiConfig.model);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to analyze market data: ${error.message}`);
    }
    throw new Error('Failed to analyze market data: Unknown error');
  }
}

/**
 * Prepare API configuration with defaults
 */
function prepareApiConfig(config: AIAnalysisConfig) {
  return {
    apiKey: config.apiKey || '',
    model: config.model || DEFAULT_CONFIG.model,
    temperature: config.temperature || DEFAULT_CONFIG.temperature,
  };
}

/**
 * Build messages for the OpenAI API based on the type of analysis
 */
function buildMessages(params: AIAnalysisParams): OpenAI.Chat.ChatCompletionMessageParam[] {
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
async function callOpenAiApi(
  openai: OpenAI,
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  model: string,
  temperature: number,
  useJsonFormat: boolean
): Promise<string> {
  const response = await openai.chat.completions.create({
    model,
    temperature,
    messages,
    response_format: useJsonFormat ? { type: 'json_object' } : undefined,
  });

  return response.choices[0]?.message?.content || '';
}

/**
 * Process the API response based on the analysis type
 */
function processResponse(
  content: string,
  params: AIAnalysisParams,
  model: string
): AIAnalysisResponse {
  const metadata = {
    model,
    timestamp: new Date().toISOString(),
    processedDataTypes: params.dataPoints.map((dp) => dp.type),
  };

  if (isTradeAnalysisParams(params)) {
    return processTradeSignals(content, metadata);
  } else {
    return processGeneralAnalysis(content, params.objective.outputFormat, metadata);
  }
}

/**
 * Process trade signal response
 */
function processTradeSignals(
  content: string,
  metadata: AIAnalysisResponse['metadata']
): AIAnalysisResponse {
  try {
    const arrayMatch = content.match(/\[[\s\S]*\]/);
    if (!arrayMatch) {
      throw new Error(
        'No valid JSON array found in response. The response must be a JSON array starting with "[" and ending with "]" as specified in the system instructions.'
      );
    }

    const rawSignals = JSON.parse(arrayMatch[0]);

    // Validate signals with Zod
    const validationResult = signalArraySchema.safeParse(rawSignals);

    if (!validationResult.success) {
      throw new Error(`Signal validation failed: ${validationResult.error.message}`);
    }

    // Convert the validated data to our Signal type
    const signals = convertToSignalType(validationResult.data);

    return { signals, metadata };
  } catch (parseError: unknown) {
    if (parseError instanceof Error) {
      throw new Error(`Failed to parse signals: ${parseError.message}\nRaw response: ${content}`);
    }
    throw new Error('Failed to parse signals: Unknown error');
  }
}

/**
 * Process general analysis response
 */
function processGeneralAnalysis(
  content: string,
  outputFormat: unknown,
  metadata: AIAnalysisResponse['metadata']
): AIAnalysisResponse {
  if (outputFormat) {
    try {
      // If outputFormat is specified, parse as JSON
      return { result: JSON.parse(content), metadata };
    } catch (parseError) {
      throw new Error(
        `Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`
      );
    }
  } else {
    // Return raw content
    return { result: content, metadata };
  }
}
