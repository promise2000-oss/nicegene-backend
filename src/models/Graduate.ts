import { Schema, model } from "mongoose";
import { IGraduate } from "./types";
const graduateSchema = new Schema<IGraduate>(
  {
    name: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    graduationYear: { type: Number, required: true },
    grade: { type: String, trim: true },
    image: { type: String, required: true },
    testimonial: { type: String },
    linkedInUrl: { type: String, trim: true },
  },
  { timestamps: true },
);
export const Graduate = model<IGraduate>("Graduate", graduateSchema);
