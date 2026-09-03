import { Response } from "express";
import { Certificate } from "../models/Certificate";
import { AuthRequest } from "../middleware/authMiddleware";

export const getCertificateById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.id });
    if (!certificate) {
      res.status(404).json({ message: "Certificate not found" });
      return;
    }
    res.json(certificate);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching certificate",
      error: (error as Error).message,
    });
  }
};

export const getCertificatesByStudent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const student = req.query.student as string;
    if (!student) {
      res.status(400).json({ message: "Student query parameter is required" });
      return;
    }

    const certificates = await Certificate.find({
      $or: [{ studentEmail: student }, { studentName: { $regex: student, $options: "i" } }],
    }).sort({ createdAt: -1 });

    res.json(certificates);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching certificates",
      error: (error as Error).message,
    });
  }
};

export const deleteCertificate = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const certificate = await Certificate.findOneAndDelete({ certificateId: req.params.id });
    if (!certificate) {
      res.status(404).json({ message: "Certificate not found" });
      return;
    }
    res.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting certificate",
      error: (error as Error).message,
    });
  }
};

export const createCertificate = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { studentName, studentEmail, course, grade, issuedBy } = req.body;

    if (!studentName || !studentEmail || !course) {
      res.status(400).json({ message: "Student name, email, and course are required" });
      return;
    }

    const certificateId = `NG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const certificate = await Certificate.create({
      certificateId,
      studentName,
      studentEmail,
      course,
      grade,
      issuedBy,
    });

    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({
      message: "Error creating certificate",
      error: (error as Error).message,
    });
  }
};
