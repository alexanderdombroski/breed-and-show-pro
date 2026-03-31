import { Router } from "express";
import { getUsers } from "../services/user.service.mts";
const router: Router = Router();

router.get("/", getUsers);

export default router;
