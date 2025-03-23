/**
 * Action Generator for Eliza
 * 
 * This module provides utilities to automatically generate Eliza actions
 * from the SDK capabilities, eliminating the need to create new actions
 * for each new feature.
 */

import type { ElizaAction, ElizaExample } from './types';
import { PlatformAdapter } from '../types';
import { GrixSDK } from '../../index';

/**
 * Action definition for easy generation
 */
interface ActionDefinition {
    name: string;
    toolName: string;
    similes: string[];
    description: string;
    template: string;
    examples: ElizaExample[][];
    parameterMapper?: (params: Record<string, unknown>) => Record<string, unknown>;
    responseFormatter?: (response: any, params?: Record<string, unknown>) => string;
}

/**
 * Base implementation for generating handlers
 * This enables creating a fully functional Eliza action from a minimal definition
 */
export function createActionHandler(
    sdk: GrixSDK,
    actionDef: ActionDefinition
): {
    validate: (runtime: any) => Promise<boolean>;
    handler: (runtime: any, message: any, state?: any, options?: any, callback?: any) => Promise<boolean>;
} {
    return {
        // Standard validation that checks for API key
        validate: async (runtime: any): Promise<boolean> => {
            try {
                const apiKey = runtime.getSetting("GRIX_API_KEY");
                return !!apiKey;
            } catch {
                return false;
            }
        },

        // Universal handler that:
        // 1. Extracts parameters using the template
        // 2. Maps parameters if needed
        // 3. Calls the appropriate SDK method
        // 4. Formats the response
        handler: async (
            runtime: any,
            message: any,
            state?: any,
            _options?: any,
            callback?: any
        ): Promise<boolean> => {
            try {
                // Get API key from runtime
                const apiKey = runtime.getSetting("GRIX_API_KEY");
                if (!apiKey) {
                    throw new Error("GRIX_API_KEY is required");
                }

                // Step 1: Extract parameters using LLM
                const template = actionDef.template.replace("{{recentMessages}}", message.content.text);
                const extractedParams = await runtime.generateObject({
                    context: template,
                    modelClass: runtime.ModelClass.SMALL,
                });

                // Step 2: Process parameters if a mapper is provided
                const processedParams = actionDef.parameterMapper
                    ? actionDef.parameterMapper(extractedParams)
                    : extractedParams;

                // Step 3: Call SDK operation
                const elizaPlatform = sdk.eliza;
                const response = await elizaPlatform.handleOperation(actionDef.toolName, processedParams);

                // Step 4: Format and return response
                let responseText = "";
                if (response.content && response.content.length > 0) {
                    responseText = response.content[0].text;
                }

                // Apply custom formatter if provided
                if (actionDef.responseFormatter) {
                    responseText = actionDef.responseFormatter(response, processedParams);
                }

                // Send response via callback
                if (callback) {
                    await callback({ text: responseText });
                }

                // Update state if provided
                if (state) {
                    state.responseData = { text: responseText, action: actionDef.name };
                }

                return true;
            } catch (error) {
                console.error(`Error in ${actionDef.name} handler:`, error);
                if (callback) {
                    await callback({
                        text: `Sorry, I couldn't complete the ${actionDef.description.toLowerCase()}. Error: ${error instanceof Error ? error.message : String(error)}`
                    });
                }
                return false;
            }
        }
    };
}

/**
 * Generate a complete Eliza action from a definition
 */
export function generateElizaAction(
    sdk: GrixSDK,
    actionDef: ActionDefinition
): Record<string, any> {
    const { validate, handler } = createActionHandler(sdk, actionDef);

    return {
        name: actionDef.name,
        similes: actionDef.similes,
        description: actionDef.description,
        examples: actionDef.examples,
        validate,
        handler
    };
}

/**
 * Generate a complete Eliza plugin with all available actions
 */
export async function generateElizaPlugin(sdk: GrixSDK): Promise<any> {
    const elizaPlatform = sdk.eliza;

    // Auto-generate action definitions from available tools
    const actionDefinitions = await generateActionDefinitions(elizaPlatform);

    // Create actions from definitions
    const actions = actionDefinitions.map(def => generateElizaAction(sdk, def));

    // Return the plugin structure
    return {
        name: "grix",
        description: "Grix Finance Plugin - Cryptocurrency prices, options data, and trading signals",
        actions,
        evaluators: [],
        providers: []
    };
}

/**
 * Generate action definitions from the available tools in the platform
 */
async function generateActionDefinitions(elizaPlatform: PlatformAdapter): Promise<ActionDefinition[]> {
    // Get actions from the platform
    const actions = typeof elizaPlatform.getActions === 'function'
        ? elizaPlatform.getActions()
        : {};

    // Get templates
    const templates = typeof elizaPlatform.getTemplates === 'function'
        ? elizaPlatform.getTemplates()
        : {};

    // Convert to action definitions
    return Object.entries(actions).map(([key, action]) => {
        // Map from action name to tool name
        const toolName = action.name.toLowerCase().replace(/^get_/, '').replace(/_/g, '_');

        return {
            name: action.name,
            toolName,
            similes: action.similes,
            description: action.description,
            template: action.template || templates[key] || '',
            examples: action.examples
        };
    });
} 