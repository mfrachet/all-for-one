import "dotenv/config";

import { getOpenAIResponse } from "./getOpenAIResponse";
import { generateClickhouseQuery } from "./promps/generateClickhouseQuery/generateClickhouseQuery.prompt";

(async () => {
  console.time("Computation");

  const response = await getOpenAIResponse(
    generateClickhouseQuery(
      `the evolution of transactions count for the last 2 months`
    )
  );

  console.timeEnd("Computation");

  console.log("Response is ", response);
})();
