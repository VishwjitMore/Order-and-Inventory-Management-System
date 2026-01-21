import "dotenv/config"
import bcrypt from "bcrypt";
import { User } from "../models/user.models";
import { connectdb } from "../config/db";

const createAdmin = async () => {
  try {
    await connectdb();

    const email = "admin@gmail.com";
    const password = "admin123";

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "ADMIN",
    });

    console.log("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin", error);
    process.exit(1);
  }
};

createAdmin();
