import express from "express";
import logger from "../utils/logger";
import { Router } from "express";
import {
  credentialsQueue,
  jobNotificationQueue,
  loginNotificationsQueue,
} from "../services/queues";

const router = express.Router();

// POST /api/email/credentials - Send email with login credentials
router.post("/credentials", async (req, res) => {
  const { to, password, loginLink, role, subRole } = req.body;
  if (!to || !password || !loginLink) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const subject = "Your Account Details";
  logger.info("/api/email/credentials");
  try {
    await credentialsQueue.add("credinatials", {
      to,
      subject,
      loginLink,
      password,
      role,
      subRole,
    });
    logger.info("Email added to queue " + to);
    res.status(200).json({ message: "Email added to queue." });
  } catch (err) {
    logger.error({ err }, "Failed to enqueue email.");
    res.status(500).json({ message: "Failed to enqueue email." });
  }
});

// POST /api/email/notification - new login notification
router.post("/notification", async (req, res) => {
  const { to, loginTime, device } = req.body;
  if (!to || !loginTime || !device) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const subject = "New Login Detected";

  logger.info("/api/email/notification");

  try {
    await loginNotificationsQueue.add("loginNotifications", {
      to,
      subject,
      loginTime,
      device,
    });
    logger.info("Email added to queue." + to);
    res.status(200).json({ message: "Email added to queue." });
  } catch (err) {
    logger.error({ err }, "Failed to enqueue email.");
    res.status(500).json({ message: "Failed to enqueue email." });
  }
});

// POST /api/email/job-notification - new job notification
router.post("/job-notification", async (req, res) => {
  const { jobTitle, companyId, jobLink, applyLink, companyName } = req.body;

  logger.info({ jobTitle, companyId, jobLink, applyLink, companyName });
  if (!jobTitle || !companyId || !jobLink || !applyLink) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const subject = "New Job Notification from" + companyName;
  logger.info("/api/email/job-notification");

  try {
    await jobNotificationQueue.add("jobNotifications", {
      jobTitle,
      companyId,
      jobLink,
      applyLink,
      companyName,
      subject,
    });
    logger.info("Email added to queue.");
    res.status(200).json({ message: "Email added to queue." });
  } catch (err) {
    logger.error({ err }, "Failed to enqueue email.");
    res.status(500).json({ message: "Failed to enqueue email." });
  }
});

export const EmailRouter: Router = router;
