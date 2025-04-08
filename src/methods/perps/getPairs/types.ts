import { PerpsPairsProtocol } from 'src/modelContextCore/mcp/tools/perps/getPairs/schema.js';

export interface GetPairsParams {
  protocol: PerpsPairsProtocol;
  baseAsset?: string;
}

export interface GetPairsResponse {
  pairs: string[];
}
