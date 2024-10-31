import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Setup Nodemailer transport (use your SMTP service)
const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // App password or email password
  },
});

export default transporter;
