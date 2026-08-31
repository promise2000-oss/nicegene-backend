import { Request, Response } from "express";
import { User } from "../models/User";
import { Student } from "../models/Student";
import jwt from "jsonwebtoken";
const generateToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "nicegene_secret", {
    expiresIn: "30d",
  });
};
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, role } = req.body;
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      res
        .status(400)
        .json({ message: "User already exists with this email or username" });
      return;
    }
    const user = await User.create({
      username,
      email,
      password,
      role: role || "admin",
    });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString(), user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: (error as Error).message,
    });
  }
};
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString(), user.role),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in", error: (error as Error).message });
  }
};
export const getMe = async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(44);
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
      error: (error as Error).message,
    });
  }
};

export const updateProfile = async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { email, password, username } = req.body;

    if (username) user.username = username;
    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: user._id } });
      if (emailExists) {
        res.status(400).json({ message: "Email is already in use" });
        return;
      }
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString(), user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      error: (error as Error).message,
    });
  }
};

export const studentRegister = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password, phone, course } = req.body;
    if (!fullName || !email || !password) {
      res.status(400).json({ message: "Full name, email, and password are required" });
      return;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "A user with this email already exists" });
      return;
    }
    const user = await User.create({
      username: email.split("@")[0],
      email,
      password,
      role: "student",
    });
    const student = await Student.create({
      fullName,
      email: email.toLowerCase(),
      phone: phone || "",
      course: course || "",
      enrollmentDate: new Date(),
      status: "active",
      paymentStatus: "pending",
      userId: user._id.toString(),
    });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      studentId: student._id,
      token: generateToken(user._id.toString(), user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering student",
      error: (error as Error).message,
    });
  }
};

export const studentLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }
    const user = await User.findOne({ email, role: "student" });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const student = await Student.findOne({ userId: user._id.toString() });
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      studentId: student?._id || null,
      token: generateToken(user._id.toString(), user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in student",
      error: (error as Error).message,
    });
  }
};

