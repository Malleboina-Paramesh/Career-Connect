import createLogger from "@local/logger";

const logger = createLogger({
  name: "api",
  env: process.env.NODE_ENV === "production" ? "production" : "development",
});

export default logger;
