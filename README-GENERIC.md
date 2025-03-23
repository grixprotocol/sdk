# Generic Grix SDK

A lightweight, extensible SDK for integrating with agent platforms like Model Context Protocol (MCP), Eliza, and others.

## Features

- **Simple Interface**: Clean, minimal API for all agent platforms
- **Extensible**: Easily add new platform adapters
- **Consistent**: Uniform schema and response formats
- **Type-Safe**: Full TypeScript support

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

## Eliza Integration Example

The SDK includes ready-to-use actions that can be easily integrated with Eliza:

```typescript
import type { Plugin } from "@elizaos/core";
import { elizaLogger, generateObjectDeprecated, ModelClass } from '@elizaos/core';
import { GrixSDK, ElizaAction } from '@grixprotocol/sdk';

/**
 * Registers Grix actions with Eliza
 */
export async function createGrixPlugin(): Promise<Plugin> {
  // Initialize the SDK
  const grixSdk = await GrixSDK.initialize({
    apiKey: process.env.GRIX_API_KEY || ""
  });

  // Get pre-defined Eliza actions with templates
  const actions = grixSdk.getElizaActions();
  
  // Create Eliza Action objects
  const elizaActions = Object.entries(actions).map(([key, action]) => {
    return {
      name: action.name,
      similes: action.similes,
      description: action.description,
      examples: action.examples,
      
      // Validate method to check if API keys are available
      validate: async (runtime) => {
        try {
          const apiKey = runtime.getSetting("GRIX_API_KEY");
          return !!apiKey;
        } catch {
          return false;
        }
      },
      
      // Action handler
      handler: async (runtime, message, state, options, callback) => {
        try {
          // Map action name to tool name
          const toolMap = {
            'GET_ASSET_PRICE': 'asset_price',
            'GET_OPTION_PRICE': 'option_price',
            'GET_TRADING_SIGNAL': 'trading_signal',
            'GET_PERPS_PAIRS': 'perps_pairs'
          };
          
          const toolName = toolMap[action.name];
          if (!toolName) {
            throw new Error(`Unknown action: ${action.name}`);
          }
          
          // Extract parameters from user message using the LLM and template
          const template = action.template?.replace("{{recentMessages}}", message.content.text);
          
          if (!template) {
            throw new Error(`No template found for action: ${action.name}`);
          }
          
          const extractedParams = await generateObjectDeprecated({
            runtime,
            context: template,
            modelClass: ModelClass.SMALL
          });
          
          // Call the SDK operation
          const response = await grixSdk.eliza.handleOperation(toolName, extractedParams);
          
          // Handle the response
          if (callback && response.content.length > 0) {
            await callback({
              text: response.content[0].text
            });
          }
          
          // Update state if needed
          if (state) {
            state.responseData = { 
              text: response.content[0].text, 
              action: action.name 
            };
          }
          
          return true;
        } catch (error) {
          elizaLogger.error(`Error in ${action.name} handler:`, error);
          if (callback) {
            await callback({
              text: `Sorry, there was an error: ${error instanceof Error ? error.message : String(error)}`
            });
          }
          return false;
        }
      }
    };
  });

  // Create the plugin
  return {
    name: "grix",
    description: "Grix Finance Plugin - Cryptocurrency prices, options data, and trading signals",
    actions: elizaActions,
    evaluators: [],
    providers: []
  };
}
```

### Using the Plugin

```typescript
import { createGrixPlugin } from './grix-plugin';

// In your Eliza setup code
async function setupPlugins(runtime) {
  const grixPlugin = await createGrixPlugin();
  runtime.registerPlugin(grixPlugin);
}
```

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
