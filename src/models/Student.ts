import { Schema, model } from "mongoose";
import { IStudent } from "./types";

const studentSchema = new Schema<IStudent>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    enrollmentDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "completed", "dropped"], default: "active" },
    paymentStatus: { type: String, enum: ["pending", "paid", "partial"], default: "pending" },
    grades: { type: String },
    userId: { type: String },
  },
  { timestamps: true }
);

export const Student = model<IStudent>("Student", studentSchema);
