import createLogger from "@local/logger";

const logger = createLogger({
  name: "admins",
  env: process.env.NODE_ENV === "production" ? "production" : "development",
});

export default logger;
