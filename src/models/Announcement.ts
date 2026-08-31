import { Schema, model } from "mongoose";
import { IAnnouncement } from "./types";

const announcementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    link: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Announcement = model<IAnnouncement>("Announcement", announcementSchema);
