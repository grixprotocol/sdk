# Generic Grix SDK

A lightweight, extensible SDK for integrating with agent platforms like Model Context Protocol (MCP), Eliza, and others.

## Features

- **Simple Interface**: Clean, minimal API for all agent platforms
- **Extensible**: Easily add new platform adapters
- **Consistent**: Uniform schema and response formats
- **Type-Safe**: Full TypeScript support
- **Auto-generating**: Creates Eliza actions automatically from SDK capabilities
- **Self-adapting**: Generic services that adapt to SDK changes automatically

## Installation

```bash
npm install @grixprotocol/sdk
```

## Basic Usage

```typescript
import { GrixSDK } from '@grixprotocol/sdk';

// Initialize the SDK
const grixSdk = await GrixSDK.initialize({
  apiKey: 'your-api-key'
});

// Access platforms directly
const mcpPlatform = grixSdk.mcp;
const elizaPlatform = grixSdk.eliza;

// Get schemas for a platform
const schemas = mcpPlatform.getSchemas();

// Handle operations
const response = await mcpPlatform.handleOperation('toolName', { param1: 'value' });
```

## MCP Integration Example

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { GrixSDK } from "@grixprotocol/sdk";

// Initialize SDK
const grixSdk = await GrixSDK.initialize({
  apiKey: process.env.GRIX_API_KEY || ""
});

// Create MCP server
const server = new Server(
  { name: "GRIX MCP", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Get schemas and register handlers
const mcpPlatform = grixSdk.mcp;
const schemas = mcpPlatform.getSchemas().map(schema => schema.schema);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: schemas };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  return await mcpPlatform.handleOperation(name, args);
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

## Eliza Integration

### Option 1: Auto-generated Plugin

The simplest approach is to use the auto-generated plugin:

```typescript
import type { Plugin } from "@elizaos/core";
import { GrixSDK } from '@grixprotocol/sdk';

/**
 * Create a fully functional Grix plugin for Eliza
 * with just a few lines of code
 */
export async function createGrixPlugin(): Promise<Plugin> {
  // Initialize the SDK
  const grixSdk = await GrixSDK.initialize({
    apiKey: process.env.GRIX_API_KEY || ""
  });

  // Generate a complete Eliza plugin with all available actions
  // No need to manually create actions!
  return await grixSdk.generateElizaPlugin();
}
```

### Option 2: Generic Eliza Service

For more control, you can use the generic service that automatically adapts to SDK changes:

```typescript
import { GrixSDK, GenericElizaService } from '@grixprotocol/sdk';
import { elizaLogger } from "@elizaos/core";

export class GrixService {
  private service: GenericElizaService;
  
  constructor(apiKey: string) {
    // Create the SDK
    const sdk = new GrixSDK();
    
    // Create the generic service that auto-adapts to SDK changes
    this.service = new GenericElizaService({
      apiKey,
      timeout: 60000
    });
  }
  
  // Standard methods that match the existing interface
  async getPrice(request: { asset: string }) {
    elizaLogger.info(`Getting price for ${request.asset}`);
    return this.service.getPrice(request);
  }
  
  async getOptions(request: any) {
    elizaLogger.info(`Getting options for ${request.asset}`);
    return this.service.getOptions(request);
  }
  
  async generateSignals(request: any) {
    elizaLogger.info(`Generating signals with budget ${request.budget_usd}`);
    return this.service.generateSignals(request);
  }
  
  // When new SDK methods are added, you can use them without changing the service code
  async newSdkMethod(request: any) {
    elizaLogger.info(`Using new SDK method`);
    return this.service.call('newEndpoint', request);
  }
}
```

### How It Works

The auto-generation and generic service work by:

1. **Configuration-based Approach**: Each endpoint is defined with parameter and response transformers
2. **Dynamic Method Handling**: New SDK methods can be called without writing new service implementations
3. **Automatic Caching**: Built-in caching system with configurable durations
4. **Consistent Error Handling**: Standardized error processing across all endpoints

When you add new features to the SDK, they will automatically be available through these mechanisms without requiring code changes!

## Adding a Custom Platform

Creating a new platform adapter is straightforward:

```typescript
import { GrixSDK } from '@grixprotocol/sdk';
import { PlatformAdapter } from '@grixprotocol/sdk/lib/modelContextCore/types';

// Create your platform adapter
const myPlatform: PlatformAdapter = {
  getSchemas: () => [
    {
      name: 'myTool',
      schema: {
        type: 'object',
        properties: {
          input: { type: 'string' }
        }
      },
      description: 'My custom tool'
    }
  ],
  
  handleOperation: async (name, args) => {
    if (name === 'myTool') {
      // Implement your tool logic
      return {
        content: [
          { type: 'text', text: `Processed: ${args?.input}` }
        ]
      };
    }
    throw new Error(`Unknown tool: ${name}`);
  }
};

// Register with SDK
const grixSdk = await GrixSDK.initialize({ apiKey: 'your-api-key' });
grixSdk.registerPlatform('myPlatform', myPlatform);

// Use your platform
const platform = grixSdk.platform('myPlatform');
const result = await platform.handleOperation('myTool', { input: 'test' });
```

## License

[MIT](LICENSE)
