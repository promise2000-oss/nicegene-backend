import { Schema, model } from "mongoose";
import { IBlog } from "./types";
const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    tags: [{ type: String }],
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);
export const Blog = model<IBlog>("Blog", blogSchema);
