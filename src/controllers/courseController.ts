import { Request, Response } from "express";
import { Course } from "../models/Course";

export const getCoursePricing = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pricing = await Course.find().sort({ title: 1 });
    res.json(pricing);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching course pricing",
      error: (error as Error).message,
    });
  }
};

export const upsertCoursePricing = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title } = req.params;
    const { desc, track, fee, time, status, courseDesc } = req.body;
    const update: Record<string, string> = {};
    if (desc !== undefined) update.desc = desc;
    if (track !== undefined) update.track = track;
    if (fee !== undefined) update.fee = fee;
    if (time !== undefined) update.time = time;
    if (status !== undefined) update.status = status;
    if (courseDesc !== undefined) update.courseDesc = courseDesc;
    const pricing = await Course.findOneAndUpdate(
      { title },
      { $set: update },
      { upsert: true, new: true }
    );
    res.json(pricing);
  } catch (error) {
    res.status(500).json({
      message: "Error updating course pricing",
      error: (error as Error).message,
    });
  }
};
