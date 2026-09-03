import { Response } from "express";
import { Registration } from "../models/Registration";
import { AuthRequest } from "../middleware/authMiddleware";

export const createRegistration = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { fullName, email, phone, course, cohort, paymentRef, amount } = req.body;

    if (!fullName || !email || !phone || !course || !cohort || !amount) {
      res.status(400).json({ message: "All required fields must be provided" });
      return;
    }

    const registration = await Registration.create({
      fullName,
      email,
      phone,
      course,
      cohort,
      paymentRef,
      amount,
    });

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({
      message: "Error creating registration",
      error: (error as Error).message,
    });
  }
};

export const getRegistrationById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      res.status(404).json({ message: "Registration not found" });
      return;
    }
    res.json(registration);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching registration",
      error: (error as Error).message,
    });
  }
};

export const deleteRegistration = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) {
      res.status(404).json({ message: "Registration not found" });
      return;
    }
    res.json({ message: "Registration deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting registration",
      error: (error as Error).message,
    });
  }
};

export const getAllRegistrations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching registrations",
      error: (error as Error).message,
    });
  }
};
