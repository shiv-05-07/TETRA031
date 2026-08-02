import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  generateCurriculumController,
  auditSyllabusController,
} from "../controllers/curriculum.controller";

const router = Router();

router.post("/generate-curriculum", authenticateToken, generateCurriculumController);
router.post("/audit-syllabus", authenticateToken, auditSyllabusController);

export default router;
