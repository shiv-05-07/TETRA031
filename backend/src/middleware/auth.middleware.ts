import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized: Missing Token" });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized: Invalid Token" });
  }

  req.user = data.user;
  next();
}
