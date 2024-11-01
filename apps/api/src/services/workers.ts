import { Worker, Job } from "bullmq";
import transporter from "./email";
import logger from "../utils/logger";
import redis from "../utils/redis";
import { render } from "@react-email/components";
import CredintailsEmail from "../emails/CredintailsEmail";
import dotenv from "dotenv";
import LoginNotificationEmail from "../emails/LoginNotification";
import { db } from "../utils/db";
import JobNotificationEmailTemplate from "../emails/JobNotificationEmail";

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

export const credentialsWorker = new Worker<CredentialEmailJobData>(
  "credinatials",
  async (job: Job<CredentialEmailJobData>) => {
    logger.info(`Processing job ${job.id}`);
    const { to, subject, loginLink, password, role, subRole } = job.data;

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

    logger.info(`Email sent to ${to}`);
  },
  { connection: redis }
);

export const loginNotificationWorker = new Worker<LoginNotificationJobData>(
  "loginNotification",
  async (job: Job<LoginNotificationJobData>) => {
    logger.info(`Processing job ${job.id}`);
    const { to, subject, loginTime, device } = job.data;

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

    logger.info(`Email sent to ${to}`);
  },
  { connection: redis }
);

export const jobNotificationWorker = new Worker<JobNotificationJobData>(
  "jobNotifications",
  async (job: Job<JobNotificationJobData>) => {
    logger.info(`Processing job ${job.id}`);
    const { applyLink, companyId, companyName, jobLink, jobTitle, subject } =
      job.data;

    const students = await db.company.findMany({
      where: {
        id: companyId,
      },
      include: {
        CompanyFavorite: {
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
        },
      },
    });

    const recipientEmails = await students
      .flatMap((company) => company.CompanyFavorite)
      .map((favorite) => favorite.student.user.email);

    const html = await render(
      JobNotificationEmailTemplate({ jobTitle, companyName, applyLink })
    );

    await transporter.sendMail({
      from: `${process.env.NAME} <${process.env.EMAIL_USER}>`,
      bcc: recipientEmails,
      subject,
      html,
    });

    logger.info(`Email sent to all subscribed students`);
  },
  { connection: redis }
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
