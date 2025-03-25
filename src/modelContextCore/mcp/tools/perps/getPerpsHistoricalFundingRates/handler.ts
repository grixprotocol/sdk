import { GetHistoricalFundingRatesRequest, GrixSDK } from 'src/index.js';

export const getPerpsHistoricalFundingRateMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetHistoricalFundingRatesRequest
) => {
  console.log({ grixSdkInstance, args });

  try {
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
