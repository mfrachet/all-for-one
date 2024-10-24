import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ComputeController } from "./controllers/ComputeController";
import { CachingService } from "./services/CachingService";
import { ComputeService } from "./services/ComputeService";
import { PersistentChartService } from "./services/PersistentChartService";
import { PersistentChartController } from "./controllers/PersistentChartController";
import { ConversationService } from "./services/ConversationService";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const cacheService = new CachingService();
const persistentChartService = new PersistentChartService(cacheService);

const computeService = new ComputeService();
const conversationService = new ConversationService(cacheService);
const computeController = new ComputeController(
  computeService,
  cacheService,
  conversationService
);
const persistentChartController = new PersistentChartController(
  persistentChartService,
  computeService
);

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

app.post("/charts/:id", async (req, res) => {
  const chartId = req.params.id;

  await persistentChartController.pinUnpinChart(chartId);

  res.status(201).end();
});

app.get("/charts", async (req, res) => {
  const charts = await persistentChartController.getCharts();

  res.status(200).send(charts);
});

app.get("/charts/suggestions", async (req, res) => {
  const suggestions = await persistentChartController.getSuggestions();

  res.status(200).send(suggestions);
});

app.get("/conversations/:id", async (req, res) => {
  const conversationId = req.params.id;
  const conversation = await conversationService.getOrCreateConversation(
    conversationId
  );

  res.status(200).send(conversation);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
