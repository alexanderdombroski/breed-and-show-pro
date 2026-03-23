import express from "express";
import type { Request, Response, Router } from "express";

const router: Router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get("/me", (req: Request, res: Response) => {});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get("/:id", (req: Request, res: Response) => {});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.put("/:id", (req: Request, res: Response) => {});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.delete("/:id", (req: Request, res: Response) => {});

export { router };
