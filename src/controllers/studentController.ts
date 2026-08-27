import { Response } from "express";
import { Student } from "../models/Student";
import { AuthRequest } from "../middleware/authMiddleware";

export const getStudentById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching student",
      error: (error as Error).message,
    });
  }
};

export const updateStudent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    const allowedFields = ["fullName", "phone", "course", "status", "paymentStatus", "grades"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        (student as any)[field] = req.body[field];
      }
    });

    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: "Error updating student",
      error: (error as Error).message,
    });
  }
};

export const getAllStudents = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: (error as Error).message,
    });
  }
};
