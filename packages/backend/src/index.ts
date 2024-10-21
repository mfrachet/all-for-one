import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getOpenAIResponse, computePrompt } from "@all-for-one/ai";
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/compute", async (req, res) => {
  const input = req.body.input;
  const response = await getOpenAIResponse(computePrompt(input));

  if (!response) {
    return res.status(404).send({ error: "Not found" });
  }

  try {
    res.send(JSON.parse(response));
  } catch (error) {
    res.status(500).send({ error: "Internal server error", details: error });
  }
});

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});
