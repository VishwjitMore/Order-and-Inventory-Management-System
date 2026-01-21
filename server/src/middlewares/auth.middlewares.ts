import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthTokenPayload extends JwtPayload {
  userId: string;
  role: "USER" | "ADMIN";
}

const isAuthTokenPayload = (payload: JwtPayload): payload is AuthTokenPayload => {
  return (
    typeof payload === "object" &&
    payload !== null &&
    typeof (payload as any).userId === "string" &&
    ((payload as any).role === "USER" || (payload as any).role === "ADMIN")
  );
};

export const authenticate = (
  req: Request & { user?: AuthTokenPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication token missing",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!isAuthTokenPayload(decoded)) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
