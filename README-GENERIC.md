# Generic Grix SDK

A lightweight, extensible SDK for integrating with agent platforms like Model Context Protocol (MCP), Eliza, and others.

## Features

- **Simple Interface**: Clean, minimal API for all agent platforms
- **Extensible**: Easily add new platform adapters
- **Consistent**: Uniform schema and response formats
- **Type-Safe**: Full TypeScript support
- **Auto-generating**: Creates Eliza actions automatically from SDK capabilities

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

The SDK now makes Eliza integration even simpler with auto-generated actions:

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

### Using the Plugin

```typescript
import { createGrixPlugin } from './grix-plugin';

// In your Eliza setup code
async function setupPlugins(runtime) {
  const grixPlugin = await createGrixPlugin();
  runtime.registerPlugin(grixPlugin);
}
```

### How It Works

The auto-generation works by:

1. Discovering all available tools in the SDK
2. Creating Eliza actions for each tool with:
   - Proper parameter extraction templates
   - Standard validation logic
   - Consistent error handling
   - Pre-configured examples

When you add new features to the SDK, they will automatically be available in your Eliza plugin without requiring any code changes!

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
