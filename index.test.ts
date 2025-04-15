import { PositionType } from './src/globals/enums';
import {
  GetAssetPricePredictionParams,
  GetAssetPriceRequest,
  GetAssetPriceResponse,
  GetCurrentFundingRateRequest,
  GetNextFundingRateRequest,
  GetPairsParams,
  GetTradingFeeRequest,
  GetTradingIndicatorsRequest,
  GrixSDK,
  OptionType,
  UnderlyingAsset,
} from './src/index';
import {
  AssetPriceHistoryGetParams,
  AssetPriceHistoryGetResponse,
} from './src/methods/getAssetPriceHistory/types';
import { OptionPriceGetParams } from './src/methods/getOptionPrice/types';
import { OptionPriceHistoryGetParams } from './src/methods/getOptionPriceHistory/types';
import { TradeBoardGetParams } from './src/methods/getOptionsMarketBoard/type';
import { getAssetPricePredictionsSchemaMcp } from './src/modelContextCore/mcp/tools/assetPricePredictions/schema';
import { optionSchemaMcp } from './src/modelContextCore/mcp/tools/options/schema';
import { perpsAssetPriceSchemaMcp } from './src/modelContextCore/mcp/tools/perps/getAssetPrice/schema';
import { perpsCurrentFundingRateSchemaMcp } from './src/modelContextCore/mcp/tools/perps/getCurrentFundingRate/schema';
import { perpsNextFundingRateSchemaMcp } from './src/modelContextCore/mcp/tools/perps/getNextFundingRate/schema';
import { perpsPairsSchemaMcp } from './src/modelContextCore/mcp/tools/perps/getPairs/schema';
import { perpsTradingFeeSchemaMcp } from './src/modelContextCore/mcp/tools/perps/getTradingFee/schema';
import { getTradingIndicatorsSchemaMcp } from './src/modelContextCore/mcp/tools/trading-indicators/schema';
describe('GrixSDK Methods', () => {
  let sdk: GrixSDK;
  const GRIX_API_KEY = process.env.GRIX_API_KEY || '';

  beforeAll(async () => {
    if (!GRIX_API_KEY) {
      console.warn('Warning: GRIX_API_KEY is empty!');
    }

    sdk = await GrixSDK.initialize({ apiKey: GRIX_API_KEY });
  });

  test('fetchAssetPrice should return a number', async () => {
    const assetPrice = await sdk.fetchAssetPrice('bitcoin');
    expect(typeof assetPrice).toBe('number');
  });

  test('getOptionPrice should return an array of OptionPriceData', async () => {
    const params: OptionPriceGetParams = {
      optionKey: 'BTC-27MAR26-20000-C',
      positionType: PositionType.long,
    };
    const optionPrice = await sdk.getOptionPrice(params);
    expect(optionPrice).toMatchObject({
      usdPrice: expect.any(String),
      availableContractAmount: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('getAssetPriceHistory should return an array of AssetPriceHistoryData', async () => {
    const params: AssetPriceHistoryGetParams = {
      assets: [UnderlyingAsset.BTC],
      granularityMs: 1000 * 60 * 60 * 24,
      contextWindowMs: 1000 * 60 * 60 * 24 * 30,
    };
    const assetPriceHistory: AssetPriceHistoryGetResponse = await sdk.getAssetPriceHistory(params);
    expect(assetPriceHistory).toBeInstanceOf(Object);
    expect(assetPriceHistory.assetPriceHistory).toBeInstanceOf(Object);
    expect(assetPriceHistory.assetPriceHistory[UnderlyingAsset.BTC]).toBeInstanceOf(Array);
    expect(assetPriceHistory.assetPriceHistory[UnderlyingAsset.BTC][0]).toMatchObject({
      timestamp: expect.any(Number),
      price: expect.any(Number),
    });
  });

  test('getOptionPriceHistory should return an array of OptionPriceHistoryData', async () => {
    const params: OptionPriceHistoryGetParams = {
      optionkey: 'BTC-27MAR26-20000-C',
    };
    const optionPriceHistory = await sdk.getOptionPriceHistory(params);
    expect(optionPriceHistory).toBeInstanceOf(Object);
    expect(optionPriceHistory.results).toBeInstanceOf(Array);
    expect(optionPriceHistory.results[0]).toMatchObject({
      optionKey: expect.any(String),
      priceHistory: expect.any(Object),
    });
  });

  test('getOptionsMarketBoard should return an array of TradeBoardData', async () => {
    const params: TradeBoardGetParams = {
      asset: optionSchemaMcp.inputSchema.properties.asset.default as UnderlyingAsset,
      optionType: optionSchemaMcp.inputSchema.properties.optionType.default as OptionType,
      positionType: optionSchemaMcp.inputSchema.properties.positionType.default as PositionType,
    };
    const tradeBoard = await sdk.getOptionsMarketBoard(params);
    expect(tradeBoard).toBeInstanceOf(Array);
    expect(tradeBoard[0]).toMatchObject({
      optionId: expect.any(Number),
      symbol: expect.any(String),
      type: expect.any(String),
      expiry: expect.any(String),
      strike: expect.any(Number),
      protocol: expect.any(String),
      marketName: expect.any(String),
      contractPrice: expect.any(Number),
      availableAmount: expect.any(String),
    });
  });

  test('getPerpsPairs should return an array of PerpsPairData', async () => {
    const params: GetPairsParams = {
      protocol: perpsPairsSchemaMcp.inputSchema.properties.protocol.default,
    };
    const perpsPairs = await sdk.getPerpsPairs(params);
    expect(perpsPairs).toBeInstanceOf(Object);
    expect(perpsPairs.pairs).toBeInstanceOf(Array);
    expect(perpsPairs.pairs[0]).toMatchObject({
      symbol: expect.any(String),
    });
  });

  test('getNextFundingRate should return an array of perpetuals Next Funding Rate', async () => {
    const params: GetNextFundingRateRequest = {
      protocol: perpsNextFundingRateSchemaMcp.inputSchema.properties.protocol.default,
    };
    const nextFundingRate = await sdk.getNextFundingRate(params);
    expect(nextFundingRate).toBeInstanceOf(Object);
    expect(nextFundingRate.fundingRate).toBeInstanceOf(String);
  });

  test('getTradingFee should return an array of perpetuals trading fee', async () => {
    const params: GetTradingFeeRequest = {
      protocol: perpsTradingFeeSchemaMcp.inputSchema.properties.protocol.default,
    };
    const tradingFee = await sdk.getTradingFee(params);
    expect(tradingFee).toBeInstanceOf(Array);
    expect(tradingFee[0]).toMatchObject({
      symbol: expect.any(String),
      fee: expect.any(String),
    });
  });

  test('getAssetPrice should return an array of asset price in the perps protocol', async () => {
    const params: GetAssetPriceRequest = {
      protocol: perpsAssetPriceSchemaMcp.inputSchema.properties.protocol.default,
      symbol: perpsAssetPriceSchemaMcp.inputSchema.properties.symbol.default,
    };
    const assetPrice: GetAssetPriceResponse = await sdk.getAssetPrice(params);
    expect(assetPrice).toBeInstanceOf(Number);
  });

  test('getCurrentFundingRate should return an array of perpetuals current funding rate', async () => {
    const params: GetCurrentFundingRateRequest = {
      protocol: perpsCurrentFundingRateSchemaMcp.inputSchema.properties.protocol.default,
      pair: perpsCurrentFundingRateSchemaMcp.inputSchema.properties.pair.default,
    };
    const currentFundingRate = await sdk.getCurrentFundingRate(params);
    expect(currentFundingRate).toBeInstanceOf(Number);
  });

  test('getTradingIndicators should return an array of TradingIndicatorData', async () => {
    const params: GetTradingIndicatorsRequest = {
      exchange: getTradingIndicatorsSchemaMcp.inputSchema.properties.exchange.default,
      symbol: getTradingIndicatorsSchemaMcp.inputSchema.properties.symbol.default,
      interval: getTradingIndicatorsSchemaMcp.inputSchema.properties.interval.default,
    };
    const tradingIndicators = await sdk.getTradingIndicators(params);
    expect(tradingIndicators).toBeInstanceOf(Object);
    expect(tradingIndicators.rsi).toBeInstanceOf(Object);
    expect(tradingIndicators.ema).toBeInstanceOf(Object);
    expect(tradingIndicators.macd).toBeInstanceOf(Object);
    expect(tradingIndicators.rsi.value).toBeInstanceOf(Number);
    expect(tradingIndicators.ema.value).toBeInstanceOf(Number);
    expect(tradingIndicators.macd.valueMACD).toBeInstanceOf(Number);
    expect(tradingIndicators.macd.valueMACDSignal).toBeInstanceOf(Number);
    expect(tradingIndicators.macd.valueMACDHist).toBeInstanceOf(Number);
  });

  test('getAssetPricePrediction should return an array of AssetPricePredictionData', async () => {
    const params: GetAssetPricePredictionParams = {
      asset: getAssetPricePredictionsSchemaMcp.inputSchema.properties.asset.default,
      timeframe: getAssetPricePredictionsSchemaMcp.inputSchema.properties.timeframe.default,
    };
    const assetPricePrediction = await sdk.getAssetPricePrediction(params);
    expect(assetPricePrediction).toBeInstanceOf(Object);
    expect(assetPricePrediction.prediction).toBeInstanceOf(Object);
    expect(assetPricePrediction.prediction.prediction).toBeInstanceOf(String);
    expect(assetPricePrediction.prediction.confidenceIntervals).toBeInstanceOf(Array);
    expect(assetPricePrediction.prediction.timestamp).toBeInstanceOf(Number);
    expect(assetPricePrediction.prediction.asset).toBeInstanceOf(String);
    expect(assetPricePrediction.prediction.timeframe).toBeInstanceOf(String);
    expect(assetPricePrediction.prediction.rawInference).toBeInstanceOf(Object);
  });
});
