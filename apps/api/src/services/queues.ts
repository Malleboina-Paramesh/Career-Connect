import { Queue } from "bullmq";
import redis from "../utils/redis";
import logger from "../utils/logger";
import {
  credentialsWorker,
  jobNotificationWorker,
  loginNotificationWorker,
} from "./workers";

logger.info("loginNotificationWorker " + loginNotificationWorker.isRunning());
logger.info("credentialsWorker " + credentialsWorker.isRunning());
logger.info("jobsNotificationWorkder " + jobNotificationWorker.isRunning());

// Create a queue for emails
export const credentialsQueue = new Queue("credinatials", {
  connection: redis,
});
export const loginNotificationsQueue = new Queue("loginNotifications", {
  connection: redis,
});
export const jobNotificationQueue = new Queue("jobNotifications", {
  connection: redis,
});
