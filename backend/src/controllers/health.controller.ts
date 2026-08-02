import { Request, Response } from "express";

export function getHealth(req: Request, res: Response) {
  res.json({
    status: "ok",
    service: "Lumini Backend",
    timestamp: new Date().toISOString(),
  });
}

export function getTest(req: Request, res: Response) {
  res.json({
    success: true,
  });
}
