import { GetAssetContextsRequest, GrixSDK } from 'src/index.js';

export const getPerpsAssetContextsMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetAssetContextsRequest
) => {
  console.error({ grixSdkInstance, args });

  const { protocol, pair } = args;

  if (!protocol || !pair) {
    return {
      content: [{ type: 'text', text: 'Protocol and pair are required parameters.' }],
    };
  }

  try {
    const response = await grixSdkInstance.getPerpsAssetContexts({ protocol, pair });

    if (!response || response.assetContexts.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No asset contexts available for the specified parameters.',
          },
        ],
      };
    }

    const formattedOutput = response.assetContexts
      .map(
        (assetContext, index) =>
          `Asset Context ${index + 1}:\n` +
          `Perps Meta:\n` +
          `  Name: ${assetContext.assetContexts.perpsMeta.name}\n` +
          `  Size Decimals: ${assetContext.assetContexts.perpsMeta.szDecimals}\n` +
          `  Max Leverage: ${assetContext.assetContexts.perpsMeta.maxLeverage}\n` +
          `Asset Context:\n` +
          `  Funding Rate: ${assetContext.assetContexts.assetCtx.funding}\n` +
          `  Open Interest: ${assetContext.assetContexts.assetCtx.openInterest}\n` +
          `  Previous Day Price: ${assetContext.assetContexts.assetCtx.prevDayPx}\n` +
          `  Daily Notional Volume: ${assetContext.assetContexts.assetCtx.dayNtlVlm}\n` +
          `  Premium: ${assetContext.assetContexts.assetCtx.premium}\n` +
          `  Oracle Price: ${assetContext.assetContexts.assetCtx.oraclePx}\n` +
          `  Mark Price: ${assetContext.assetContexts.assetCtx.markPx}\n` +
          `  Mid Price: ${assetContext.assetContexts.assetCtx.midPx}\n` +
          `  Impact Prices: ${assetContext.assetContexts.assetCtx.impactPxs.join(', ')}\n` +
          `  Daily Base Volume: ${assetContext.assetContexts.assetCtx.dayBaseVlm}\n`
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
