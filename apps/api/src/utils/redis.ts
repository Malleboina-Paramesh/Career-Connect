import Redis from "ioredis";
import logger from "../utils/logger";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Redis connection
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

redis.on("error", (err) => {
  logger.error("Redis connection error:", err);
});

redis.on("connect", () => {
  logger.info("Connected to Redis");
});

logger.info(
  `Connected to Redis at ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
);

export default redis;
