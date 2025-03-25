import { GetPredictedFundingsRequest, GrixSDK } from 'src/index.js';

export const getPerpsPredictedFundingsMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetPredictedFundingsRequest
) => {
  console.log({ grixSdkInstance, args });

  try {
    const response = await grixSdkInstance.getPerpsPredictedFundings(args);

    if (!response || response.predictions.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No predicted fundings available for the specified parameters.',
          },
        ],
      };
    }

    const formattedOutput = response.predictions
      .map(
        (prediction, index) =>
          `Prediction ${index + 1}:\n` +
          `  Asset: ${prediction.asset}\n` +
          `  Venues:\n` +
          prediction.venues
            .map(
              (venue) =>
                `    ${venue.name}:\n` +
                `      Funding Rate: ${venue.rate?.fundingRate ?? 'N/A'}\n` +
                `      Next Funding Time: ${venue.rate?.nextFundingTime ?? 'N/A'}\n` +
                `      ${venue.rate?.fundingIntervalHours ? `Funding Interval Hours: ${venue.rate.fundingIntervalHours}\n` : ''}`
            )
            .join('')
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
