/**
 * Example: Using the SDK with Model Context Protocol
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { GrixSDK } from "../src/index.js";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    try {
        // Initialize the Grix SDK
        const grixSdk = await GrixSDK.initialize({
            apiKey: process.env.GRIX_API_KEY || "",
        });

        // Create MCP server
        const server = new Server(
            {
                name: "GRIX MCP",
                version: "1.0.0",
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );

        // Get MCP platform and schemas
        const mcpPlatform = grixSdk.mcp;
        const schemas = mcpPlatform.getSchemas().map(schema => schema.schema);

        // Register handlers
        server.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: schemas,
            };
        });

        server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            return await mcpPlatform.handleOperation(name, args);
        });

        // Start the server
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.error("Grix MCP Server running on stdio");
    } catch (error) {
        console.error("Fatal error:", error);
        process.exit(1);
    }
}

main(); 