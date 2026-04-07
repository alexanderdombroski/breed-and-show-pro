import express from "express";
import type { Request, Response, Router } from "express";
import { auth } from "../service/auth.ts";
import { getUserById } from "../models/users.model.mts";

const router: Router = express.Router();

router.get("/me", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const profile = await getUserById(session.user.id);

  res.json(profile);
});

export { router };
