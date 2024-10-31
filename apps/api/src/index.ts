import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import logger from "./utils/logger";

// Load environment variables
dotenv.config();
if (!process.env.PORT || !process.env.API_PATH) {
  console.error("check your .env file ");
  process.exit(1);
}

// Create express app
const app = express();

// Add middlewares
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN1!, process.env.CORS_ORIGIN2!],
  })
);
app.use(express.json());

// Add routes
app.use(process.env.API_PATH!, routes);

// test route
app.get("/", (request, response) => {
  response.json({ data: "working dev team", message: "Welcome to the API" });
});

app.listen(process.env.PORT, () => {
  logger.info(`Listening on http://localhost:${process.env.PORT}`);
});
