// Note: This is a JavaScript file (.mjs) to work with ES modules
import { GrixSDK } from './dist/index.js';

async function testOptionPriceGet() {
  try {
    console.log('Initializing SDK...');
    const sdk = await GrixSDK.initialize({
      apiKey: 'VMqp6kafQA7g6mHMtd7N92wgtQz8yyj41izSE8cT2',
      // Using the default baseUrl from the SDK
    });

    console.log('Fetching option price...');
    // You may need to replace this with a valid option key
    const optionPrice = await sdk.optionPriceGet({
      optionKey: 'ETH-30JUN23-1800-C',
      positionType: 'long'
    });

    console.log('Option Price Result:');
    console.log(JSON.stringify(optionPrice, null, 2));
    
    return optionPrice;
  } catch (error) {
    console.error('Error testing option price get:', error);
    throw error;
  }
}

// Run the test
testOptionPriceGet()
  .then(() => console.log('Test completed successfully'))
  .catch(err => console.error('Test failed:', err)); 