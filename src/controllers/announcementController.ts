import { Request, Response } from "express";
import { Announcement } from "../models/Announcement";

export const getAnnouncements = async (req: Request, res: Response): Promise<void> => {
  try {
    const { active } = req.query;
    const filter: Record<string, any> = {};
    if (active === "true" || active === undefined) filter.isActive = true;
    const announcements = await Announcement.find(filter).sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcements", error: (error as Error).message });
  }
};

export const getAnnouncementById = async (req: Request, res: Response): Promise<void> => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) { res.status(404).json({ message: "Announcement not found" }); return; }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcement", error: (error as Error).message });
  }
};

export const createAnnouncement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, message, priority, link, isActive } = req.body;
    const announcement = await Announcement.create({ title, message, priority, link, isActive });
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Error creating announcement", error: (error as Error).message });
  }
};

export const updateAnnouncement = async (req: Request, res: Response): Promise<void> => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) { res.status(404).json({ message: "Announcement not found" }); return; }
    const { title, message, priority, link, isActive } = req.body;
    if (title !== undefined) announcement.title = title;
    if (message !== undefined) announcement.message = message;
    if (priority !== undefined) announcement.priority = priority;
    if (link !== undefined) announcement.link = link;
    if (isActive !== undefined) announcement.isActive = isActive;
    await announcement.save();
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Error updating announcement", error: (error as Error).message });
  }
};

export const deleteAnnouncement = async (req: Request, res: Response): Promise<void> => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) { res.status(404).json({ message: "Announcement not found" }); return; }
    res.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting announcement", error: (error as Error).message });
  }
};
