import { AppDataSource } from "../config/conectiondb";
import { User } from "../entities/User";
import { Request, Response } from "express";
import { getRepository } from "typeorm"; // Ensure you're using TypeORM
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
configDotenv();
const JWTWEBToken = process.env.JWT_SECEKT_KEY || "hunzla123";
//signup
export const SignUP = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password, confirm_password } = req.body;

  // Validate input fields
  if (!username || !email || !password || !confirm_password) {
    return res.status(400).json({ message: "One of the fields is missing" });
  }

  // Check if password and confirm password match
  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Check if the user already exists
  const userRepository = AppDataSource.getRepository(User);
  const existingUser = await userRepository.findOne({ where: { email } });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  // Create new user
  const newUser = userRepository.create({
    username,
    email,
    password,
    confirm_password,
  });

  // Save the new user to the database
  try {
    await userRepository.save(newUser);
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating user" });
  }
};
//get all user
export const getAllSignup = async (req: Request, res: Response) => {
  try {
    // Access the User repository
    const userRepository = AppDataSource.getRepository(User);

    // Fetch all users
    const users = await userRepository.find({
      select: ["id", "email", "username"],
    });

    // Log users for debugging (optional)
    console.log("Fetched users:", users);

    // Send the user data as a JSON response
    res.status(200).json(users);
  } catch (error) {
    // Log error for debugging
    console.error("Error fetching users:", error);

    // Send a proper error response
    res.status(500).json({
      message: "Error fetching users",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email) {
      return res.status(400).json({ message: "Please provide an email." });
    }
    if (!password) {
      return res.status(400).json({ message: "Please provide a password." });
    }

    const userRepository = AppDataSource.getRepository(User);

    // Find user by email
    const loginuser = await userRepository.findOne({ where: { email } });

    // Check if user exists
    if (!loginuser) {
      return res.status(404).json({ message: "Invalid email or password." });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, loginuser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: loginuser.id,
        email: loginuser.email,
      },
      JWTWEBToken, // Use environment variable for security
      { expiresIn: "1h" }
    );

    // Send response
    return res.status(200).json({
      message: "Login successful",
      token,
      user_info: { email: loginuser.email, user_name: loginuser.username },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
