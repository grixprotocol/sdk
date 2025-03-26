export enum PriceInferenceToken {
  BTC = 'BTC',
  ETH = 'ETH',
  SOL = 'SOL',
  BNB = 'BNB',
  ARB = 'ARB',
}

export enum PriceInferenceTimeframe {
  FIVE_MIN = '5m',
  EIGHT_HOURS = '8h',
}

export interface GetAssetPricePredictionParams {
  asset: PriceInferenceToken;
  timeframe: PriceInferenceTimeframe;
}

export interface GetAssetPricePredictionResponse {
  prediction: PredictionResult;
}

export interface PredictionResult {
  /**
   * The predicted value
   */
  prediction: string;

  /**
   * Confidence interval values
   */
  confidenceIntervals: string[];

  /**
   * Timestamp of the prediction
   */
  timestamp: number;

  /**
   * The asset being predicted
   */
  asset: PriceInferenceToken;

  /**
   * The timeframe of the prediction
   */
  timeframe: PriceInferenceTimeframe;

  /**
   * Raw inference data from Allora
   */
  rawInference: AlloraInference;
}

export interface CachedPrediction extends PredictionResult {
  /**
   * When the prediction was cached
   */
  cachedAt: number;

  /**
   * When the cache expires
   */
  expiresAt: number;
}

export interface AlloraInference {
  signature: string;
  inference_data: AlloraInferenceData;
}

export interface AlloraInferenceData {
  network_inference: string;
  network_inference_normalized: string;
  confidence_interval_percentiles: string[];
  confidence_interval_percentiles_normalized: string[];
  confidence_interval_values: string[];
  confidence_interval_values_normalized: string[];
  topic_id: string;
  timestamp: number;
  extra_data: string;
}
