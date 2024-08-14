import cors from "cors";
import express from "express";
import { IUser } from "@local/types";
import userRoute from "./routes/user";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN1!, process.env.CORS_ORIGIN2!],
  })
);

app.use(express.json());

app.use("/api", userRoute);

app.get("/", (request, response) => {
  response.json({ data: "Hello World", message: "Welcome to the API" });
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on http://localhost:${process.env.PORT}`)
);
