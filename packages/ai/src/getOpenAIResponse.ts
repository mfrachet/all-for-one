import { openai } from "./openAi";
import { computePrompt } from "./promps/compute/compute.prompt";

export const getOpenAIResponse = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: computePrompt(prompt),
      },
    ],
  });

  return response.choices[0].message.content;
};
