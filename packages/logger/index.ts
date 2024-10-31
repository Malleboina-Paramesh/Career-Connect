// packages/logger/index.ts
import pino from "pino";
import path from "path";

interface LoggerOptions {
  name: string;
  env?: "development" | "production";
}

const createLogger = ({ name, env = "development" }: LoggerOptions) => {
  // Create log file path
  const logDir = path.join(process.cwd(), "logs");
  const logFile = path.join(
    logDir,
    `${new Date().toISOString().split("T")[0]}.log`
  );

  const developmentConfig = {
    name,
    level: "debug",
    transport: {
      targets: [
        // Console output with pretty printing
        {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
            messageKey: "msg",
            customPrefix: `[${name}]`,
            customColors: "error:red,warn:yellow,info:blue,debug:green",
          },
        },
        // Development log file
        {
          target: "pino/file",
          options: {
            destination: logFile,
            mkdir: true,
          },
        },
      ],
    },
  };

  const productionConfig = {
    name,
    level: "info",
    transport: {
      targets: [
        // Production console output (minimal)
        {
          target: "pino-pretty",
          options: {
            colorize: false,
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
            messageKey: "msg",
            customPrefix: `[${name}]`,
          },
        },
        // Production log file
        {
          target: "pino/file",
          options: {
            destination: logFile,
            mkdir: true,
            sync: true,
          },
        },
      ],
    },
    timestamp: true,
    formatters: {
      level: (label: any) => {
        return { level: label.toUpperCase() };
      },
    },
  };

  return pino(env === "development" ? developmentConfig : productionConfig);
};

export default createLogger;
