import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  token?: string;
  userId?: string;
}

export const adminMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.authToken || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(403).json({
      error: true,
      msg: "Unauthorizes"
    });
    return;
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as { role: string, userId: string };

    if (decode.role !== "admin") {
      res.status(403).json({
        error: true,
        msg: "Unauthorizes"
      })
      return
    }

    req.token = token;
    req.userId = decode.userId
    next();
  } catch (error) {
    res.status(403).json({
      error: true,
      message: "Invalid token"
    })
  }
}

export const userMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.authToken || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(403).json({
      error: true,
      msg: "Unauthorizes"
    });
    return;
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as { role: string, userId: string };

    req.token = token;
    req.userId = decode.userId
    next();
  } catch (error) {
    res.status(403).json({
      error: true,
      message: "Invalid token"
    })
  }
}

