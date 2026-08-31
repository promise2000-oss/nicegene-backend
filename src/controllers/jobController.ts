import { Request, Response } from "express";
import { Job } from "../models/Job";

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { department, type, location } = req.query;
    const filter: Record<string, any> = { isActive: true };
    if (department) filter.department = department;
    if (type) filter.type = type;
    if (location) filter.location = location;
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: (error as Error).message });
  }
};

export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) { res.status(404).json({ message: "Job not found" }); return; }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error: (error as Error).message });
  }
};

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, department, location, type, description, requirements } = req.body;
    const parsedRequirements = typeof requirements === "string" ? JSON.parse(requirements) : requirements;
    const job = await Job.create({ title, department, location, type, description, requirements: parsedRequirements });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error: (error as Error).message });
  }
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) { res.status(404).json({ message: "Job not found" }); return; }
    const { title, department, location, type, description, requirements, isActive } = req.body;
    if (title !== undefined) job.title = title;
    if (department !== undefined) job.department = department;
    if (location !== undefined) job.location = location;
    if (type !== undefined) job.type = type;
    if (description !== undefined) job.description = description;
    if (requirements !== undefined) job.requirements = typeof requirements === "string" ? JSON.parse(requirements) : requirements;
    if (isActive !== undefined) job.isActive = isActive;
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error: (error as Error).message });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) { res.status(404).json({ message: "Job not found" }); return; }
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error: (error as Error).message });
  }
};
