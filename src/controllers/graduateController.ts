import { Request, Response } from "express";
import { Graduate } from "../models/Graduate";
export const getGraduates = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const graduates = await Graduate.find().sort({
      graduationYear: -1,
      name: 1,
    });
    res.json(graduates);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching graduates",
      error: (error as Error).message,
    });
  }
};
export const getGraduateById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const graduate = await Graduate.findById(req.params.id);
    if (!graduate) {
      res.status(404).json({ message: "Graduate not found" });
      return;
    }
    res.json(graduate);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching graduate",
      error: (error as Error).message,
    });
  }
};
export const createGraduate = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, course, graduationYear, grade, testimonial, linkedInUrl } =
      req.body;
    let image = "";
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else {
      res.status(400).json({ message: "Graduate image is required" });
      return;
    }
    const graduate = await Graduate.create({
      name,
      course,
      graduationYear: parseInt(graduationYear, 10),
      grade,
      image,
      testimonial,
      linkedInUrl,
    });
    res.status(201).json(graduate);
  } catch (error) {
    res.status(500).json({
      message: "Error creating graduate",
      error: (error as Error).message,
    });
  }
};
export const updateGraduate = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, course, graduationYear, grade, testimonial, linkedInUrl } =
      req.body;
    const graduate = await Graduate.findById(req.params.id);
    if (!graduate) {
      res.status(404).json({ message: "Graduate not found" });
      return;
    }
    let image = graduate.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }
    graduate.name = name || graduate.name;
    graduate.course = course || graduate.course;
    graduate.graduationYear = graduationYear
      ? parseInt(graduationYear, 10)
      : graduate.graduationYear;
    graduate.grade = grade !== undefined ? grade : graduate.grade;
    graduate.testimonial =
      testimonial !== undefined ? testimonial : graduate.testimonial;
    graduate.linkedInUrl =
      linkedInUrl !== undefined ? linkedInUrl : graduate.linkedInUrl;
    graduate.image = image;
    await graduate.save();
    res.json(graduate);
  } catch (error) {
    res.status(500).json({
      message: "Error updating graduate",
      error: (error as Error).message,
    });
  }
};
export const deleteGraduate = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const graduate = await Graduate.findByIdAndDelete(req.params.id);
    if (!graduate) {
      res.status(404).json({ message: "Graduate not found" });
      return;
    }
    res.json({ message: "Graduate deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting graduate",
      error: (error as Error).message,
    });
  }
};
