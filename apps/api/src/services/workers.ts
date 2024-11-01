import { Worker, Job } from "bullmq";
import transporter from "./email";
import logger from "../utils/logger";
import redis from "../utils/redis";
import { render } from "@react-email/components";
import CredintailsEmail from "../emails/CredintailsEmail";
import dotenv from "dotenv";
import LoginNotificationEmail from "../emails/LoginNotification";
import { db } from "../utils/db";
import JobNotificationEmail from "../emails/JobNotificationEmail";
import { chunk } from "lodash";

// Define the job data interface
interface CredentialEmailJobData {
  to: string;
  subject: string;
  loginLink: string;
  password: string;
  role: string;
  subRole?: string;
}

interface LoginNotificationJobData {
  to: string;
  subject: string;
  loginTime: string;
  device: { browser: string; os: string; deviceType: string };
}

interface JobNotificationJobData {
  subject: string;
  jobTitle: string;
  companyId: string;
  jobLink: string;
  applyLink: string;
  companyName: string;
}

dotenv.config();

const BATCH_SIZE = 50;

export const credentialsWorker = new Worker<CredentialEmailJobData>(
  "credinatials",
  async (job: Job<CredentialEmailJobData>) => {
    const { to, subject, loginLink, password, role, subRole } = job.data;
    logger.info(`Processing job ${job.id} for ${to}`);

    const html = await render(
      CredintailsEmail({
        email: to,
        password,
        loginLink,
        role,
        subRole,
        appName: process.env.NAME,
      })
    );

    await transporter.sendMail({
      from: `${process.env.NAME} <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    logger.info(`job ${job.id} completed for ${to} (credentials)`);
  },
  { connection: redis }
);

export const loginNotificationWorker = new Worker<LoginNotificationJobData>(
  "loginNotifications",
  async (job: Job<LoginNotificationJobData>) => {
    const { to, subject, loginTime, device } = job.data;
    logger.info(`Processing job ${job.id} for ${to}`);

    const html = await render(
      LoginNotificationEmail({
        email: to,
        loginTime,
        device,
        appName: process.env.NAME,
      })
    );

    await transporter.sendMail({
      from: `${process.env.NAME} <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    logger.info(`job ${job.id} completed for ${to} (login notification)`);
  },
  { connection: redis }
);

export const jobNotificationWorker = new Worker<JobNotificationJobData>(
  "jobNotifications",
  async (job: Job<JobNotificationJobData>) => {
    try {
      logger.info(`Processing job ${job.id}`);
      const { applyLink, companyId, companyName, jobTitle, subject } = job.data;

      // Optimize the database query
      const recipientEmails = await db.companyFavorite
        .findMany({
          where: {
            company: {
              id: companyId,
            },
          },
          select: {
            student: {
              select: {
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
          },
        })
        .then((favorites) =>
          favorites.map((favorite) => favorite.student.user.email)
        );

      if (recipientEmails.length === 0) {
        logger.info("No subscribers found for this company");
        return;
      }

      // Render email template once
      const html = await render(
        JobNotificationEmail({
          jobTitle,
          companyName,
          applyLink,
          appName: process.env.NAME,
        })
      );

      // Send emails in batches
      const emailBatches = chunk(recipientEmails, BATCH_SIZE);

      for (const [index, batch] of emailBatches.entries()) {
        await transporter.sendMail({
          from: `${process.env.NAME} <${process.env.EMAIL_USER}>`,
          bcc: batch,
          subject,
          html,
        });

        logger.info(
          `Sent batch ${index + 1}/${emailBatches.length} (${batch.length} recipients)`
        );

        // Add a small delay between batches to avoid rate limiting
        if (index < emailBatches.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      logger.info(
        `Successfully sent emails to ${recipientEmails.length} subscribers`
      );
    } catch (error) {
      logger.error("Error processing job notification:", error);
      throw error; // Rethrow to trigger job retry
    }
  },
  {
    connection: redis,
    limiter: {
      max: 5,
      duration: 1000,
    },
    concurrency: 1,
  }
);

credentialsWorker.on("completed", (job) => {
  logger.info(`Job ${job.id} completed`);
});

credentialsWorker.on("failed", (job, err) => {
  logger.error(`Job ${job?.id} failed with error: ${err.message}`);
});

loginNotificationWorker.on("completed", (job) => {
  logger.info(`Job ${job.id} completed`);
});

loginNotificationWorker.on("failed", (job, err) => {
  logger.error(`Job ${job?.id} failed with error: ${err.message}`);
});

jobNotificationWorker.on("completed", (job) => {
  logger.info(`Job ${job.id} completed`);
});

jobNotificationWorker.on("failed", (job, err) => {
  logger.error(`Job ${job?.id} failed with error: ${err.message}`);
});
