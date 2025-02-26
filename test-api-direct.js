// Test the API endpoint directly without using the SDK
const apiKey = 'VMqp6kafQA7g6mHMtd7N92wgtQz8yyj41izSE8cT2';
const baseUrl = 'https://internal-api-dev.grix.finance';
const optionKey = 'BTC-27MAR25-8400-C'; // Updated to a more recent option key
const positionType = 'long';
const asset = 'bitcoin'; // For testing the asset price endpoint

// First test a known working API to verify network connectivity
async function testNetworkConnectivity() {
  try {
    console.log('Testing network connectivity with CoinGecko API...');
    
    const response = await fetch(
      'https://api.coingecko.com/api/v3/ping',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to connect to CoinGecko: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    console.log('CoinGecko API Response:', JSON.stringify(result, null, 2));
    console.log('Network connectivity confirmed ✅');
    return result;
  } catch (error) {
    console.error('Network connectivity test failed:', error);
    throw error;
  }
}

// Test the docs endpoint (swagger docs) of our API
async function testDocsEndpoint() {
  try {
    console.log('\nTesting API docs endpoint...');
    
    const response = await fetch(
      `${baseUrl}/docs`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'Origin': 'http://localhost:5173' // Adding Origin header from allowed CORS origins
        }
      }
    );
    
    console.log('Docs Endpoint Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Docs Endpoint Error Response:', errorText);
      throw new Error(`Failed to get API docs: ${response.status} ${errorText}`);
    } else {
      console.log('Docs endpoint responded successfully');
    }
    
    return true;
  } catch (error) {
    console.error('API docs test failed:', error);
    throw error;
  }
}

// Test the asset price endpoint
async function testAssetPriceEndpoint() {
  try {
    console.log('\nTesting asset price API endpoint...');
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('asset', asset);
    
    console.log(`Request URL: ${baseUrl}/asset-price?${queryParams.toString()}`);
    console.log('Request Headers:', { 
      'Content-Type': 'application/json', 
      'x-api-key': apiKey,
      'Origin': 'http://localhost:5173'
    });
    
    const response = await fetch(
      `${baseUrl}/asset-price?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'Origin': 'http://localhost:5173'
        }
      }
    );
    
    console.log('Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error Response Body:', errorText);
      throw new Error(`Failed to get asset price: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    console.log('Asset Price API Response:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Asset price API test failed:', error);
    throw error;
  }
}

// Test the health endpoint of our API
async function testApiHealth() {
  try {
    console.log('\nTesting API health endpoint...');
    
    const response = await fetch(
      `${baseUrl}/health`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'Origin': 'http://localhost:5173' // Adding Origin header from allowed CORS origins
        }
      }
    );
    
    console.log('Health Endpoint Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Health Endpoint Error Response:', errorText);
      throw new Error(`Failed to get API health: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    console.log('Health Endpoint Response:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('API health test failed:', error);
    throw error;
  }
}

// Then test our option price API
async function testApiDirectly() {
  try {
    console.log('\nTesting option price API endpoint...');
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('optionKey', optionKey);
    queryParams.append('positionType', positionType);
    
    console.log(`Request URL: ${baseUrl}/option-price?${queryParams.toString()}`);
    console.log('Request Headers:', { 
      'Content-Type': 'application/json', 
      'x-api-key': apiKey,
      'Origin': 'http://localhost:5173' // Adding Origin header from allowed CORS origins
    });
    
    const response = await fetch(
      `${baseUrl}/option-price?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'Origin': 'http://localhost:5173' // Adding Origin header from allowed CORS origins
        }
      }
    );
    
    console.log('Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error Response Body:', errorText);
      throw new Error(`Failed to get option price: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    console.log('Option Price API Response:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Option price API test failed:', error);
    throw error;
  }
}

// Run all tests in sequence
async function runTests() {
  try {
    // First test network connectivity
    await testNetworkConnectivity();
    
    // Test docs endpoint
    try {
      await testDocsEndpoint();
    } catch (error) {
      console.log('API docs check failed, but continuing with other tests...');
    }
    
    // Then test API health
    try {
      await testApiHealth();
    } catch (error) {
      console.log('API health check failed, but continuing with other tests...');
    }
    
    // Test asset price endpoint
    try {
      await testAssetPriceEndpoint();
    } catch (error) {
      console.log('Asset price API check failed, but continuing with option price test...');
    }
    
    // Then test our option price API
    await testApiDirectly();
    
    console.log('\nAll tests completed successfully ✅');
  } catch (error) {
    console.error('\nTests failed:', error);
  }
}

runTests(); 