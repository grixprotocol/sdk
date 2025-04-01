// Hyperliquid response type
interface HyperliquidVenue {
  name: string;
  rate?: {
    fundingRate: string;
    nextFundingTime: number;
    fundingIntervalHours?: number;
  };
}

interface HyperliquidPrediction {
  asset: string;
  venues: HyperliquidVenue[];
}

type HyperliquidResponse = HyperliquidPrediction[];

// Lode response type
interface LodeRateData {
  next_funding_time: number;
  next_funding_rate_short: string;
  next_funding_rate_long: string;
}

interface LodeResponse {
  [asset: string]: LodeRateData;
}

const formatHyperliquidResponse = (response: HyperliquidResponse): string => {
  return response
    .map(
      (prediction) =>
        `Asset: ${prediction.asset}\n` +
        `Venues:\n` +
        prediction.venues
          .map(
            (venue) =>
              `  ${venue.name}:\n` +
              `    Funding Rate: ${venue.rate?.fundingRate ?? 'N/A'}\n` +
              `    Next Funding Time: ${venue.rate?.nextFundingTime ?? 'N/A'}\n` +
              `    ${venue.rate?.fundingIntervalHours ? `Funding Interval Hours: ${venue.rate.fundingIntervalHours}\n` : ''}`
          )
          .join('')
    )
    .join('\n\n');
};

const formatLodeResponse = (response: LodeResponse): string => {
  return Object.entries(response)
    .map(
      ([asset, data]) =>
        `Asset: ${asset}\n` +
        `  Next Funding Time: ${data.next_funding_time}\n` +
        `  Next Funding Rate Short: ${data.next_funding_rate_short}\n` +
        `  Next Funding Rate Long: ${data.next_funding_rate_long}`
    )
    .join('\n\n');
};

const isHyperliquidResponse = (response: unknown): response is HyperliquidResponse => {
  return (
    Array.isArray(response) &&
    response.every(
      (item) => typeof item === 'object' && item !== null && 'asset' in item && 'venues' in item
    )
  );
};

const isLodeResponse = (response: unknown): response is LodeResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    Object.values(response).every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'next_funding_time' in item &&
        'next_funding_rate_short' in item &&
        'next_funding_rate_long' in item
    )
  );
};

export const formatNextFundingRateResponse = (response: unknown, protocol: string): string => {
  // Type guard checks
  if (protocol === 'hyperliquid' && isHyperliquidResponse(response)) {
    return formatHyperliquidResponse(response);
  } else if (protocol === 'lode' && isLodeResponse(response)) {
    return formatLodeResponse(response);
  }

  // Fallback for unexpected response format
  return 'Unexpected response format or unsupported protocol';
};
