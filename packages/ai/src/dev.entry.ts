import "dotenv/config";
import { computePrompt } from "./promps/compute/compute.prompt";
import { getOpenAIResponse } from "./getOpenAIResponse";

(async () => {
  const response = await getOpenAIResponse(
    computePrompt(`the evolution of transactions count for the last 2 months`)
  );

  console.log("Result", response);
})();
