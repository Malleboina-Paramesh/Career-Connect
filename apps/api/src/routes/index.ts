import express, { Router } from "express";
import { EmailRouter } from "./email";

const router: Router = express.Router();

//email route (for sending emails)
router.use("/email", EmailRouter);

router.get("/", (request, response) => {
  response.json({ data: "working dev team", message: "Welcome to the API" });
});

export default router;
