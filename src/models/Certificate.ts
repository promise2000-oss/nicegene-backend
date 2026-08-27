import { Schema, model } from "mongoose";
import { ICertificate } from "./types";

const certificateSchema = new Schema<ICertificate>(
  {
    certificateId: { type: String, required: true, unique: true, trim: true },
    studentName: { type: String, required: true, trim: true },
    studentEmail: { type: String, required: true, trim: true, lowercase: true },
    course: { type: String, required: true, trim: true },
    completionDate: { type: Date, default: Date.now },
    grade: { type: String },
    issuedBy: { type: String, default: "Nicegene Technologies" },
  },
  { timestamps: true }
);

export const Certificate = model<ICertificate>("Certificate", certificateSchema);
