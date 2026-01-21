import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.models";


export const signupService = async (
  name: string,
  email: string,
  password: string
) => {

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "USER",
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};


export const loginService = async (email: string, password: string) => {

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
