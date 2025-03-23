/**
 * Generic Eliza Service Adapter
 * 
 * This adapter automatically exposes SDK functionality to Eliza
 * without requiring custom service implementations for each endpoint.
 */

import { GrixSDK } from '../index';

export interface ServiceOptions {
    timeout?: number;
    apiKey?: string;
    baseUrl?: string;
}

// Parameter transformation functions
type ParamTransformer = (params: Record<string, any>) => Record<string, any>;
// Response transformation functions
type ResponseTransformer = (response: any, params?: Record<string, any>) => any;

/**
 * Service configuration for each endpoint
 */
interface ServiceEndpoint {
    // Function to call on the SDK
    sdkMethod: string;
    // Parameter validation and transformation
    paramValidator?: (params: Record<string, any>) => boolean;
    paramTransformer?: ParamTransformer;
    // Response transformation
    responseTransformer?: ResponseTransformer;
    // Caching options
    cacheDuration?: number; // milliseconds
}

/**
 * Create a universal Eliza service adapter
 * This will automatically handle any SDK method without requiring custom service implementations
 */
export class GenericElizaService {
    private sdk: GrixSDK | null = null;
    private apiKey: string;
    private baseUrl?: string;
    private timeout: number;
    private endpointConfig: Record<string, ServiceEndpoint>;
    private cache: Record<string, { data: any; timestamp: number }> = {};

    constructor(options: ServiceOptions) {
        if (!options.apiKey) {
            throw new Error('API key is required');
        }

        this.apiKey = options.apiKey;
        this.baseUrl = options.baseUrl;
        this.timeout = options.timeout || 30000;

        // Configure endpoints with their transformers and validators
        this.endpointConfig = this.getEndpointConfig();
    }

    /**
     * Configure all supported endpoints with their transformers
     * When adding a new SDK method, just add it here
     */
    private getEndpointConfig(): Record<string, ServiceEndpoint> {
        return {
            'getPrice': {
                sdkMethod: 'fetchAssetPrice',
                paramTransformer: (params) => {
                    // Convert asset names
                    const asset = params.asset?.toUpperCase();
                    return asset === 'BTC' ? 'bitcoin' : 'ethereum';
                },
                responseTransformer: (price, params) => {
                    return {
                        asset: params?.asset?.toUpperCase() || 'BTC',
                        price,
                        formattedPrice: this.formatPrice(price),
                        timestamp: Date.now()
                    };
                },
                cacheDuration: 30000 // 30 seconds
            },

            'getOptions': {
                sdkMethod: 'getOptionsMarketBoard',
                paramTransformer: (params) => {
                    const asset = params.asset?.toUpperCase();
                    const optionType = params.optionType?.toLowerCase();
                    const positionType = params.positionType?.toLowerCase();

                    return {
                        asset: asset === 'BTC' ? 'BTC' : 'ETH',
                        optionType: optionType === 'call' ? 'CALL' : 'PUT',
                        positionType: positionType === 'long' ? 'LONG' : 'SHORT'
                    };
                },
                responseTransformer: (response, params) => {
                    return {
                        asset: params?.asset || 'BTC',
                        optionType: params?.optionType || 'call',
                        options: this.transformOptionsData(response),
                        timestamp: Date.now()
                    };
                },
                cacheDuration: 60000 // 1 minute
            },

            'generateSignals': {
                sdkMethod: 'requestTradeAgentSignals',
                paramTransformer: (params) => {
                    // Map between Eliza's parameters and SDK parameters
                    const riskMap = {
                        'conservative': 'low',
                        'moderate': 'medium',
                        'aggressive': 'high'
                    };

                    const strategyMap = {
                        'income': 'income',
                        'growth': 'growth',
                        'hedging': 'hedging',
                        'safety': 'hedging'
                    };

                    return [
                        0, // Default agent ID
                        {
                            asset: params.asset?.toUpperCase() || 'BTC',
                            budget: params.budget_usd || 10000,
                            config: {
                                risk_profile: riskMap[params.risk_level || 'moderate'] || 'medium',
                                strategy: strategyMap[params.strategy_focus || 'growth'] || 'growth'
                            }
                        }
                    ];
                },
                cacheDuration: 120000 // 2 minutes
            },

            'getPerpsPairs': {
                sdkMethod: 'getPairs',
                paramTransformer: (params) => {
                    return {
                        protocol: params.protocolName === 'all' ? undefined : params.protocolName,
                        baseAsset: params.asset
                    };
                },
                responseTransformer: (response) => {
                    return {
                        pairs: response.pairs || [],
                        timestamp: Date.now()
                    };
                },
                cacheDuration: 300000 // 5 minutes
            }
        };
    }

    /**
     * Initialize SDK if needed
     */
    private async getSDK(): Promise<GrixSDK> {
        if (!this.sdk) {
            try {
                console.log('Initializing Grix SDK...');
                this.sdk = await GrixSDK.initialize({
                    apiKey: this.apiKey,
                    baseUrl: this.baseUrl
                });
                console.log('SDK initialized successfully');
            } catch (error) {
                console.error('SDK initialization failed:', error);
                throw error;
            }
        }
        return this.sdk;
    }

    /**
     * Generic method caller with caching
     * This handles any method based on the endpoint configuration
     */
    private async callMethod(
        methodName: string,
        params: Record<string, any>
    ): Promise<any> {
        try {
            // Get endpoint configuration
            const config = this.endpointConfig[methodName];
            if (!config) {
                throw new Error(`Method ${methodName} is not configured`);
            }

            // Check cache if enabled
            if (config.cacheDuration) {
                const cacheKey = `${methodName}:${JSON.stringify(params)}`;
                const cached = this.cache[cacheKey];
                const now = Date.now();

                if (cached && now - cached.timestamp < config.cacheDuration) {
                    console.log(`Using cached data for ${methodName}`);
                    return cached.data;
                }
            }

            // Get SDK instance
            const sdk = await this.getSDK();

            // Validate parameters if a validator is provided
            if (config.paramValidator && !config.paramValidator(params)) {
                throw new Error(`Invalid parameters for ${methodName}`);
            }

            // Transform parameters if needed
            let transformedParams = params;
            if (config.paramTransformer) {
                transformedParams = config.paramTransformer(params);
            }

            // Call the SDK method
            const sdkMethod = config.sdkMethod;
            console.log(`Calling SDK method ${sdkMethod} with params:`, transformedParams);

            let result;
            if (Array.isArray(transformedParams)) {
                // Handle methods that expect multiple arguments
                result = await sdk[sdkMethod](...transformedParams);
            } else {
                // Handle methods that expect a single object
                result = await sdk[sdkMethod](transformedParams);
            }

            // Transform response if needed
            if (config.responseTransformer) {
                result = config.responseTransformer(result, params);
            }

            // Cache result if caching is enabled
            if (config.cacheDuration) {
                const cacheKey = `${methodName}:${JSON.stringify(params)}`;
                this.cache[cacheKey] = {
                    data: result,
                    timestamp: Date.now()
                };
            }

            return result;
        } catch (error) {
            console.error(`Error calling ${methodName}:`, error);
            throw error;
        }
    }

    /**
     * Format price for display
     */
    private formatPrice(price: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }

    /**
     * Transform options data to standard format
     */
    private transformOptionsData(options: any[]): any[] {
        if (!Array.isArray(options)) {
            return [];
        }

        return options.map(opt => ({
            optionId: opt.id || Math.random() * 1000000,
            expiry: opt.expiry,
            strike: opt.strike,
            price: opt.price,
            protocol: opt.protocol,
            available: opt.available || 1,
            type: opt.optionType
        }));
    }

    /**
     * Public methods that match the existing GrixService interface
     * These are thin wrappers around the generic callMethod
     */

    async getPrice(request: { asset: string }) {
        return this.callMethod('getPrice', request);
    }

    async getOptions(request: {
        asset: string;
        optionType: string;
        positionType?: string;
        strike?: number;
        expiry?: string;
        limit?: number;
    }) {
        return this.callMethod('getOptions', request);
    }

    async generateSignals(request: {
        asset: string;
        budget_usd: number;
        trade_window_ms: number;
        risk_level: "conservative" | "moderate" | "aggressive";
        strategy_focus: "income" | "growth" | "hedging";
    }) {
        return this.callMethod('generateSignals', request);
    }

    async getPerpsPairs(request: { protocolName: string; asset?: string }) {
        return this.callMethod('getPerpsPairs', request);
    }

    /**
     * Generic method to call any configured endpoint
     * This allows adding new methods without changing the class
     */
    async call(methodName: string, params: Record<string, any>) {
        return this.callMethod(methodName, params);
    }
} 