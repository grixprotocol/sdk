export interface ElizaExample {
  user: string;
  content: {
    text: string;
    action?: string;
  };
}

export interface ElizaAction {
  template: string;
  name: string;
  similes: string[];
  description: string;
  examples: ElizaExample[][];
}

export interface ElizaService {
  actions: {
    options: ElizaAction;
    // Add more action types as needed
  };
}
