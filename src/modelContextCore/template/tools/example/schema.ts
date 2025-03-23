/**
 * JSON Schema for the example tool
 */
export const exampleToolSchema = {
    type: 'object',
    properties: {
        param1: {
            type: 'string',
            description: 'First parameter for the example tool'
        },
        param2: {
            type: 'number',
            description: 'Second parameter for the example tool'
        }
    },
    required: ['param1'],
    additionalProperties: false
}; 