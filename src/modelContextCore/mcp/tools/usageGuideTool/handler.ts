import {
  ToolGuide,
  toolGuides,
  WorkflowGuide,
  workflowGuides,
  WorkflowStep,
  ToolCategory,
} from './schema.js';

interface GuidanceResponse {
  content: {
    type: 'text';
    text: string;
  }[];
}

export interface GuidanceParamsType {
  goal: string;
  category?: ToolCategory;
  specificTool?: keyof typeof toolGuides;
}

export const usageGuideToolHandler = async ({
  goal,
  category,
  specificTool,
}: GuidanceParamsType): Promise<GuidanceResponse> => {
  let response = '';

  // If a specific tool is requested, provide detailed guidance
  if (specificTool && toolGuides[specificTool]) {
    const guide = toolGuides[specificTool];
    response = `
Tool Guide: ${guide.name} (${specificTool})

Category: ${guide.category}

Description:
${guide.description}

Common Use Cases:
${guide.commonUseCases.map((use: string) => `- ${use}`).join('\n')}

Parameters:
${Object.entries(guide.parameters)
  .map(([param, desc]) => `- ${param}: ${desc}`)
  .join('\n')}

Related Tools:
${guide.relatedTools.map((tool: string) => `- ${tool}: ${toolGuides[tool]?.name || tool}`).join('\n')}

Examples:
${guide.examples
  .map(
    (ex) => `
Scenario: ${ex.scenario}
Usage: ${ex.usage}
`
  )
  .join('\n')}

Best Practices:
- Always validate parameters before making calls
- Consider using this tool in combination with its related tools
- Monitor response times and implement appropriate error handling
`;
  }
  // If category is specified, focus on tools in that category
  else if (category) {
    const categoryTools = Object.entries(toolGuides).filter(
      ([, guide]: [string, ToolGuide]) => guide.category === category
    );

    if (categoryTools.length === 0 || !Array.isArray(categoryTools)) {
      response = `No tools found for category: ${category}`;
    } else {
      response = `
Tools for ${category}:

${categoryTools
  .map(
    ([name, guide]: [string, ToolGuide]) => `
${guide.name} (${name})
${guide.description}
Key Use Case: ${guide.commonUseCases[0]}
`
  )
  .join('\n')}

Related Workflows:
${workflowGuides
  .filter((workflow: WorkflowGuide) =>
    workflow.steps.some((step: WorkflowStep) =>
      categoryTools.some(([name]) => step.toolName === name)
    )
  )
  .map(
    (workflow: WorkflowGuide) => `
${workflow.name}
${workflow.description}
Steps:
${workflow.steps.map((step: WorkflowStep) => `- ${step.toolName}: ${step.purpose}`).join('\n')}
`
  )
  .join('\n')}
`;
    }
  }
  // Otherwise, recommend tools based on the goal
  else {
    const keywords = goal.toLowerCase().split(' ');

    // Find relevant tools
    const recommendedTools = Object.entries(toolGuides).filter(([, guide]: [string, ToolGuide]) =>
      keywords.some(
        (keyword: string) =>
          guide.description.toLowerCase().includes(keyword) ||
          guide.commonUseCases.some((use: string) => use.toLowerCase().includes(keyword))
      )
    );

    // Find relevant workflows
    const relevantWorkflows = workflowGuides.filter((workflow: WorkflowGuide) =>
      keywords.some(
        (keyword: string) =>
          workflow.description.toLowerCase().includes(keyword) ||
          workflow.steps.some((step: WorkflowStep) => step.purpose.toLowerCase().includes(keyword))
      )
    );

    response = `
Based on your goal: "${goal}"

Recommended Tools:
${recommendedTools
  .map(
    ([name, guide]: [string, ToolGuide]) => `
${guide.name} (${name})
${guide.description}
Primary Use: ${guide.commonUseCases[0]}
Key Parameters: ${Object.keys(guide.parameters).join(', ')}
`
  )
  .join('\n')}

${
  relevantWorkflows.length > 0
    ? `
Suggested Workflows:
${relevantWorkflows
  .map(
    (workflow: WorkflowGuide) => `
${workflow.name}
${workflow.description}
Steps:
${workflow.steps.map((step: WorkflowStep) => `- ${step.toolName}: ${step.purpose}`).join('\n')}
`
  )
  .join('\n')}`
    : ''
}

For detailed guidance on any specific tool, provide the tool name in the 'specificTool' parameter.
For category-specific guidance, use the 'category' parameter with one of: ${Object.values(ToolCategory).join(', ')}
`;
  }

  return {
    content: [
      {
        type: 'text',
        text: response.trim(),
      },
    ],
  };
};
