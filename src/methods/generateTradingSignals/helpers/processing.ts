import type { AIAnalysisParams, AIAnalysisResponse } from '../types.js';
import { isTradeAnalysisParams, isObjectiveAnalysisParams } from './messaging.js';
import { signalArraySchema, convertToSignalType } from './validation.js';

/**
 * Process the API response based on the analysis type
 */
export function processResponse(
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
  } else if (isObjectiveAnalysisParams(params)) {
    return processGeneralAnalysis(content, params.objective.outputFormat, metadata);
  } else {
    // Fallback
    return processGeneralAnalysis(content, undefined, metadata);
  }
}

/**
 * Process trade signal response
 */
export function processTradeSignals(
  content: string,
  metadata: AIAnalysisResponse['metadata']
): AIAnalysisResponse {
  try {
    // Parse the content - could be a JSON object or array
    let parsedContent: unknown;
    try {
      parsedContent = JSON.parse(content);
    } catch (err) {
      // Don't attempt to extract arrays, just fail
      throw new Error(
        'No valid JSON found in response. The response must contain valid JSON data with trading signals.' +
        (err instanceof Error ? `\nError: ${err.message}` : '')
      );
    }

    // Extract signals based on the response format
    let signalsToProcess: unknown[] = [];

    if (Array.isArray(parsedContent)) {
      // If it's already an array, use it directly
      signalsToProcess = parsedContent;
    } else if (typeof parsedContent === 'object' && parsedContent !== null) {
      const typedContent = parsedContent as Record<string, unknown>;

      // Case 1: Object with a signals property
      if (typedContent.signals && Array.isArray(typedContent.signals)) {
        signalsToProcess = typedContent.signals as unknown[];
      }
      // Case 2: Object with numbered properties like signal1, signal2, etc.
      else if (Object.keys(typedContent).some((key) => key.startsWith('signal'))) {
        signalsToProcess = Object.values(typedContent);
      }
      // Case 3: Object with options property
      else if (typedContent.options && Array.isArray(typedContent.options)) {
        signalsToProcess = typedContent.options as unknown[];
      }
      // Case 4: Object is itself a single signal
      else if (
        'action_type' in typedContent &&
        'position_type' in typedContent &&
        'instrument' in typedContent
      ) {
        signalsToProcess = [typedContent];
      }
      // Case 5: Object with recommendations property
      else if (typedContent.recommendations && Array.isArray(typedContent.recommendations)) {
        signalsToProcess = typedContent.recommendations as unknown[];
      }
      // Case 6: Extract all object values that look like signals
      else {
        signalsToProcess = Object.values(typedContent).filter(
          (value): value is Record<string, unknown> =>
            typeof value === 'object' &&
            value !== null &&
            'action_type' in (value as Record<string, unknown>) &&
            'position_type' in (value as Record<string, unknown>)
        );
      }
    }

    // Ensure we have at least 2 signals
    if (signalsToProcess.length < 2) {
      throw new Error(
        `Invalid number of signals: ${signalsToProcess.length}. The system requires at least 2 signals.`
      );
    }

    // Validate signals with Zod
    const validationResult = signalArraySchema.safeParse(signalsToProcess);

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
export function processGeneralAnalysis(
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
