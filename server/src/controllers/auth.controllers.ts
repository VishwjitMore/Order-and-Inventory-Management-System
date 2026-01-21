import { Request, Response } from "express";
import { signupService } from "../services/auth.services";
import { loginService } from "../services/auth.services";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await signupService(name, email, password);

    res.status(201).json({
      message: "Signup successful",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Signup failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const result = await loginService(email, password);

    res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error: any) {
    res.status(401).json({
      message: error.message || "Login failed",
    });
  }
};
