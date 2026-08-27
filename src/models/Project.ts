import { Schema, model } from "mongoose";
import { IProject } from "./types";
const projectSchema = new Schema<IProject>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true, trim: true },
  tags: [{ type: String }],
  liveUrl: { type: String, trim: true },
  githubUrl: { type: String, trim: true },
  status: { type: String, trim: true },
  client: { type: String, trim: true },
  year: { type: String, trim: true },
}, {
  timestamps: true
});

export const Project = model<IProject>('Project', projectSchema);
