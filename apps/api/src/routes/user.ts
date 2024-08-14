import express from "express";
import { db } from "../utils/db";

const router = express.Router();

router.get("/users", async (_, response) => {
  const users = await db.user.findMany();

  console.log("Returning user", users);
  response.json({ data: users });
});

export default router;
