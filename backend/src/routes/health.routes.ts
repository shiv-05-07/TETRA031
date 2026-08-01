import { Router } from "express";
import { getHealth, getTest } from "../controllers/health.controller";

const router = Router();

router.get("/health", getHealth);
router.get("/test", getTest);

export default router;
