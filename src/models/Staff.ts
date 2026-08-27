import { Schema, model } from "mongoose";
import { IStaff } from "./types";
const staffSchema = new Schema<IStaff>({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  dateOfBirth: { type: Date, required: true }, // Used for birthday matching
  role: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  category: { type: String, enum: ["executive", "staff"], default: "staff" },
  image: { type: String },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true
});

export const Staff = model<IStaff>('Staff', staffSchema);
