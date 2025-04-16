import { GetHistoricalFundingRatesRequest, GrixSDK } from 'src/index.js';

export const getPerpsHistoricalFundingRateMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetHistoricalFundingRatesRequest
) => {
  try {
    validatePerpsHistoricalFundingRateArgs(args);
    const response = await grixSdkInstance.getPerpsHistoricalFundingRates(args);

    if (!response || response.historicalRates.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No historical funding rates available for the specified parameters.',
          },
        ],
      };
    }

    const formattedOutput = response.historicalRates
      .map(
        (historicalRate, index) =>
          `Historical Funding Rate ${index + 1}:\n` +
          `  Symbol: ${historicalRate.coin}\n` +
          `  Funding Rate: ${historicalRate.fundingRate}\n` +
          `  Premium: ${historicalRate.premium}\n` +
          `  Timestamp: ${historicalRate.time}\n`
      )
      .join('\n');

    return {
      content: [
        {
          type: 'text',
          text: formattedOutput,
        },
      ],
    };
  } catch (error: unknown) {
    return {
      content: [
        {
          type: 'text',
          text: error instanceof Error ? error.message : 'Unknown error occurred',
        },
      ],
    };
  }
};

const validatePerpsHistoricalFundingRateArgs = (args: GetHistoricalFundingRatesRequest) => {
  const { protocol, symbol, daysBack } = args;

  if (!protocol || !symbol || !daysBack) {
    throw new Error('Protocol, symbol and daysBack are required');
  }

  if (daysBack < 1 || daysBack > 365) {
    throw new Error('daysBack must be between 1 and 365');
  }
};
