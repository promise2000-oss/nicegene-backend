import { Request, Response } from "express";
import { Staff } from "../models/Staff";
export const getStaffList = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const staff = await Staff.find().sort({ name: 1 });
    res.json(staff);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching staff",
      error: (error as Error).message,
    });
  }
};
export const getStaffById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      res.status(404).json({ message: "Staff member not found" });
      return;
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching staff member",
      error: (error as Error).message,
    });
  }
};
export const createStaff = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, dateOfBirth, role, department, category, isActive } = req.body;
    let image = "";
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }
    const emailExists = await Staff.findOne({ email });
    if (emailExists) {
      res.status(400).json({ message: "Staff with this email already exists" });
      return;
    }
    const staff = await Staff.create({
      name,
      email,
      dateOfBirth: new Date(dateOfBirth),
      role,
      department,
      category: category || "staff",
      image,
      isActive:
        isActive !== undefined
          ? isActive === "true" || isActive === true
          : true,
    });
    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({
      message: "Error creating staff member",
      error: (error as Error).message,
    });
  }
};
export const updateStaff = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, dateOfBirth, role, department, category, isActive } = req.body;
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      res.status(404).json({ message: "Staff member not found" });
      return;
    }
    let image = staff.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }
    if (email && email !== staff.email) {
      const emailExists = await Staff.findOne({ email });
      if (emailExists) {
        res
          .status(400)
          .json({ message: "Staff with this email already exists" });
        return;
      }
      staff.email = email;
    }
    staff.name = name || staff.name;
    staff.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : staff.dateOfBirth;
    staff.role = role || staff.role;
    staff.department = department || staff.department;
    staff.category = category || staff.category;
    staff.image = image;
    if (isActive !== undefined) {
      staff.isActive = isActive === "true" || isActive === true;
    }
    await staff.save();
    res.json(staff);
  } catch (error) {
    res.status(500).json({
      message: "Error updating staff member",
      error: (error as Error).message,
    });
  }
};
export const deleteStaff = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      res.status(404).json({ message: "Staff member not found" });
      return;
    }
    res.json({ message: "Staff member deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting staff member",
      error: (error as Error).message,
    });
  }
};
