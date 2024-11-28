export async function fetchAssetPrice(asset: string): Promise<number> {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${asset.toLowerCase()}&vs_currencies=usd`
  );
  const data = await response.json();
  return data[asset].usd;
}
