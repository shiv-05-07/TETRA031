import { Router } from "express";
import healthRoutes from "./health.routes";
import uploadRoutes from "./upload.routes";
import curriculumRoutes from "./curriculum.routes";

const apiRouter = Router();

apiRouter.use(healthRoutes);
apiRouter.use(uploadRoutes);
apiRouter.use(curriculumRoutes);

// Fallback handler for unmatched /api/* routes to prevent Vite middleware interception
apiRouter.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `API endpoint ${req.method} ${req.originalUrl} not found`,
  });
});

export default apiRouter;
