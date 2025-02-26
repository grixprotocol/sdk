// Direct test of the optionPriceGet function
import { optionPriceGet } from './src/methods/optionPriceGet/index.js';

async function testDirectOptionPriceGet() {
  try {
    console.log('Testing optionPriceGet directly...');
    
    const result = await optionPriceGet(
      {
        optionKey: 'ETH-30JUN23-1800-C',
        positionType: 'long'
      },
      {
        apiKey: 'VMqp6kafQA7g6mHMtd7N92wgtQz8yyj41izSE8cT2',
        baseUrl: 'https://internal-api-dev.grix.finance'
      }
    );
    
    console.log('Result:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

testDirectOptionPriceGet()
  .then(() => console.log('Test completed successfully'))
  .catch(err => console.error('Test failed:', err)); 