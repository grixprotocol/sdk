import { OPENAI_API_URL } from '@config';
import { SendChatbotRequestParams } from './types';

export async function sendChatbotRequest({
  chatbotContext,
  enhancedUserMessage,
  systemInstructions,
  userContext = [],
  openAIKey,
}: SendChatbotRequestParams): Promise<string> {
  console.log('openai key length ->', openAIKey.length);
  console.log("openai key's first 4 characters ->", openAIKey.substring(0, 4));

  const requestBody = {
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: systemInstructions,
      },
      ...chatbotContext,
      ...(userContext || []),
      { role: 'user', content: enhancedUserMessage },
    ],
  };

  console.log('Request body being sent:', JSON.stringify(requestBody, null, 2));

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAIKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  console.log('Response status:', response.status);
  console.log('Response status text:', response.statusText);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Error response body:', errorBody);
    throw new Error(
      `Error from OpenAI API: ${response.status} - ${response.statusText}\nBody: ${errorBody}`
    );
  }

  const responseData = await response.json();
  console.log('OpenAI response data:', JSON.stringify(responseData, null, 2));

  const assistantResponse = responseData.choices[0].message.content as string;
  return assistantResponse;
}
