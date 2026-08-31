import { Schema, model } from "mongoose";
import { IJob } from "./types";

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, trim: true },
    location: { type: String, trim: true },
    type: { type: String, enum: ["full-time", "part-time", "contract", "internship"], default: "full-time" },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Job = model<IJob>("Job", jobSchema);
