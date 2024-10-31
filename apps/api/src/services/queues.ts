import { Queue } from "bullmq";
import redis from "../utils/redis";
import logger from "../utils/logger";
import { credentialsWorker, loginNotificationWorker } from "./workers";

logger.info("loginNotificationWorker" + loginNotificationWorker.isRunning());
logger.info("credentialsWorker" + credentialsWorker.isRunning());

// Create a queue for emails
export const credentialsQueue = new Queue("credinatials", {
  connection: redis,
});
export const loginNotificationsQueue = new Queue("loginNotification", {
  connection: redis,
});
