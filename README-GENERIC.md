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

## Template Implementation

For more complex platforms, you can use our template pattern:

```typescript
import { GrixSDK } from '@grixprotocol/sdk';
import { PlatformAdapter, ToolSchema } from '@grixprotocol/sdk/lib/modelContextCore/types';

export const createMyPlatform = (sdk: GrixSDK): PlatformAdapter => {
  // Define schemas
  const schemas: ToolSchema[] = [
    {
      name: 'toolName',
      schema: { /* your JSON schema */ },
      description: 'Tool description'
    }
  ];

  // Handle operations
  const handleOperation = async (name, args) => {
    if (name === 'toolName') {
      // Implement your tool
      return {
        content: [{ type: 'text', text: 'Result' }]
      };
    }
    throw new Error(`Unknown tool: ${name}`);
  };

  return {
    getSchemas: () => schemas,
    handleOperation
  };
};
```

## License

[MIT](LICENSE)
