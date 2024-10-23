import { openai } from "./openAi";

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
        content: prompt,
      },
    ]),
  });

  return response.choices[0].message.content;
};
