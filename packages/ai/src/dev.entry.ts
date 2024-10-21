import "dotenv/config";
import { computePrompt } from "./promps/compute/compute.prompt";
import { getOpenAIResponse } from "./getOpenAIResponse";

(async () => {
  const response = await getOpenAIResponse(
    computePrompt(`Random data for a line chart`)
  );

  console.log("lol", response);
})();
