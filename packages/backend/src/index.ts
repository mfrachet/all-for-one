import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ComputeController } from "./controllers/ComputeController";
import { CachingService } from "./services/cachingService";
import { AiContext } from "./types";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const cacheService = new CachingService<AiContext>();
const computeController = new ComputeController(cacheService);

app.post("/compute/:id", (req, res) => computeController.compute(req, res));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
