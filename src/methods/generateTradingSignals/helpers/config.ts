import type { AIAnalysisConfig } from '../types.js';

const DEFAULT_CONFIG = {
  model: 'gpt-4o',
  temperature: 0.1,
};

/**
 * Prepare API configuration with defaults
 */
export function prepareApiConfig(config: AIAnalysisConfig) {
  return {
    apiKey: config.apiKey || '',
    model: config.model || DEFAULT_CONFIG.model,
    temperature: config.temperature || DEFAULT_CONFIG.temperature,
  };
}

export { DEFAULT_CONFIG };
