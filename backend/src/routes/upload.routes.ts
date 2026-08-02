import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { uploadController } from "../controllers/upload.controller";

const router = Router();

router.get("/test", (_, res) => {
  res.json({
    success: true,
  });
});

router.post(
  "/upload",
  upload.single("file"),
  uploadController
);

export default router;