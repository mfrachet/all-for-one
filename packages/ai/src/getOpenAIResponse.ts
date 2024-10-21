import { openai } from "./openAi";
import { computePrompt } from "./promps/compute/compute.prompt";
import { AiContext } from "./types";

export const getOpenAIResponse = async (
  prompt: string,
  context: AiContext = []
) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: context.concat([
      {
        role: "user",
        content: computePrompt(prompt),
      },
    ]),
  });

  return response.choices[0].message.content;
};
