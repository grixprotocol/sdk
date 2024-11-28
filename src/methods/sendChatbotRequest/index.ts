import { OPENAI_API_URL } from "@config";
import { SendChatbotRequestParams } from "./types";

export async function sendChatbotRequest({
  chatbotContext,
  enhancedUserMessage,
  systemInstructions,
  userContext = [],
  openAIKey,
}: SendChatbotRequestParams): Promise<string> {
  const requestBody = {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: systemInstructions,
      },
      ...chatbotContext,
      ...(userContext || []),
      { role: "user", content: enhancedUserMessage },
    ],
  };

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAIKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`Error from OpenAI API: ${response}`);
  }

  const responseData = await response.json();
  const assistantResponse = responseData.choices[0].message.content as string;
  return assistantResponse;
}
