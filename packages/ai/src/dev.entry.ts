import "dotenv/config";
import { openai } from "./openAi";
import { computePrompt } from "./promps/compute/compute.prompt";
(async () => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: computePrompt(`Random data for a line chart`),
      },
    ],
  });

  console.log(response.choices[0].message.content);
})();
