import { Request, Response } from "express";
import { Project } from "../models/Project";
export const getProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching projects",
      error: (error as Error).message,
    });
  }
};
export const getProjectById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching project",
      error: (error as Error).message,
    });
  }
};
export const createProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, description, category, tags, liveUrl, status, client, year } = req.body;
    let image = "";
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else {
      res.status(400).json({ message: "Project image is required" });
      return;
    }
    const parsedTags =
      typeof tags === "string"
        ? (() => {
            try { return JSON.parse(tags); } catch {
              return tags.split(",").map((t: string) => t.trim());
            }
          })()
        : Array.isArray(tags)
          ? tags
          : [];
    const project = await Project.create({
      title,
      description,
      image,
      category,
      tags: parsedTags,
      liveUrl,
      status,
      client,
      year,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Error creating project",
      error: (error as Error).message,
    });
  }
};
export const updateProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, description, category, tags, liveUrl, status, client, year } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    let image = project.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }
    const parsedTags =
      typeof tags === "string"
        ? (() => {
            try { return JSON.parse(tags); } catch {
              return tags.split(",").map((t: string) => t.trim());
            }
          })()
        : Array.isArray(tags)
          ? tags
          : [];
    project.title = title || project.title;
    project.description = description || project.description;
    project.category = category || project.category;
    project.tags = parsedTags !== undefined ? parsedTags : project.tags;
    project.liveUrl = liveUrl !== undefined ? liveUrl : project.liveUrl;
    project.status = status !== undefined ? status : project.status;
    project.client = client !== undefined ? client : project.client;
    project.year = year !== undefined ? year : project.year;
    project.image = image;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: "Error updating project",
      error: (error as Error).message,
    });
  }
};
export const deleteProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting project",
      error: (error as Error).message,
    });
  }
};
