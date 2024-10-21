import "dotenv/config";
import { openai } from "./openAi";

(async () => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: `you favorite color?` }],
  });

  console.log(response.choices[0].message.content);
})();
