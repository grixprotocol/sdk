export const protocolInfo = {
    Lyra: { name: 'Lyra', isExecution: false },
    Rysk: { name: 'Rysk', isExecution: false },
    Premia: { name: 'Premia', isExecution: true },
    Hegic: { name: 'Hegic', isExecution: false },
    Moby: { name: 'Moby', isExecution: true },
    Panoptic: { name: 'Panoptic', isExecution: false },
    SDX: { name: 'SDX', isExecution: false },
    Stryke: { name: 'Stryke', isExecution: false },
    Thetanuts: { name: 'Thetanuts', isExecution: false },
    OptionBlitz: { name: 'OptionBlitz', isExecution: false },
    Ithaca: { name: 'Ithaca', isExecution: false },
    Zomma: { name: 'Zomma', isExecution: false },
  };
  
  export const chatbotContextInitHandler = async () => {
    const supportedProtocolsData = Object.values(protocolInfo).map((protocol) => protocol.name);
  
    const messages = [
      {
        role: 'user',
        content: 'What does Grix do?',
      },
      {
        role: 'assistant',
        content:
          'Grix is a DeFi options aggregator that fetches and compares options prices from different protocols to help users find the most cost-effective choices and manage positions efficiently.',
      },
      {
        role: 'user',
        content: 'Which protocols does it integrate with?',
      },
      {
        role: 'assistant',
        content: `Currently, Grix fetches DeFi options quotes from the following protocols: ${supportedProtocolsData}. Execution support is available for these protocols: ${JSON.stringify(protocolInfo)}.`,
      },
      {
        role: 'user',
        content: 'Can you explain how I can execute an option trade using Grix?',
      },
      {
        role: 'assistant',
        content:
          'To execute an option trade using Grix, first, select the desired option from the aggregated list of quotes. Then, follow the prompts to confirm your trade details, including the amount and execution protocol. Finally, submit your trade to complete the transaction.',
      },
      {
        role: 'user',
        content: 'What are the advantages of using Grix over other platforms?',
      },
      {
        role: 'assistant',
        content:
          'Grix offers several advantages, including real-time price comparisons across multiple protocols, a user-friendly interface, and the ability to execute trades directly from the aggregator. Additionally, Grix allows users to earn points for their interactions, enhancing the overall trading experience.',
      },
      {
        role: 'user',
        content: 'How do I track my open positions?',
      },
      {
        role: 'assistant',
        content:
          'You can track your open positions directly within the Grix app. Navigate to the "My Positions" section, where you will find a summary of all your active trades, including their current status and potential profit or loss.',
      },
      {
        role: 'user',
        content: 'Can open positions get closed or settled?',
      },
      {
        role: 'assistant',
        content:
          'Yes, open positions can be closed or settled. You can manage your positions within the Grix app. Navigate to the "Dashboard" section, where you will find a summary of all your active trades, including their current status and potential profit or loss.',
      },
      {
        role: 'user',
        content: 'Can you tell me more about the different sections of the Grix app?',
      },
      {
        role: 'assistant',
        content: 'Certainly! Here are the main sections of the Grix app:',
      },
      {
        role: 'assistant',
        content:
          '1. **Trade Section**: This section allows users to see quotes from multiple protocols and execute transactions directly through the Grix app. It provides a comprehensive view of available options for trading.',
      },
      {
        role: 'assistant',
        content:
          '2. **Simple View Section**: This section aggregates quotes from all the biggest DeFi options protocols. However, execution is not valid through this page since not all protocols are enabled for execution yet. The team is actively working on integrating more protocols, and they will be added to the Trade section once execution is enabled.',
      },
      {
        role: 'assistant',
        content:
          '3. **Option Matrix Section**: In this section, you can see all your positions on one page, making it easier to manage and analyze your trades at a glance.',
      },
    ];
  
    return messages;
  };
  