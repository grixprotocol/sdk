import { z } from 'zod';
import type { Signal, ActionType, PositionType, InstrumentType } from '../types.js';

// Schema for validating signals
export const signalSchema = z.object({
  action_type: z.enum(['open', 'close']),
  position_type: z.enum(['long', 'short']),
  instrument: z.string().min(1),
  instrument_type: z.enum(['asset', 'option']),
  target_position_id: z.number().nullable(),
  size: z.number().positive(),
  expected_instrument_price_usd: z.number().positive(),
  expected_total_price_usd: z.number().positive(),
  reason: z.string().min(3),
  confidence_score: z.number().min(0).max(100),
});

export const signalArraySchema = z.array(signalSchema);

/**
 * Helper function to convert validated schema to Signal type
 */
export const convertToSignalType = (validatedData: z.infer<typeof signalSchema>[]): Signal[] => {
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
    confidence_score: signal.confidence_score,
  }));
};
