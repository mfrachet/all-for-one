import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ComputeController } from "./controllers/ComputeController";
import { CachingService } from "./services/CachingService";
import { AiContext } from "./types";
import { ComputeService } from "./services/ComputeService";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const cacheService = new CachingService<AiContext>();
const computeService = new ComputeService();
const computeController = new ComputeController(computeService, cacheService);

app.post("/compute/:id", async (req, res) => {
  const conversationId = req.params.id;
  const input = req.body.input as string;
  const response = await computeController.compute(conversationId, input);

  if (!response) {
    res.status(404).send({ error: "Not found" });
    return;
  }

  try {
    res.send(response);
  } catch (error) {
    console.error({ error, response });
    res.status(500).send({ error: "Internal server error", details: error });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
