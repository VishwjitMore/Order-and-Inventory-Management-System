import { Request, Response, NextFunction } from "express";

type Role = "USER" | "ADMIN";

export const authorize =
  (allowedRoles: Role[]) =>
  (req: Request & { user?: { role: Role } }, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
